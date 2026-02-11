export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { fetchStrapiSingle, fetchStrapiCollection } from '@/lib/strapi';
import type { HomePageData, ServiceData } from '@/lib/types';
import LeadForm from '@/components/LeadForm';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const data: HomePageData = await fetchStrapiSingle('/home-page');
  const seo = data?.seo;
  return {
    title: seo?.metaTitle || 'Phòng Khám Thẩm Mỹ An Toàn – 10 Trần Điền',
    description: seo?.metaDescription || 'Tư vấn dịch vụ thẩm mỹ uy tín tại Số 10 Trần Điền, Hà Nội',
    keywords: seo?.keywords,
    openGraph: { title: seo?.ogTitle || seo?.metaTitle, description: seo?.ogDescription || seo?.metaDescription },
  };
}

export default async function HomePage() {
  const data: HomePageData = await fetchStrapiSingle('/home-page');
  const services: ServiceData[] = (await fetchStrapiCollection('/services')) || [];

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary via-primary-dark to-primary-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in">
              {data?.heroSection?.title || 'Phòng Khám Thẩm Mỹ An Toàn'}
            </h1>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8 animate-slide-up">
              {data?.heroSection?.subtitle || 'Tư vấn & thực hiện dịch vụ thẩm mỹ uy tín tại Số 10 Trần Điền, Hà Nội'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up">
              <Link href={data?.heroSection?.ctaUrl || '/lien-he'} className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-white/20 transition-all duration-300 hover:-translate-y-1">
                {data?.heroSection?.ctaText || 'Đặt lịch tư vấn'}
              </Link>
              <a href="tel:0909888999" className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all">
                📞 0909 888 999
              </a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Intro */}
      {data?.introSection && (
        <section className="py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{data.introSection.title}</h2>
              <div className="w-20 h-1 bg-primary mx-auto mb-8 rounded-full"></div>
              <p className="text-lg text-gray-600 leading-relaxed">{data.introSection.description}</p>
            </div>
          </div>
        </section>
      )}

      {/* Featured Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{data?.featuredServices?.title || 'Dịch Vụ Nổi Bật'}</h2>
            <p className="text-gray-600 text-lg">{data?.featuredServices?.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.slice(0, 6).map((s) => (
              <Link key={s.slug} href={`/dich-vu/${s.slug}`} className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <span className="text-2xl">✨</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">{s.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">{s.description}</p>
                {s.priceFrom && <p className="text-primary font-semibold">Từ {s.priceFrom}</p>}
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/dich-vu" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
              Xem tất cả dịch vụ →
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      {data?.whyChooseUs && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16">{data.whyChooseUs.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {data.whyChooseUs.items?.map((item, i) => (
                <div key={i} className="text-center p-6">
                  <div className="text-5xl mb-6">{item.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process */}
      {data?.processSection && (
        <section className="py-20 bg-primary text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">{data.processSection.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {data.processSection.steps?.map((step, i) => (
                <div key={i} className="text-center relative">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">{step.step}</div>
                  <h3 className="font-bold mb-2">{step.title}</h3>
                  <p className="text-white/70 text-sm">{step.description || step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {data?.testimonials && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16">{data.testimonials.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {data.testimonials.items?.map((t, i) => (
                <div key={i} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-1 text-yellow-400 mb-4">{'★★★★★'}</div>
                  <p className="text-gray-600 italic mb-6 leading-relaxed">&ldquo;{t.content}&rdquo;</p>
                  <div>
                    <p className="font-bold text-gray-900">{t.name}</p>
                    <p className="text-gray-500 text-sm">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      {data?.ctaSection && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-primary to-primary-dark rounded-3xl p-12 md:p-16 text-white text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{data.ctaSection.title}</h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">{data.ctaSection.description}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={data.ctaSection.buttonUrl || '/lien-he'} className="bg-white text-primary px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all hover:-translate-y-1">
                  {data.ctaSection.buttonText}
                </Link>
                {data.ctaSection.phone && (
                  <a href={`tel:${data.ctaSection.phone.replace(/\s/g, '')}`} className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all">
                    📞 {data.ctaSection.phone}
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Inline Lead Form */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Đăng Ký Tư Vấn</h2>
          <p className="text-gray-600 text-center mb-8">Để lại thông tin, chúng tôi sẽ liên hệ tư vấn miễn phí</p>
          <LeadForm sourcePage="home" />
        </div>
      </section>
    </>
  );
}
