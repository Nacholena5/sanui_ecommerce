import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  structuredData?: object;
}

export default function SEO({
  title = "SANUI - Bolitas Proteicas Veganas | 20g Proteína | Uruguay 🇺🇾",
  description = "Bolitas proteicas SANUI: 20g de proteína por porción, veganas, sin gluten y sin azúcar. Chocolate y vainilla. Envíos a todo Uruguay. La mejor opción para tu rutina saludable.",
  image = "/images/og-image.jpg",
  url,
  type = 'website',
  structuredData
}: SEOProps) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta tags
    const updateMeta = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;

      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }

      meta.setAttribute('content', content);
    };

    // Basic meta
    updateMeta('description', description);
    updateMeta('og:title', title, true);
    updateMeta('og:description', description, true);
    updateMeta('og:image', image.startsWith('http') ? image : `${window.location.origin}${image}`, true);
    updateMeta('og:url', url || window.location.href, true);
    updateMeta('og:type', type, true);
    updateMeta('twitter:title', title, true);
    updateMeta('twitter:description', description, true);
    updateMeta('twitter:image', image.startsWith('http') ? image : `${window.location.origin}${image}`, true);

    // Structured data
    if (structuredData) {
      let script = document.querySelector('script[type="application/ld+json"]');
      if (!script) {
        script = document.createElement('script');
        script.setAttribute('type', 'application/ld+json');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    }
  }, [title, description, image, url, type, structuredData]);

  return null;
}