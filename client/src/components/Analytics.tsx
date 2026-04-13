import { useEffect } from 'react';
import { useLocation } from 'wouter';

// Analytics configuration
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
const UMAMI_WEBSITE_ID = import.meta.env.VITE_UMAMI_WEBSITE_ID;
const UMAMI_ENDPOINT = import.meta.env.VITE_UMAMI_ENDPOINT;

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    umami?: any;
  }
}

export default function Analytics() {
  const [location] = useLocation();

  useEffect(() => {
    // Google Analytics
    if (GA_MEASUREMENT_ID && window.gtag) {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: location,
      });
    }

    // Umami Analytics
    if (UMAMI_WEBSITE_ID && window.umami) {
      window.umami.track('pageview', { url: location });
    }
  }, [location]);

  // Load scripts
  useEffect(() => {
    // Google Analytics
    if (GA_MEASUREMENT_ID && !window.gtag) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      window.gtag = function() {
        window.dataLayer.push(arguments);
      };
      window.gtag('js', new Date());
      window.gtag('config', GA_MEASUREMENT_ID);
    }

    // Umami Analytics
    if (UMAMI_WEBSITE_ID && UMAMI_ENDPOINT && !window.umami) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `${UMAMI_ENDPOINT}/umami.js`;
      script.setAttribute('data-website-id', UMAMI_WEBSITE_ID);
      document.head.appendChild(script);
    }
  }, []);

  return null;
}

// Utility functions for tracking events
export const trackEvent = (eventName: string, parameters: Record<string, any> = {}) => {
  // Google Analytics
  if (window.gtag) {
    window.gtag('event', eventName, parameters);
  }

  // Umami
  if (window.umami) {
    window.umami.track(eventName, parameters);
  }

  // Console log for development
  if (import.meta.env.DEV) {
    console.log('Analytics Event:', eventName, parameters);
  }
};

export const trackPurchase = (value: number, currency = 'UYU', items: any[] = []) => {
  trackEvent('purchase', {
    value,
    currency,
    items,
  });
};

export const trackAddToCart = (product: any) => {
  trackEvent('add_to_cart', {
    items: [{
      item_id: product.id,
      item_name: product.name,
      price: product.price,
      quantity: 1,
    }],
  });
};