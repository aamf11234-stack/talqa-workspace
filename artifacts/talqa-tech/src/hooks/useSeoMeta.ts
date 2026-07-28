import { useEffect } from 'react';

const BASE = 'تلقا تك';
const BASE_URL = 'https://tlgaads.com/talqa-tech';

interface SeoMeta {
  title: string;
  description: string;
  canonical?: string;
}

export function useSeoMeta({ title, description, canonical }: SeoMeta) {
  useEffect(() => {
    // Title
    document.title = `${title} | ${BASE}`;

    // Description
    let desc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (desc) desc.content = description;

    // OG title
    let ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    if (ogTitle) ogTitle.content = `${title} | ${BASE}`;

    // OG description
    let ogDesc = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
    if (ogDesc) ogDesc.content = description;

    // OG url
    let ogUrl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');
    if (ogUrl) ogUrl.content = canonical ?? `${BASE_URL}/`;

    // Twitter title
    let twTitle = document.querySelector<HTMLMetaElement>('meta[name="twitter:title"]');
    if (twTitle) twTitle.content = `${title} | ${BASE}`;

    // Twitter description
    let twDesc = document.querySelector<HTMLMetaElement>('meta[name="twitter:description"]');
    if (twDesc) twDesc.content = description;

    // Canonical
    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (link) link.href = canonical ?? `${BASE_URL}/`;
  }, [title, description, canonical]);
}
