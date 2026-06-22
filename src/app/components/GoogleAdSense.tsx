import { ADSENSE_PUBLISHER_ID } from '@/app/constants/analytics';

/**
 * GoogleAdSense component
 *
 * This component renders the Google AdSense script tag.
 * It should be included in the layout.tsx file within the <head> section.
 *
 * Note: We use a regular <script> tag instead of Next.js Script component
 * because AdSense scripts don't support the data-nscript attribute.
 */
const GoogleAdSense = () => {
    // Don't render anything if ADSENSE_PUBLISHER_ID is not available
    if (!ADSENSE_PUBLISHER_ID) {
        return null;
    }

    return (
        <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUBLISHER_ID}`}
            crossOrigin="anonymous"
        />
    );
};

export default GoogleAdSense;
