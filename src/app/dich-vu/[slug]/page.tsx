export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { fetchStrapiCollection } from '@/lib/strapi';
import type { ServiceData } from '@/lib/types';
import LeadForm from '@/components/LeadForm';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const all: ServiceData[] = (await fetchStrapiCollection('/services', { 'filters[slug][$eq]': params.slug })) || [];
  const service = all[0];
  const seo = service?.seo;
  return {
    title: seo?.metaTitle || `${service?.title} | Phòng Khám An Toàn`,
    description: seo?.metaDescription || service?.description,
    keywords: seo?.keywords,
  };
}

export default async function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const all: ServiceData[] = (await fetchStrapiCollection('/services', { 'filters[slug][$eq]': params.slug })) || [];
  const service = all[0];

  if (!service) {
    return (
      <div className="py-40 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Không tìm thấy dịch vụ</h1>
        <Link href="/dich-vu" className="text-primary font-semibold">← Quay lại danh sách dịch vụ</Link>
      </div>
    );
  }

  return (
    <>
      {/* Banner */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/dich-vu" className="text-white/60 hover:text-white text-sm mb-4 inline-block">← Tất cả dịch vụ</Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{service.title}</h1>
          <p className="text-white/80 text-lg max-w-2xl">{service.description}</p>
          {service.priceFrom && <p className="mt-4 text-2xl font-bold">Từ {service.priceFrom}</p>}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Content */}
            {service.content && (
              <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600">
                <div dangerouslySetInnerHTML={{ __html: service.content.replace(/\n/g, '<br/>') }} />
              </div>
            )}

            {/* Benefits */}
            {service.benefits && service.benefits.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Lợi Ích</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.benefits.map((b, i) => (
                    <div key={i} className="flex items-start gap-3 bg-primary-50 rounded-xl p-4">
                      <span className="text-primary text-lg mt-0.5">✓</span>
                      <span className="text-gray-700">{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Process */}
            {service.process && service.process.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Quy Trình Thực Hiện</h2>
                <div className="space-y-4">
                  {service.process.map((p, i) => (
                    <div key={i} className="flex items-start gap-4 bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                      <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center shrink-0 font-bold">{p.step}</div>
                      <div>
                        <h3 className="font-bold text-gray-900">{p.title}</h3>
                        <p className="text-gray-600 text-sm mt-1">{p.desc || p.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FAQ */}
            {service.faqs && service.faqs.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Câu Hỏi Thường Gặp</h2>
                <div className="space-y-4">
                  {service.faqs.map((faq, i) => (
                    <div key={i} className="bg-gray-50 rounded-xl p-6">
                      <h3 className="font-bold text-gray-900 mb-2">❓ {faq.q}</h3>
                      <p className="text-gray-600">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Đặt Lịch Tư Vấn</h3>
                <p className="text-gray-600 text-sm mb-6">Tư vấn miễn phí tại Số 10 Trần Điền</p>
                <LeadForm sourcePage={`service-${service.slug}`} />
              </div>
              <div className="bg-primary rounded-2xl p-8 text-white text-center">
                <p className="font-bold text-lg mb-2">Hotline</p>
                <a href="tel:0909888999" className="text-2xl font-bold hover:underline">0909 888 999</a>
                <p className="text-white/70 text-sm mt-2">📍 Số 10 Trần Điền, Hà Nội</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
