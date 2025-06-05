// src/lib/fb-capi-service.ts

// Configuration
const API_BASE_URL = 'https://api-de-conversoes-v2.vercel.app/';
export const FACEBOOK_PIXEL_ID = '3069810703343613';
const DEFAULT_CURRENCY = 'BRL';
const DEBUG_MODE = process.env.NODE_ENV === 'development';

// --- Utility Functions ---
export function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
  return undefined;
}

export function setCookie(name: string, value: string, days: number = 365): void {
  if (typeof document === 'undefined') return;
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
}

export function generateUUID(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export function getExternalId(): string {
  if (typeof window === 'undefined') return generateUUID();
  let externalId = getCookie('fb_external_id');
  if (!externalId) {
    externalId = generateUUID();
    setCookie('fb_external_id', externalId, 365 * 2);
  }
  return externalId;
}

export function getUrlParameters(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  const params: Record<string, string> = {};
  const urlParams = new URLSearchParams(window.location.search);
  for (const [key, value] of urlParams) {
    params[key] = value;
  }
  return params;
}

function getFbclidFromUrl(): string | undefined {
  const urlParams = getUrlParameters();
  return urlParams.fbclid;
}

// --- User Data Management ---
// UserData interface stores raw PII. Server will hash.
export interface UserData {
  external_id?: string[];
  em?: string[];      // Raw email
  ph?: string[];      // Raw phone
  fn?: string[];      // Raw first name
  ln?: string[];      // Raw last name
  fbc?: string;       // Facebook Click ID from _fbc cookie or fbclid URL param
  fbp?: string;       // Facebook Browser ID from _fbp cookie
  // client_ip_address and client_user_agent will be added by the server.
  // Other fields like ge, db, zp, ct, st as per Facebook CAPI docs can be added if needed.
}

export let globalUserData: UserData = {};

// Initialize globalUserData safely for client-side execution
if (typeof window !== 'undefined') {
    globalUserData = {
        external_id: [getExternalId()],
        fbp: getCookie('_fbp'),
        fbc: getCookie('_fbc') || getFbclidFromUrl(),
    };
}


export function loadUserDataFromLocalStorage(): void {
  if (typeof window === 'undefined') return;
  try {
    const stored = localStorage.getItem('fb_user_data');
    if (stored) {
      const data = JSON.parse(stored) as Partial<UserData>;
      // Merge stored data, prioritizing fresh values for fbp/fbc if available
      globalUserData = {
        ...globalUserData, // Default initial values
        ...data,           // Overwrite with stored values
        external_id: data.external_id || globalUserData.external_id || [getExternalId()],
        fbp: data.fbp || globalUserData.fbp || getCookie('_fbp'),
        fbc: data.fbc || globalUserData.fbc || getCookie('_fbc') || getFbclidFromUrl(),
      };
    } else {
        // Ensure critical IDs are set if nothing in localStorage
        globalUserData.external_id = globalUserData.external_id || [getExternalId()];
        globalUserData.fbp = globalUserData.fbp || getCookie('_fbp');
        globalUserData.fbc = globalUserData.fbc || getCookie('_fbc') || getFbclidFromUrl();
        localStorage.setItem('fb_user_data', JSON.stringify(globalUserData));
    }
  } catch (error) {
    console.error('[FB CAPI] Error loading user data from localStorage:', error);
  }
}

export function updateGlobalUserData(newData: Partial<UserData>): void {
  if (typeof window === 'undefined') return;
  
  const updatedData = { ...globalUserData, ...newData };

  // Ensure PII fields are arrays of strings if they are provided
  const piiFields: (keyof UserData)[] = ['em', 'ph', 'fn', 'ln', 'external_id'];
  piiFields.forEach(field => {
    if (newData[field] !== undefined) { // If new data for this field is provided
      const value = newData[field];
      if (Array.isArray(value)) {
        updatedData[field] = value.map(String) as any;
      } else {
        updatedData[field] = [String(value)] as any;
      }
    } else if (updatedData[field] !== undefined && !Array.isArray(updatedData[field])) {
        // If existing data for this field is not an array, convert it
        updatedData[field] = [String(updatedData[field])] as any;
    }
  });

  globalUserData = updatedData;
  localStorage.setItem('fb_user_data', JSON.stringify(globalUserData));
  debugLog('Global user data updated:', globalUserData);
}

// --- Debug Logging ---
function debugLog(message: string, ...data: any[]): void {
  if (DEBUG_MODE) {
    console.log(`[FB CAPI DEBUG] ${message}`, ...data);
  }
}

// Define the expected response type from CAPI events (export if needed by other modules)
export interface CAPIEventResponse {
  success: boolean;
  eventId?: string;
  error?: string;
  fbtrace_id?: string;
  diagnostics?: any;
}

// --- Generic Event Sending Function ---
interface BasePayload {
  eventId: string;
  userData: UserData;
  eventSourceUrl: string;
  urlParameters: Record<string, string>;
  actionSource: 'website';
  customData?: Record<string, any>;
  event_time: number; // Facebook expects event_time (Unix timestamp in seconds)
}

async function sendCAPIEvent(
  eventName: string,
  endpointPath: string,
  customData?: Record<string, any>,
  piiForEvent?: Partial<Pick<UserData, 'em' | 'ph' | 'fn' | 'ln'>>,
  explicitEventId?: string
): Promise<CAPIEventResponse> {
  if (typeof window === 'undefined') {
    debugLog(`Skipping CAPI event (${eventName}) on server-side render.`);
    return { success: false, error: "Cannot send CAPI event from server." };
  }

  loadUserDataFromLocalStorage(); // Ensure globalUserData is up-to-date

  if (piiForEvent) {
    updateGlobalUserData(piiForEvent); // Update global data with PII specific to this event
  }

  const eventId = explicitEventId || generateUUID();
  const eventTime = Math.floor(Date.now() / 1000);

  // Create a snapshot of globalUserData for this event to ensure correct PII array format
  const eventUserData: UserData = { ...globalUserData };
  const piiFieldsToEnsureArray: (keyof UserData)[] = ['em', 'ph', 'fn', 'ln', 'external_id'];
  piiFieldsToEnsureArray.forEach(field => {
    if (eventUserData[field] !== undefined) {
      if (Array.isArray(eventUserData[field])) {
        eventUserData[field] = eventUserData[field]?.map(String) as any;
      } else {
        eventUserData[field] = [String(eventUserData[field])] as any;
      }
    }
  });
  
  // Ensure fbp and fbc are strings or undefined, not null
  if (eventUserData.fbp === null) eventUserData.fbp = undefined;
  if (eventUserData.fbc === null) eventUserData.fbc = undefined;


  const payload: BasePayload = {
    eventId,
    userData: eventUserData,
    eventSourceUrl: window.location.href,
    urlParameters: getUrlParameters(), // Crucial for fbclid and UTMs
    actionSource: 'website',
    event_time: eventTime,
  };

  if (customData) {
    payload.customData = customData;
  }

  // Clean undefined values from userData payload
  Object.keys(payload.userData).forEach(key => {
    const K = key as keyof UserData;
    if (payload.userData[K] === undefined) {
      delete payload.userData[K];
    }
  });

  debugLog(`Sending ${eventName} CAPI event:`, JSON.parse(JSON.stringify(payload))); // Deep copy for logging

  try {
    const response = await fetch(`${API_BASE_URL}api/track/${endpointPath}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const responseData = await response.json();

    if (response.ok && responseData.success) {
      debugLog(`${eventName} CAPI event sent successfully:`, { eventId, responseData });
      return { success: true, eventId, fbtrace_id: responseData.fbtrace_id, diagnostics: responseData.diagnostics };
    } else {
      console.error(`Failed to send ${eventName} CAPI event (${response.status}):`, responseData);
      return { success: false, error: responseData.error || responseData.message || 'Unknown error', fbtrace_id: responseData.fbtrace_id, diagnostics: responseData.diagnostics };
    }
  } catch (error: any) {
    console.error(`Error sending ${eventName} CAPI event:`, error);
    return { success: false, error: error.message || 'Network error' };
  }
}

// --- Specific Event Functions ---

export async function sendPageViewCAPIEvent(
    piiForEvent?: Partial<Pick<UserData, 'em' | 'ph' | 'fn' | 'ln'>>,
    explicitEventId?: string
): Promise<CAPIEventResponse> {
  // customData for PageView is often minimal or handled by backend (e.g. UTMs from urlParameters)
  return sendCAPIEvent('PageView', 'pageview', {}, piiForEvent, explicitEventId);
}

export async function sendViewContentCAPIEvent(
  customData: {
    content_name?: string;
    content_category?: string;
    content_ids?: string[]; // Array of product SKUs or IDs
    content_type?: 'product' | 'product_group';
    value?: number;         // Value of the content/product
    currency?: string;      // Currency (e.g., USD, BRL)
    contents?: { id: string; quantity: number; item_price?: number; [key: string]: any }[];
    num_items?: number;
    [key: string]: any;     // Allow other custom properties
  },
  piiForEvent?: Partial<Pick<UserData, 'em' | 'ph' | 'fn' | 'ln'>>,
  explicitEventId?: string
): Promise<CAPIEventResponse> {
  const eventCustomData = {
    currency: DEFAULT_CURRENCY, // Default currency
    ...customData,
  };
  return sendCAPIEvent('ViewContent', 'viewcontent', eventCustomData, piiForEvent, explicitEventId);
}

// For InitiateCheckout, PII data (especially email, name) is highly recommended.
export type InitiateCheckoutPII = Required<Pick<UserData, 'em' | 'fn' | 'ln'>> & Partial<Pick<UserData, 'ph'>>; // Ensure em, fn, ln are provided

export async function sendInitiateCheckoutCAPIEvent(
  customData: {
    content_category?: string;
    content_ids?: string[];
    content_type?: 'product' | 'product_group';
    num_items?: number;
    value?: number;
    currency?: string;
    contents?: { id: string; quantity: number; item_price?: number; [key: string]: any }[];
    [key: string]: any;
  },
  piiForEvent: InitiateCheckoutPII,
  explicitEventId?: string
): Promise<CAPIEventResponse> {
  const eventCustomData = {
    currency: DEFAULT_CURRENCY, // Default currency
    ...customData,
  };
  // PII is passed directly to sendCAPIEvent, which will call updateGlobalUserData
  return sendCAPIEvent('InitiateCheckout', 'initiatecheckout', eventCustomData, piiForEvent, explicitEventId);
}

// NEW: sendLeadCAPIEvent function
export type LeadPII = Required<Pick<UserData, 'em' | 'fn' | 'ln'>> & Partial<Pick<UserData, 'ph'>>;

// Define a more specific type for lead custom data that includes optional contents and num_items
interface LeadCustomData {
  content_name?: string;
  content_category?: string;
  value?: number; 
  currency?: string;
  contents?: { id: string; quantity: number; item_price?: number; [key: string]: any }[];
  num_items?: number;
  [key: string]: any;
}

export async function sendLeadCAPIEvent(
  customData: LeadCustomData, // Use the more specific type
  piiForEvent: LeadPII,
  explicitEventId?: string
): Promise<CAPIEventResponse> {
  const eventCustomData: LeadCustomData = { // Ensure type accommodates contents/num_items
    value: 0, 
    currency: DEFAULT_CURRENCY,
    ...customData,
  };
  
  if (typeof eventCustomData.value !== 'undefined' && !eventCustomData.contents) {
    eventCustomData.contents = [{ 
      id: eventCustomData.content_name || 'lead_submission', 
      quantity: 1, 
      item_price: eventCustomData.value 
    }];
    eventCustomData.num_items = 1;
  }

  return sendCAPIEvent('Lead', 'lead', eventCustomData, piiForEvent, explicitEventId);
}

// --- Initialization ---
// Call this function once, early in your application's client-side lifecycle (e.g., in a root layout client component).
export function initializeFBCAPIService(): void {
  if (typeof window !== 'undefined') {
    loadUserDataFromLocalStorage(); // Load persisted user data

    // Ensure essential IDs are present or generated in globalUserData
    if (!globalUserData.external_id || globalUserData.external_id.length === 0) {
        globalUserData.external_id = [getExternalId()];
    }
    if (!globalUserData.fbp) {
        globalUserData.fbp = getCookie('_fbp');
    }
    // Set fbc from cookie or current URL's fbclid parameter.
    // The backend will prioritize fbclid from urlParameters if it's more up-to-date.
    const currentFbclid = getFbclidFromUrl();
    const cookieFbc = getCookie('_fbc');
    if (currentFbclid) {
        // If fbclid in URL, it's the most current context for fbc for *this* page hit.
        // globalUserData.fbc might hold an older cookie value or an fbclid from a previous page.
        // The backend logic (as per README) correctly prioritizes `fbclid` from `urlParameters`.
        // So, ensure globalUserData.fbc is at least initialized from cookie if available.
        globalUserData.fbc = cookieFbc || currentFbclid;
    } else if (cookieFbc) {
        globalUserData.fbc = cookieFbc;
    }


    updateGlobalUserData(globalUserData); // Save any newly initialized IDs to localStorage

    debugLog('FB CAPI Service Initialized. Current User Data:', JSON.parse(JSON.stringify(globalUserData)));
  }
} 