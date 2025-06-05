'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  initializeFBCAPIService,
  sendPageViewCAPIEvent,
  type CAPIEventResponse
} from '@/lib/fb-capi-service';

export function FacebookCAPITracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialized = useRef(false);

  // Initialize CAPI Service once on component mount
  useEffect(() => {
    if (!initialized.current) {
      initializeFBCAPIService();
      initialized.current = true;
    }
  }, []);

  // Send PageView event on initial load and path/search param changes
  useEffect(() => {
    if (!initialized.current) {
      // Ensure service is initialized before sending the first PageView
      // This redundant call might not be strictly necessary if the above useEffect runs first,
      // but it's a safeguard.
      initializeFBCAPIService();
      initialized.current = true;
    }
    
    const fullUrl = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    console.log(`[FB CAPI TRACKER] Detected URL change or initial load: ${fullUrl}. Sending PageView.`);
    
    sendPageViewCAPIEvent()
      .then((response: CAPIEventResponse) => { // Explicitly type 'response'
        if (response.success) {
          console.log('[FB CAPI TRACKER] PageView CAPI event sent successfully for:', fullUrl, 'Event ID:', response.eventId);
          // If also using Facebook Pixel (fbq) and want to link events for deduplication:
          // if (typeof window !== 'undefined' && window.fbq && response.eventId) {
          //   window.fbq('track', 'PageView', {}, { eventID: response.eventId });
          //   console.log('[FB CAPI TRACKER] Sent PageView to fbq with eventID:', response.eventId);
          // }
        } else {
          console.error('[FB CAPI TRACKER] Failed to send PageView CAPI event for:', fullUrl, 'Error:', response.error);
        }
      })
      .catch((error: any) => { // Catch block error can be typed as 'any' or 'Error'
        console.error('[FB CAPI TRACKER] Error during sendPageViewCAPIEvent promise:', error);
      });

  }, [pathname, searchParams]); // Re-run effect when path or search params change

  return null; // This component does not render anything visible
} 