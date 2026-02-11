export const dynamic = 'force-dynamic';

import { fetchStrapiSingle } from '@/lib/strapi';
import type { AboutPageData } from '@/lib/types';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const data: AboutPageData = await fetchStrapiSingle('/about-page');
  const seo = data?.seo;
  return {
    title: seo?.metaTitle || 'Về Chúng Tôi | Phòng Khám Thẩm Mỹ An Toàn',
    description: seo?.metaDescription,
    keywords: seo?.keywords,
  };
}

export default async function AboutPage() {
  const data: AboutPageData = await fetchStrapiSingle('/about-page');

  return (
    <>
      {/* Banner */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Về Chúng Tôi</h1>
          <p className="text-white/80 text-lg">Phòng Khám Thẩm Mỹ An Toàn – Số 10 Trần Điền, Hà Nội</p>
        </div>
      </section>

      {/* Intro */}
      {data?.introSection && (
        <section className="py-20">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{data.introSection.title}</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-8 rounded-full"></div>
            <p className="text-gray-600 text-lg leading-relaxed">{data.introSection.description}</p>
          </div>
        </section>
      )}

      {/* Mission Vision */}
      {data?.missionVision && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6"><span className="text-3xl">🎯</span></div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Sứ Mệnh</h3>
                <p className="text-gray-600 leading-relaxed">{data.missionVision.mission}</p>
              </div>
              <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6"><span className="text-3xl">🔭</span></div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Tầm Nhìn</h3>
                <p className="text-gray-600 leading-relaxed">{data.missionVision.vision}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Team */}
      {data?.teamSection && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">{data.teamSection.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {data.teamSection.members?.map((m, i) => (
                <div key={i} className="text-center bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                  <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6"><span className="text-4xl">👨‍⚕️</span></div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{m.name}</h3>
                  <p className="text-primary font-medium text-sm mb-3">{m.role}</p>
                  <p className="text-gray-600 text-sm">{m.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Facility */}
      {data?.facilitySection && (
        <section className="py-20 bg-primary text-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">{data.facilitySection.title}</h2>
            <p className="text-white/80 text-lg leading-relaxed mb-6">{data.facilitySection.description}</p>
            {data.facilitySection.address && (
              <p className="text-white font-semibold text-xl">📍 {data.facilitySection.address}</p>
            )}
          </div>
        </section>
      )}

      {/* CTA */}
      {data?.ctaSection && (
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{data.ctaSection.title}</h2>
            <p className="text-gray-600 text-lg mb-8">{data.ctaSection.description}</p>
            <a href={data.ctaSection.buttonUrl || '/lien-he'} className="inline-flex bg-primary text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-primary-dark transition-all hover:shadow-lg hover:-translate-y-1">
              {data.ctaSection.buttonText}
            </a>
          </div>
        </section>
      )}
    </>
  );
}
