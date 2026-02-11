export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { fetchStrapiCollection } from '@/lib/strapi';
import type { NewsArticleData } from '@/lib/types';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tin Tức Thẩm Mỹ | Phòng Khám An Toàn – 10 Trần Điền',
  description: 'Tin tức, kiến thức thẩm mỹ tại Số 10 Trần Điền, Hà Nội.',
  keywords: 'tin tức thẩm mỹ, 10 Trần Điền, kiến thức làm đẹp',
};

export default async function NewsPage() {
  const articles: NewsArticleData[] = (await fetchStrapiCollection('/news-articles', { 'sort': 'publishedAt:desc' })) || [];

  return (
    <>
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Tin Tức</h1>
          <p className="text-white/80 text-lg">Kiến thức thẩm mỹ và tin tức mới nhất từ 10 Trần Điền</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((a) => (
              <Link key={a.slug} href={`/tin-tuc/${a.slug}`} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                <div className="h-48 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                  <span className="text-5xl opacity-30">📰</span>
                </div>
                <div className="p-6">
                  {a.publishedAt && (
                    <p className="text-gray-400 text-sm mb-2">{new Date(a.publishedAt).toLocaleDateString('vi-VN')}</p>
                  )}
                  <h2 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">{a.title}</h2>
                  <p className="text-gray-600 text-sm line-clamp-2">{a.excerpt}</p>
                  <span className="inline-block mt-4 text-primary text-sm font-medium group-hover:translate-x-1 transition-transform">Đọc thêm →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
