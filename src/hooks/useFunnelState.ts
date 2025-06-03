// This hook is a simple pass-through to the Zustand store.
// It's created for consistency in accessing state and actions,
// and can be expanded if more complex selector logic is needed in the future.
import useFunnelStore from '../store/funnelStore';

const useFunnelState = useFunnelStore;

export default useFunnelState; 