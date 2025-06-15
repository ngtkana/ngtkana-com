'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { GA_MEASUREMENT_ID } from '@/app/constants/analytics';

/**
 * GoogleAnalytics component
 * 
 * This component initializes Google Analytics 4 tracking.
 * It should be included in the layout.tsx file.
 */
const GoogleAnalytics = () => {
    useEffect(() => {
        // Only initialize GA in production to avoid tracking development activity
        if (process.env.NODE_ENV !== 'production') {
            console.log('[GA] Tracking disabled in development mode');
            return;
        }

        // Check if GA_MEASUREMENT_ID is available
        if (!GA_MEASUREMENT_ID) {
            console.warn('[GA] Measurement ID is not defined');
            return;
        }
    }, []);

    // Don't render anything if GA_MEASUREMENT_ID is not available
    if (!GA_MEASUREMENT_ID) {
        return null;
    }

    return (
        <>
            {/* Load the GA script using Next.js Script component */}
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
                strategy="afterInteractive"
            />

            {/* Initialize GA using Next.js Script component with inline script */}
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${GA_MEASUREMENT_ID}');
                `}
            </Script>
        </>
    );
};

export default GoogleAnalytics;
