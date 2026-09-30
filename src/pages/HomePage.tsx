import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { HeroSection } from '../components/home/HeroSection';
import { HomeSecondSection } from '../components/home/HomeSecondSection';
import { AboutPreview } from '../components/home/AboutPreview';
import { ProgramPreview } from '../components/home/ProgramPreview';
import { NewsPreview } from '../components/home/NewsPreview';
import { LeadershipPreview } from '../components/home/LeadershipPreview';
import { EventsPreview } from '../components/home/EventsPreview';
import { MediaPreview } from '../components/home/MediaPreview';
import { DocumentsPreview } from '../components/home/DocumentsPreview';
import { TransparencyPreview } from '../components/home/TransparencyPreview';
import { FaqSection } from '../components/home/FaqSection';
import { ContactSection } from '../components/home/ContactSection';
import { HomePreFooterSection } from '../components/home/HomePreFooterSection';

import { 
  getSiteSettings, getSiteSettingsSync, getNews, getLeaders, getLeadersSync, getEvents, 
  getDocuments, getFAQs, getMedia, getPrograms, seedInitialDataIfEmpty 
} from '../firebase/services';
import { 
  SiteSettings, NewsArticle, Leader, OrgEvent, 
  OrgDocument, FAQItem, MediaItem, PolicyProgram 
} from '../types';
import { 
  INITIAL_SITE_SETTINGS, INITIAL_NEWS, INITIAL_LEADERS, 
  INITIAL_EVENTS, INITIAL_DOCUMENTS, INITIAL_FAQS, INITIAL_MEDIA, INITIAL_PROGRAMS 
} from '../firebase/seedData';

// Reusable smooth animated section wrapper
const AnimatedSection: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ 
  children, 
  className = '',
  delay = 0
}) => (
  <motion.div
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export const HomePage: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings>(getSiteSettingsSync);
  const [news, setNews] = useState<NewsArticle[]>(INITIAL_NEWS);
  const [leaders, setLeaders] = useState<Leader[]>(getLeadersSync);
  const [events, setEvents] = useState<OrgEvent[]>(INITIAL_EVENTS);
  const [documents, setDocuments] = useState<OrgDocument[]>(INITIAL_DOCUMENTS);
  const [faqs, setFaqs] = useState<FAQItem[]>(INITIAL_FAQS);
  const [media, setMedia] = useState<MediaItem[]>(INITIAL_MEDIA);
  const [programs, setPrograms] = useState<PolicyProgram[]>(INITIAL_PROGRAMS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        // Try initial seed check in background
        seedInitialDataIfEmpty().catch(() => {});

        const [s, n, l, e, d, f, m, p] = await Promise.all([
          getSiteSettings(),
          getNews(),
          getLeaders(),
          getEvents(),
          getDocuments(),
          getFAQs(),
          getMedia(),
          getPrograms()
        ]);

        if (s) setSettings(s);
        if (n && n.length > 0) setNews(n);
        if (l) setLeaders(l);
        if (e && e.length > 0) setEvents(e);
        if (d && d.length > 0) setDocuments(d);
        if (f && f.length > 0) setFaqs(f);
        if (m && m.length > 0) setMedia(m);
        if (p && p.length > 0) setPrograms(p);
      } catch (err) {
        console.warn('Error loading home data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="overflow-hidden">
      {/* ১. হিরো সেকশন */}
      {settings.sectionVisibility?.hero !== false && (
        <AnimatedSection>
          <HeroSection settings={settings} />
        </AnimatedSection>
      )}

      {/* ২. কেন্দ্রীয় কার্যনির্বাহী পরিষদ (শীর্ষ যৌথ নেতৃত্ব) */}
      {settings.sectionVisibility?.leadership !== false && (
        <AnimatedSection>
          <LeadershipPreview leaders={leaders} />
        </AnimatedSection>
      )}

      {/* ৩. দলের প্রতিশ্রুতি ও প্রতীক সেকশন */}
      {settings.sectionVisibility?.secondSection !== false && (
        <AnimatedSection>
          <HomeSecondSection settings={settings} />
        </AnimatedSection>
      )}

      {/* ৪. সাংগঠনিক কাঠামো, নথি, অনুষ্ঠান, মিডিয়া, স্বচ্ছতা ও FAQ সম্বলিত ৬-কার্ডের বিশেষ সেকশন */}
      {settings.sectionVisibility?.preFooterCards !== false && (
        <AnimatedSection>
          <HomePreFooterSection />
        </AnimatedSection>
      )}

      {/* ৫. পরিচিতি ও দলীয় দর্শন */}
      <AnimatedSection>
        <AboutPreview />
      </AnimatedSection>

      {/* ৬. ১০ দফা কর্মসূচি */}
      {settings.sectionVisibility?.programs !== false && (
        <AnimatedSection>
          <ProgramPreview programs={programs} />
        </AnimatedSection>
      )}

      {/* ৭. সর্বশেষ সংবাদ ও প্রেস বিজ্ঞপ্তি */}
      <AnimatedSection>
        <NewsPreview news={news} />
      </AnimatedSection>

      {/* ৮. অনুষ্ঠান ও কার্যক্রম */}
      <AnimatedSection>
        <EventsPreview events={events} />
      </AnimatedSection>

      {/* ৯. মিডিয়া ও আলোকচিত্র গ্যালারি */}
      <AnimatedSection>
        <MediaPreview media={media} />
      </AnimatedSection>

      {/* ১০. প্রকাশনা ও দলীয় নথি */}
      <AnimatedSection>
        <DocumentsPreview documents={documents} />
      </AnimatedSection>

      {/* ১১. স্বচ্ছতা ও জবাবদিহিতা */}
      <AnimatedSection>
        <TransparencyPreview />
      </AnimatedSection>

      {/* ১২. সাধারণ জিজ্ঞাসা (FAQ) */}
      <AnimatedSection>
        <FaqSection faqs={faqs} />
      </AnimatedSection>

      {/* ১৩. যোগাযোগ সেকশন */}
      {settings.sectionVisibility?.contact !== false && (
        <AnimatedSection>
          <ContactSection settings={settings} />
        </AnimatedSection>
      )}
    </div>
  );
};
