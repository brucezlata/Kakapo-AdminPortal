import type { AppProps } from 'next/app';
import type { Page } from '../types/types';
import React from 'react';
import { LayoutProvider } from '../layout/context/layoutcontext';
import Layout from '../layout/layout';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import '../styles/layout/layout.scss';

type Props = AppProps & {
    Component: Page;
};

export default function App({ Component, pageProps }: Props) {
    if (Component.getLayout) {
        return <LayoutProvider>{Component.getLayout(<Component {...pageProps} />)}</LayoutProvider>;
    } else {
        return (
            <LayoutProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </LayoutProvider>
        );
    }
}
