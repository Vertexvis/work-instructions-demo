import '@vertexvis/viewer/dist/viewer/viewer.css';

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import theme from '@lib/theme';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';

const cache = createCache({ key: 'css', prepend: true });
cache.compat = true;

export default function App({ Component, pageProps }: AppProps): JSX.Element {
	return (
		<React.StrictMode>
			<CacheProvider value={cache}>
				<Head>
					<title>Vertex Work Instructions</title>
					<link rel="icon" href="/favicon-512x512.png" />
					<meta
						name="viewport"
						content="minimum-scale=1, initial-scale=1, width=device-width"
					/>
					<meta
						name="description"
						content="Quickly and easily build your own digital twin prototype application using the Vertex platform."
					/>
				</Head>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<Component {...pageProps} />
				</ThemeProvider>
			</CacheProvider>
		</React.StrictMode>
	);
}
