import { ErrorFallback } from '../components/ErrorFallback';
import Head from 'next/head';
import { Helmet } from 'react-helmet';
import Link from 'next/link';
import React from 'react';
import { ViewportContext } from '../components/ViewportProvider';

const Index404 = () => {
    const { height } = React.useContext(ViewportContext);
    return ( <
        div style = {
            {
                minHeight: '82vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }
        } >
        <
        Head >
        <
        title > Not Found < /title>{' '} < /
        Head > { ' ' } <
        ErrorFallback / >
        <
        /div>
    );
};

export default Index404;