export const dynamic = 'force-dynamic';

import { fetchStrapiSingle } from '@/lib/strapi';
import type { ContactPageData } from '@/lib/types';
import LeadForm from '@/components/LeadForm';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const data: ContactPageData = await fetchStrapiSingle('/contact-page');
  const seo = data?.seo;
  return {
    title: seo?.metaTitle || 'Liên Hệ | Phòng Khám Thẩm Mỹ An Toàn – 10 Trần Điền',
    description: seo?.metaDescription,
    keywords: seo?.keywords,
  };
}

export default async function ContactPage() {
  const data: ContactPageData = await fetchStrapiSingle('/contact-page');

  return (
    <>
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Liên Hệ</h1>
          <p className="text-white/80 text-lg">Tư vấn miễn phí tại Số 10 Trần Điền, Hà Nội</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info + Map */}
            <div className="space-y-8">
              {data?.contactInfo && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">Thông Tin Liên Hệ</h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 bg-gray-50 rounded-xl p-5">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0"><span className="text-xl">📍</span></div>
                      <div>
                        <p className="font-semibold text-gray-900">Địa chỉ</p>
                        <p className="text-gray-600">{data.contactInfo.address}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 bg-gray-50 rounded-xl p-5">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0"><span className="text-xl">📞</span></div>
                      <div>
                        <p className="font-semibold text-gray-900">Hotline</p>
                        <a href={`tel:${data.contactInfo.phone.replace(/\s/g, '')}`} className="text-primary font-bold text-lg">{data.contactInfo.phone}</a>
                      </div>
                    </div>
                    {data.contactInfo.email && (
                      <div className="flex items-start gap-4 bg-gray-50 rounded-xl p-5">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0"><span className="text-xl">✉️</span></div>
                        <div>
                          <p className="font-semibold text-gray-900">Email</p>
                          <a href={`mailto:${data.contactInfo.email}`} className="text-primary">{data.contactInfo.email}</a>
                        </div>
                      </div>
                    )}
                    {data.contactInfo.workingHours && (
                      <div className="flex items-start gap-4 bg-gray-50 rounded-xl p-5">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0"><span className="text-xl">🕐</span></div>
                        <div>
                          <p className="font-semibold text-gray-900">Giờ làm việc</p>
                          <p className="text-gray-600">{data.contactInfo.workingHours}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Map */}
              {data?.mapSection?.embedUrl && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{data.mapSection.title || 'Bản Đồ'}</h2>
                  <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                    <iframe
                      src={data.mapSection.embedUrl}
                      width="100%"
                      height="350"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Google Maps"
                    ></iframe>
                  </div>
                </div>
              )}
            </div>

            {/* Form */}
            <div>
              <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm sticky top-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{data?.contactFormSection?.title || 'Gửi Yêu Cầu Tư Vấn'}</h2>
                <p className="text-gray-600 mb-6">{data?.contactFormSection?.description || 'Để lại thông tin, chúng tôi sẽ liên hệ trong 24h'}</p>
                <LeadForm sourcePage="contact" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Call */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Gọi Ngay Để Được Tư Vấn</h2>
          <p className="text-white/80 mb-6">Đội ngũ tư vấn sẵn sàng hỗ trợ bạn</p>
          <a href="tel:0909888999" className="inline-flex bg-white text-primary px-10 py-4 rounded-full font-bold text-xl hover:shadow-2xl transition-all hover:-translate-y-1">
            📞 0909 888 999
          </a>
        </div>
      </section>
    </>
  );
}
