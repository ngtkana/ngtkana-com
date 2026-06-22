'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { ADSENSE_PUBLISHER_ID } from '@/app/constants/analytics';

/**
 * GoogleAdSense component
 *
 * This component initializes Google AdSense advertising.
 * It should be included in the layout.tsx file.
 */
const GoogleAdSense = () => {
    useEffect(() => {
        // Only initialize AdSense in production to avoid loading ads in development
        if (process.env.NODE_ENV !== 'production') {
            console.log('[AdSense] Ads disabled in development mode');
            return;
        }

        // Check if ADSENSE_PUBLISHER_ID is available
        if (!ADSENSE_PUBLISHER_ID) {
            console.warn('[AdSense] Publisher ID is not defined');
            return;
        }
    }, []);

    // Don't render anything if ADSENSE_PUBLISHER_ID is not available
    if (!ADSENSE_PUBLISHER_ID) {
        return null;
    }

    return (
        <Script
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUBLISHER_ID}`}
            strategy="afterInteractive"
            crossOrigin="anonymous"
        />
    );
};

export default GoogleAdSense;
