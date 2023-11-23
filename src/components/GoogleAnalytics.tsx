"use client"

import { useGoogleTags } from '@/hooks/useGoogletag'
import Script from 'next/script'
import React from 'react'


// https://nextjs.org/docs/messages/next-script-for-ga
// https://dev.to/collegewap/how-to-add-google-analytics-to-nextjs-app-52f7
// https://stackoverflow.com/questions/76144321/google-analytics-with-nextjs-13
// https://stackoverflow.com/questions/68115650/how-to-load-google-tag-manager-with-next-script-component-next-js-11
// https://github.com/vercel/next.js/blob/deprecated-main/examples/with-google-analytics/pages/_app.js
// https://www.learnbestcoding.com/post/9/easiest-way-to-integrate-google-analytics-with-react-js-and-next-js
// https://stackoverflow.com/questions/70212434/how-to-properly-use-google-tag-script-in-next-js?noredirect=1&lq=1
// https://stackoverflow.com/questions/60411351/how-to-use-google-analytics-with-next-js-app?rq=4
// https://stackoverflow.com/questions/76092606/google-analytics-with-next-js

export default function GoogleAnalytics() {
	const GOOGLE_ANALYTICS_ID = 'G-3GHXRJ5LR1';

	useGoogleTags();

	return <>
		{process.env.NODE_ENV !== 'development' && <>
			<Script src={'https://www.googletagmanager.com/gtag/js?id=' + GOOGLE_ANALYTICS_ID} />
			<Script id="google-analytics" strategy="afterInteractive" dangerouslySetInnerHTML={{
				__html: `
				window.dataLayer = window.dataLayer || [];
				function gtag(){dataLayer.push(arguments);}
				gtag('js', new Date());
				if(!window?.location?.pathname?.includes('admin') && window?.location?.href?.includes('coventi.co')) {
					gtag('config', '${GOOGLE_ANALYTICS_ID}', {
						page_path: window.location.pathname,
					});
				}`,
			}} />
		</>}
	</>
}
