export interface Leader {
  id: string;
  name: string;
  nameEn: string;
  position: string;
  positionEn: string;
  photoUrl: string;
  bio: string;
  order: number;
  published: boolean;
  department?: string;
  education?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: 'সংবাদ বিজ্ঞপ্তি' | 'সাংগঠনিক' | 'নীতি ও উন্নয়ন' | 'প্রেস রিলিজ' | 'বক্তব্য ও সাক্ষাৎকার';
  author: string;
  published: boolean;
  publishedAt: string;
  createdAt: string;
  updatedAt?: string;
  tags?: string[];
}

export interface OrgEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  coverImage: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  category?: string;
  registrationOpen?: boolean;
  createdAt: string;
}

export interface MediaItem {
  id: string;
  type: 'photo' | 'video' | 'press';
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  date: string;
  published: boolean;
  source?: string;
}

export interface OrgDocument {
  id: string;
  title: string;
  category: 'গঠনতন্ত্র' | 'নীতিপত্র' | '১০ দফা কর্মসূচি' | 'প্রকাশনা' | 'অফিসিয়াল বিবৃতি';
  description: string;
  fileUrl: string;
  fileSize: string;
  fileType: string;
  published: boolean;
  publishedAt: string;
  createdAt: string;
  downloadCount?: number;
}

export interface MemberMessageLog {
  id: string;
  sender: string;
  channel: 'whatsapp' | 'sms' | 'email' | 'system';
  message: string;
  sentAt: string;
}

export interface PartyMember {
  id: string;
  memberId: string;
  name: string;
  division: string;
  district?: string;
  upazila?: string;
  phone: string;
  email?: string;
  occupation?: string;
  notes?: string;
  status: 'active' | 'pending' | 'verified';
  createdAt: string;
  messagesSent?: MemberMessageLog[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'archived';
  createdAt: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  published: boolean;
}

export interface PolicyProgram {
  id: string;
  number: number;
  title: string;
  titleEn: string;
  summary: string;
  details: string;
  keyObjectives: string[];
  icon: string;
}

export interface SiteSettings {
  id?: string;
  siteName: string;
  siteNameEn: string;
  tagline: string;
  heroTitle: string;
  heroDescription: string;
  contactEmail: string;
  phone: string;
  address: string;
  hotline?: string;
  socialFacebook: string;
  socialTwitter: string;
  socialYoutube: string;
  footerText: string;
  transparencyReportUrl?: string;

  // Dynamic Homepage Control Configuration
  hero?: {
    tagline?: string;
    title?: string;
    ribbonText?: string;
    description?: string;
    bannerImageUrl?: string;
    announcementTicker?: string;
    primaryBtnText?: string;
    primaryBtnLink?: string;
    secondaryBtnText?: string;
    secondaryBtnLink?: string;
  };

  secondSection?: {
    promiseTitle1?: string;
    promiseTitle2?: string;
    promiseTitle3?: string;
    promiseDescription?: string;
    promiseBannerUrl?: string;
    emblemTitle?: string;
    emblemDescription?: string;
    emblemBannerUrl?: string;
    featuredNewsBadge?: string;
    featuredNewsTitle?: string;
    featuredNewsImage?: string;
    featuredNewsSlug?: string;
    videoTitle?: string;
    videoThumbnail?: string;
    videoUrl?: string;
  };

  preFooter?: {
    ctaTitle?: string;
    ctaDescription?: string;
    ctaButtonText?: string;
    ctaButtonLink?: string;
    secondaryButtonText?: string;
    secondaryButtonLink?: string;
  };

  sectionVisibility?: {
    hero?: boolean;
    secondSection?: boolean;
    programs?: boolean;
    leadership?: boolean;
    preFooterCards?: boolean;
    contact?: boolean;
  };
}

export interface AdminUser {
  uid: string;
  email: string;
  displayName: string;
  role: 'admin' | 'editor';
}
