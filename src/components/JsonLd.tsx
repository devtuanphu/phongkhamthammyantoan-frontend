export default function JsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: 'Phòng Khám Thẩm Mỹ An Toàn',
    description: 'Tư vấn và thực hiện dịch vụ thẩm mỹ uy tín tại Số 10 Trần Điền, Hà Nội',
    url: 'https://phongkhamthammyantoan.com',
    telephone: '0909888999',
    email: 'contact@phongkhamthammyantoan.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Số 10 Trần Điền',
      addressLocality: 'Hoàng Mai',
      addressRegion: 'Hà Nội',
      addressCountry: 'VN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 20.98,
      longitude: 105.838,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '08:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '08:00',
        closes: '12:00',
      },
    ],
    image: 'https://phongkhamthammyantoan.com/logo.png',
    priceRange: '$$',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
