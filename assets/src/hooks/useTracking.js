import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function useTracking() {
    const location = useLocation();

    const trackPageView = (pageTitle) => {
        if (window.analytics) {
            window.analytics.page(pageTitle);
        }
        console.log(`Page view: ${pageTitle}`);
    };

    useEffect(() => {
        trackPageView(document.title);
    }, [location.pathname]);

    return { trackPageView };
}