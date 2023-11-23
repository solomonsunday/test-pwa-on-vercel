import { useRouter } from "next/router";
import { useEffect } from "react";

export function useRouteChange({ emitEvent }: {
	emitEvent: (url: string) => void
}) {
	const router = useRouter();
	useEffect(() => {
		router.events.on("routeChangeComplete", handleListenedRoute);
		return () => {
			router.events.off("routeChangeComplete", handleListenedRoute);
		};
	}, [router.events]);

	function handleListenedRoute(route: string) {
		emitEvent(route);
	}

}