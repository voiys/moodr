import { ChakraProvider } from '@chakra-ui/react';

import theme from '../theme';
import { AppProps } from 'next/app';
import { AuthProvider } from 'context/auth';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider resetCSS theme={theme}>
			<AuthProvider>
				<Component {...pageProps} />
			</AuthProvider>
		</ChakraProvider>
	);
}

export default MyApp;
