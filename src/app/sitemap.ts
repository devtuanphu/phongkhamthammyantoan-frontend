import { fetchStrapiCollection } from '@/lib/strapi';
import type { ServiceData, NewsArticleData } from '@/lib/types';

const BASE_URL = 'https://phongkhamthammyantoan.com';

export default async function sitemap() {
  const services: ServiceData[] = (await fetchStrapiCollection('/services')) || [];
  const articles: NewsArticleData[] = (await fetchStrapiCollection('/news-articles')) || [];

  const staticPages = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${BASE_URL}/ve-chung-toi`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE_URL}/dich-vu`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${BASE_URL}/tin-tuc`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${BASE_URL}/lien-he`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
  ];

  const servicePages = services.map((s) => ({
    url: `${BASE_URL}/dich-vu/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const newsPages = articles.map((a) => ({
    url: `${BASE_URL}/tin-tuc/${a.slug}`,
    lastModified: a.publishedAt ? new Date(a.publishedAt) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...servicePages, ...newsPages];
}
