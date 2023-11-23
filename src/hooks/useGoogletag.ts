import { useRouteChange } from "./useRouteChange";

export function useGoogleTags() {
	const GOOGLE_ANALYTICS_ID = 'G-3GHXRJ5LR1';

	useRouteChange({ emitEvent: url => handleRouteChange(url) });

	function handleRouteChange(url: string) {
		if (process.env.NODE_ENV !== "development" && !url.includes("admin")) {
			if (window && !window?.location?.href?.includes('coventi.co')) return;
			window && window.gtag('config', GOOGLE_ANALYTICS_ID, { page_path: url });
		}
	}
}
