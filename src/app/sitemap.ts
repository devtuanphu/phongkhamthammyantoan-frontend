import { fetchStrapiCollection } from '@/lib/strapi';
import type { ServiceData, NewsArticleData } from '@/lib/types';

const BASE_URL = 'https://phongkhamthammyantoan.com';

export default async function sitemap() {
  const services: ServiceData[] = (await fetchStrapiCollection('/services')) || [];
  const articles: NewsArticleData[] = (await fetchStrapiCollection('/news-articles')) || [];

  const staticPages = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE_URL}/services`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${BASE_URL}/news`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
  ];

  const servicePages = services.map((s) => ({
    url: `${BASE_URL}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const newsPages = articles.map((a) => ({
    url: `${BASE_URL}/news/${a.slug}`,
    lastModified: a.publishedAt ? new Date(a.publishedAt) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...servicePages, ...newsPages];
}
