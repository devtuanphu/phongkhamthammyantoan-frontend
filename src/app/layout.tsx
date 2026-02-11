import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Phòng Khám Thẩm Mỹ An Toàn – Số 10 Trần Điền, Hà Nội",
  description: "Phòng Khám Thẩm Mỹ An Toàn tại Số 10 Trần Điền, Hà Nội – Địa chỉ tư vấn và thực hiện dịch vụ thẩm mỹ uy tín, an toàn.",
  keywords: "phòng khám thẩm mỹ, 10 Trần Điền, thẩm mỹ Hà Nội, phòng khám an toàn",
  openGraph: {
    title: "Phòng Khám Thẩm Mỹ An Toàn – Số 10 Trần Điền",
    description: "Tư vấn dịch vụ thẩm mỹ uy tín tại Số 10 Trần Điền, Hà Nội",
    url: "https://phongkhamthammyantoan.com",
    siteName: "Phòng Khám Thẩm Mỹ An Toàn",
    locale: "vi_VN",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="min-h-screen flex flex-col">
        <JsonLd />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
