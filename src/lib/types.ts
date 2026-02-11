/* eslint-disable @typescript-eslint/no-explicit-any */
export interface SeoData {
  metaTitle: string;
  metaDescription: string;
  keywords?: string;
  canonicalURL?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: any;
}

export interface HeroSection {
  title: string;
  subtitle?: string;
  backgroundImage?: any;
  ctaText?: string;
  ctaUrl?: string;
}

export interface IntroSection {
  title: string;
  description?: string;
  image?: any;
}

export interface FeaturedServicesSection {
  title: string;
  subtitle?: string;
}

export interface WhyChooseUsItem {
  icon: string;
  title: string;
  description: string;
}

export interface WhyChooseUsSection {
  title: string;
  items: WhyChooseUsItem[];
}

export interface ProcessStep {
  step: number;
  title: string;
  description?: string;
  desc?: string;
}

export interface ProcessSection {
  title: string;
  steps: ProcessStep[];
}

export interface TestimonialItem {
  name: string;
  content: string;
  role?: string;
}

export interface TestimonialsSection {
  title: string;
  items: TestimonialItem[];
}

export interface CtaSection {
  title: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
  phone?: string;
}

export interface MissionVisionSection {
  mission: string;
  vision: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio?: string;
}

export interface TeamSection {
  title: string;
  members: TeamMember[];
}

export interface FacilitySection {
  title: string;
  description?: string;
  address?: string;
  images?: any;
}

export interface ContactInfo {
  address: string;
  phone: string;
  email?: string;
  workingHours?: string;
}

export interface MapSection {
  title?: string;
  embedUrl: string;
}

export interface ContactFormSection {
  title: string;
  description?: string;
}

export interface GlobalData {
  siteName: string;
  logo?: any;
  address: string;
  phone: string;
  email?: string;
  defaultSeo?: SeoData;
}

export interface HomePageData {
  heroSection?: HeroSection;
  introSection?: IntroSection;
  featuredServices?: FeaturedServicesSection;
  whyChooseUs?: WhyChooseUsSection;
  processSection?: ProcessSection;
  testimonials?: TestimonialsSection;
  ctaSection?: CtaSection;
  seo?: SeoData;
}

export interface AboutPageData {
  introSection?: IntroSection;
  missionVision?: MissionVisionSection;
  teamSection?: TeamSection;
  facilitySection?: FacilitySection;
  ctaSection?: CtaSection;
  seo?: SeoData;
}

export interface ContactPageData {
  contactInfo?: ContactInfo;
  mapSection?: MapSection;
  contactFormSection?: ContactFormSection;
  seo?: SeoData;
}

export interface FAQ {
  q: string;
  a: string;
}

export interface ServiceData {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description?: string;
  content?: string;
  benefits?: string[];
  process?: ProcessStep[];
  priceFrom?: string;
  faqs?: FAQ[];
  image?: any;
  seo?: SeoData;
}

export interface NewsArticleData {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  coverImage?: any;
  publishedAt?: string;
  seo?: SeoData;
}
