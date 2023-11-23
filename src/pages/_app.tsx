import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import Header from "@/components/Header";
import Alert from "@/components/Alert";
import { store } from "@/store";
import "@/styles/globals.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ApplicationContext from "@/contexts/ApplicationContext";
import InLineNotification from "@/components/Notification";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function App({ Component, pageProps }: AppProps) {
	const { pathname } = useRouter();
	const [canDisplay, setCanDisplay] = useState(false);

	useEffect(() => {
		if (
			pathname.includes("login") ||
			pathname.includes("register") ||
			pathname.includes("forgot-password") ||
			pathname.includes("reset-password") ||
			pathname.includes("verify-account") ||
			pathname.includes("success-password-reset") ||
			pathname.includes("admin")
		) {
			setCanDisplay(false);
			return;
		}
		setCanDisplay(true);
	}, [pathname]);

	return (
		<>
			<GoogleOAuthProvider clientId="1013288411449-ldlbu9ficv25s16tu24bdl7pv72g56st.apps.googleusercontent.com">
				<Provider store={store}>
					<ApplicationContext>
						<GoogleAnalytics />
						<InLineNotification />
						{canDisplay && <Header />}
						<Alert />
						<Component {...pageProps} />
					</ApplicationContext>
				</Provider>
			</GoogleOAuthProvider>
		</>
	);
}
