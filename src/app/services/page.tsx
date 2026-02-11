export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { fetchStrapiCollection } from '@/lib/strapi';
import type { ServiceData } from '@/lib/types';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dịch Vụ Thẩm Mỹ | Phòng Khám An Toàn – 10 Trần Điền',
  description: 'Danh sách dịch vụ thẩm mỹ tại Số 10 Trần Điền, Hà Nội. Nâng mũi, cắt mí, tiêm filler, căng chỉ, hút mỡ, trẻ hóa da.',
  keywords: 'dịch vụ thẩm mỹ, 10 Trần Điền, nâng mũi, cắt mí, filler',
};

export default async function ServicesPage() {
  const services: ServiceData[] = (await fetchStrapiCollection('/services')) || [];

  return (
    <>
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Dịch Vụ Thẩm Mỹ</h1>
          <p className="text-white/80 text-lg">Khám phá các dịch vụ tại Số 10 Trần Điền, Hà Nội</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                <div className="h-48 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                  <span className="text-6xl opacity-50">✨</span>
                </div>
                <div className="p-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">{s.title}</h2>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">{s.description}</p>
                  <div className="flex items-center justify-between">
                    {s.priceFrom && <span className="text-primary font-bold">Từ {s.priceFrom}</span>}
                    <span className="text-primary text-sm font-medium group-hover:translate-x-1 transition-transform">Xem chi tiết →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Bạn Cần Tư Vấn?</h2>
          <p className="text-gray-600 text-lg mb-8">Liên hệ ngay để được bác sĩ tư vấn miễn phí tại Số 10 Trần Điền</p>
          <Link href="/contact" className="inline-flex bg-primary text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-primary-dark transition-all hover:shadow-lg hover:-translate-y-1">
            Đặt lịch tư vấn
          </Link>
        </div>
      </section>
    </>
  );
}
