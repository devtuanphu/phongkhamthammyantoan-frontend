export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { fetchStrapiCollection } from '@/lib/strapi';
import type { NewsArticleData } from '@/lib/types';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const all: NewsArticleData[] = (await fetchStrapiCollection('/news-articles', { 'filters[slug][$eq]': params.slug })) || [];
  const article = all[0];
  const seo = article?.seo;
  return {
    title: seo?.metaTitle || `${article?.title} | Phòng Khám An Toàn`,
    description: seo?.metaDescription || article?.excerpt,
    keywords: seo?.keywords,
  };
}

export default async function NewsDetailPage({ params }: { params: { slug: string } }) {
  const all: NewsArticleData[] = (await fetchStrapiCollection('/news-articles', { 'filters[slug][$eq]': params.slug })) || [];
  const article = all[0];

  if (!article) {
    return (
      <div className="py-40 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Không tìm thấy bài viết</h1>
        <Link href="/news" className="text-primary font-semibold">← Quay lại tin tức</Link>
      </div>
    );
  }

  return (
    <>
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <Link href="/news" className="text-white/60 hover:text-white text-sm mb-4 inline-block">← Tất cả tin tức</Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>
          {article.publishedAt && (
            <p className="text-white/60 text-sm">{new Date(article.publishedAt).toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          )}
        </div>
      </section>

      <article className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          {article.excerpt && (
            <p className="text-xl text-gray-600 leading-relaxed mb-8 font-medium">{article.excerpt}</p>
          )}
          {article.content && (
            <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-primary prose-strong:text-gray-900">
              <div dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br/>') }} />
            </div>
          )}

          {/* CTA */}
          <div className="mt-16 bg-primary rounded-2xl p-10 text-white text-center">
            <h2 className="text-2xl font-bold mb-3">Bạn quan tâm đến dịch vụ này?</h2>
            <p className="text-white/80 mb-6">Đặt lịch tư vấn miễn phí tại Số 10 Trần Điền</p>
            <Link href="/contact" className="inline-flex bg-white text-primary px-8 py-3 rounded-full font-bold hover:shadow-lg transition-all">
              Đặt lịch ngay
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
