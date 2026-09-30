import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  limit,
  Timestamp
} from 'firebase/firestore';
import { db } from './config';
import { 
  Leader, NewsArticle, OrgEvent, MediaItem, OrgDocument, FAQItem, PolicyProgram, SiteSettings, ContactMessage, PartyMember, MemberMessageLog 
} from '../types';
import { 
  INITIAL_SITE_SETTINGS, INITIAL_PROGRAMS, INITIAL_LEADERS, 
  INITIAL_NEWS, INITIAL_EVENTS, INITIAL_DOCUMENTS, INITIAL_FAQS, INITIAL_MEDIA, INITIAL_MEMBERS 
} from './seedData';
import mahfuzurImg from '../assets/images/mahfuzur_rahman_sg_1790624790511.jpg';

// Helper to seed initial collections into Firestore if empty
export async function seedInitialDataIfEmpty(): Promise<void> {
  try {
    const settingsSnap = await getDoc(doc(db, 'siteSettings', 'main'));
    if (!settingsSnap.exists()) {
      console.log('Seeding initial site settings and data into Firestore...');
      await setDoc(doc(db, 'siteSettings', 'main'), INITIAL_SITE_SETTINGS);

      // Seed leaders
      for (const item of INITIAL_LEADERS) {
        await setDoc(doc(db, 'leaders', item.id), item);
      }
      // Seed news
      for (const item of INITIAL_NEWS) {
        await setDoc(doc(db, 'news', item.id), item);
      }
      // Seed events
      for (const item of INITIAL_EVENTS) {
        await setDoc(doc(db, 'events', item.id), item);
      }
      // Seed documents
      for (const item of INITIAL_DOCUMENTS) {
        await setDoc(doc(db, 'documents', item.id), item);
      }
      // Seed FAQs
      for (const item of INITIAL_FAQS) {
        await setDoc(doc(db, 'faq', item.id), item);
      }
      // Seed Media
      for (const item of INITIAL_MEDIA) {
        await setDoc(doc(db, 'media', item.id), item);
      }
      // Seed Programs
      for (const item of INITIAL_PROGRAMS) {
        await setDoc(doc(db, 'programs', item.id), item);
      }
      console.log('Initial data seeded successfully.');
    }
  } catch (err) {
    console.warn('Seeding check encountered an issue (using in-memory fallback if needed):', err);
  }
}

// ---------------- Site Settings ----------------
const LOCAL_SETTINGS_KEY = 'brp_site_settings_cache';

export async function getSiteSettings(): Promise<SiteSettings> {
  let loadedSettings: Partial<SiteSettings> = {};
  
  // 1. Try Firestore first
  try {
    const snap = await getDoc(doc(db, 'siteSettings', 'main'));
    if (snap.exists()) {
      loadedSettings = snap.data() as Partial<SiteSettings>;
    }
  } catch (err) {
    console.warn('Failed to load siteSettings from Firestore, checking local storage:', err);
  }

  // 2. If Firestore was empty or failed, check localStorage cache
  if (Object.keys(loadedSettings).length === 0) {
    try {
      const cached = localStorage.getItem(LOCAL_SETTINGS_KEY);
      if (cached) {
        loadedSettings = JSON.parse(cached);
      }
    } catch {
      // Ignore localStorage parse errors
    }
  }

  // 3. Deep merge with INITIAL_SITE_SETTINGS to ensure all sections and keys are fully populated
  const merged: SiteSettings = {
    ...INITIAL_SITE_SETTINGS,
    ...loadedSettings,
    hero: {
      ...INITIAL_SITE_SETTINGS.hero,
      ...(loadedSettings.hero || {})
    },
    secondSection: {
      ...INITIAL_SITE_SETTINGS.secondSection,
      ...(loadedSettings.secondSection || {})
    },
    preFooter: {
      ...INITIAL_SITE_SETTINGS.preFooter,
      ...(loadedSettings.preFooter || {})
    },
    sectionVisibility: {
      ...INITIAL_SITE_SETTINGS.sectionVisibility,
      ...(loadedSettings.sectionVisibility || {})
    }
  };

  // Cache merged settings
  try {
    localStorage.setItem(LOCAL_SETTINGS_KEY, JSON.stringify(merged));
  } catch {
    // ignore
  }

  return merged;
}

export function getSiteSettingsSync(): SiteSettings {
  try {
    const cached = localStorage.getItem(LOCAL_SETTINGS_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      return {
        ...INITIAL_SITE_SETTINGS,
        ...parsed,
        hero: {
          ...INITIAL_SITE_SETTINGS.hero,
          ...(parsed.hero || {})
        },
        secondSection: {
          ...INITIAL_SITE_SETTINGS.secondSection,
          ...(parsed.secondSection || {})
        },
        preFooter: {
          ...INITIAL_SITE_SETTINGS.preFooter,
          ...(parsed.preFooter || {})
        },
        sectionVisibility: {
          ...INITIAL_SITE_SETTINGS.sectionVisibility,
          ...(parsed.sectionVisibility || {})
        }
      };
    }
  } catch {
    // ignore
  }
  return INITIAL_SITE_SETTINGS;
}

export async function updateSiteSettings(settings: Partial<SiteSettings>): Promise<void> {
  // Update local storage immediately for zero-delay UX
  try {
    const current = await getSiteSettings();
    const updated = {
      ...current,
      ...settings,
      hero: {
        ...current.hero,
        ...(settings.hero || {})
      },
      secondSection: {
        ...current.secondSection,
        ...(settings.secondSection || {})
      },
      preFooter: {
        ...current.preFooter,
        ...(settings.preFooter || {})
      },
      sectionVisibility: {
        ...current.sectionVisibility,
        ...(settings.sectionVisibility || {})
      }
    };
    localStorage.setItem(LOCAL_SETTINGS_KEY, JSON.stringify(updated));
  } catch {
    // ignore
  }

  // Persist to Firestore
  try {
    await setDoc(doc(db, 'siteSettings', 'main'), settings, { merge: true });
  } catch (err) {
    console.warn('Could not persist settings to Firestore (saved locally):', err);
  }
}

// ---------------- Leaders ----------------
const LOCAL_LEADERS_KEY = 'brp_leaders_cache';
const LOCAL_DELETED_LEADERS_KEY = 'brp_deleted_leaders_ids';

function getDeletedLeaderIds(): Set<string> {
  try {
    const raw = localStorage.getItem(LOCAL_DELETED_LEADERS_KEY);
    if (raw) return new Set(JSON.parse(raw));
  } catch {
    // ignore
  }
  return new Set();
}

function addDeletedLeaderId(id: string) {
  try {
    const set = getDeletedLeaderIds();
    set.add(id);
    localStorage.setItem(LOCAL_DELETED_LEADERS_KEY, JSON.stringify(Array.from(set)));
  } catch {
    // ignore
  }
}

function removeDeletedLeaderId(id: string) {
  try {
    const set = getDeletedLeaderIds();
    set.delete(id);
    localStorage.setItem(LOCAL_DELETED_LEADERS_KEY, JSON.stringify(Array.from(set)));
  } catch {
    // ignore
  }
}

export async function getLeaders(): Promise<Leader[]> {
  const deletedIds = getDeletedLeaderIds();

  try {
    const q = query(collection(db, 'leaders'), orderBy('order', 'asc'));
    const snap = await getDocs(q);
    if (!snap.empty) {
      const items = snap.docs
        .map(d => {
          const item = { id: d.id, ...d.data() } as Leader;
          if (!item.photoUrl || item.photoUrl.includes('WhatsApp%20Image') || item.photoUrl.includes('1790624790511')) {
            if (item.id === 'leader-1' || item.name.includes('মাহফুজুর রহমান') || item.position.includes('মহাসচিব')) {
              return { ...item, photoUrl: 'https://fsitayxgbtoebunoeicw.supabase.co/storage/v1/object/public/brp/ChatGPT%20Image%20Sep%2030,%202026,%2009_49_20%20AM.png' };
            }
          }
          return item;
        })
        .filter(l => !deletedIds.has(l.id));

      try {
        localStorage.setItem(LOCAL_LEADERS_KEY, JSON.stringify(items));
      } catch {
        // ignore
      }
      return items;
    }
  } catch (err) {
    console.warn('Using leaders local cache or initial fallback:', err);
  }

  // Fallback to synchronous cached resolution
  return getLeadersSync();
}

export function getLeadersSync(): Leader[] {
  const deletedIds = getDeletedLeaderIds();
  try {
    const cached = localStorage.getItem(LOCAL_LEADERS_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed
          .filter((l: Leader) => !deletedIds.has(l.id))
          .map((l: Leader) => {
            if (l.id === 'leader-1' && (!l.photoUrl || l.photoUrl.includes('1790624790511') || l.photoUrl.includes('WhatsApp%20Image'))) {
              return {
                ...l,
                photoUrl: 'https://fsitayxgbtoebunoeicw.supabase.co/storage/v1/object/public/brp/ChatGPT%20Image%20Sep%2030,%202026,%2009_49_20%20AM.png'
              };
            }
            return l;
          });
      }
    }
  } catch {
    // ignore
  }

  return INITIAL_LEADERS.filter(l => !deletedIds.has(l.id));
}

export async function saveLeader(leader: Leader): Promise<void> {
  removeDeletedLeaderId(leader.id);

  const updatedLeader: Leader = {
    ...leader,
    updatedAt: new Date().toISOString()
  };

  // 1. Immediately update localStorage cache
  try {
    const cached = localStorage.getItem(LOCAL_LEADERS_KEY);
    let list: Leader[] = cached ? JSON.parse(cached) : [...INITIAL_LEADERS];
    const idx = list.findIndex(l => l.id === leader.id);
    if (idx >= 0) {
      list[idx] = updatedLeader;
    } else {
      list.push(updatedLeader);
    }
    list = list.filter(l => !getDeletedLeaderIds().has(l.id));
    list.sort((a, b) => (a.order || 99) - (b.order || 99));
    localStorage.setItem(LOCAL_LEADERS_KEY, JSON.stringify(list));
  } catch {
    // ignore
  }

  // 2. Persist to Firestore
  try {
    const docRef = doc(db, 'leaders', leader.id);
    await setDoc(docRef, updatedLeader, { merge: true });
  } catch (err) {
    console.warn('Could not persist leader to Firestore (saved locally):', err);
  }
}

export async function deleteLeader(id: string): Promise<void> {
  addDeletedLeaderId(id);

  // 1. Update localStorage cache
  try {
    const cached = localStorage.getItem(LOCAL_LEADERS_KEY);
    const list: Leader[] = cached ? JSON.parse(cached) : [...INITIAL_LEADERS];
    const filtered = list.filter(l => l.id !== id);
    localStorage.setItem(LOCAL_LEADERS_KEY, JSON.stringify(filtered));
  } catch {
    // ignore
  }

  // 2. Delete from Firestore
  try {
    await deleteDoc(doc(db, 'leaders', id));
  } catch (err) {
    console.warn('Could not delete leader from Firestore (deleted locally):', err);
  }
}

// ---------------- News ----------------
export async function getNews(): Promise<NewsArticle[]> {
  try {
    const q = query(collection(db, 'news'), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    if (!snap.empty) {
      return snap.docs.map(d => ({ id: d.id, ...d.data() } as NewsArticle));
    }
  } catch (err) {
    console.warn('Using initial news fallback:', err);
  }
  return INITIAL_NEWS;
}

export async function getNewsBySlug(slug: string): Promise<NewsArticle | null> {
  try {
    const q = query(collection(db, 'news'), where('slug', '==', slug), limit(1));
    const snap = await getDocs(q);
    if (!snap.empty) {
      const d = snap.docs[0];
      return { id: d.id, ...d.data() } as NewsArticle;
    }
  } catch (err) {
    console.warn('Error fetching news by slug, checking fallback:', err);
  }
  return INITIAL_NEWS.find(n => n.slug === slug) || null;
}

export async function saveNewsArticle(article: NewsArticle): Promise<void> {
  const docRef = doc(db, 'news', article.id);
  await setDoc(docRef, {
    ...article,
    updatedAt: new Date().toISOString()
  }, { merge: true });
}

export async function deleteNewsArticle(id: string): Promise<void> {
  await deleteDoc(doc(db, 'news', id));
}

// ---------------- Events ----------------
export async function getEvents(): Promise<OrgEvent[]> {
  try {
    const snap = await getDocs(collection(db, 'events'));
    if (!snap.empty) {
      const items = snap.docs.map(d => ({ id: d.id, ...d.data() } as OrgEvent));
      return items.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    }
  } catch (err) {
    console.warn('Using initial events fallback:', err);
  }
  return INITIAL_EVENTS;
}

export async function saveEvent(event: OrgEvent): Promise<void> {
  const docRef = doc(db, 'events', event.id);
  await setDoc(docRef, event, { merge: true });
}

export async function deleteEvent(id: string): Promise<void> {
  await deleteDoc(doc(db, 'events', id));
}

// ---------------- Media ----------------
export async function getMedia(): Promise<MediaItem[]> {
  try {
    const snap = await getDocs(collection(db, 'media'));
    if (!snap.empty) {
      return snap.docs.map(d => ({ id: d.id, ...d.data() } as MediaItem));
    }
  } catch (err) {
    console.warn('Using initial media fallback:', err);
  }
  return INITIAL_MEDIA;
}

export async function saveMedia(item: MediaItem): Promise<void> {
  const docRef = doc(db, 'media', item.id);
  await setDoc(docRef, item, { merge: true });
}

export async function deleteMedia(id: string): Promise<void> {
  await deleteDoc(doc(db, 'media', id));
}

// ---------------- Documents ----------------
export async function getDocuments(): Promise<OrgDocument[]> {
  try {
    const snap = await getDocs(collection(db, 'documents'));
    if (!snap.empty) {
      return snap.docs.map(d => ({ id: d.id, ...d.data() } as OrgDocument));
    }
  } catch (err) {
    console.warn('Using initial documents fallback:', err);
  }
  return INITIAL_DOCUMENTS;
}

export async function saveDocument(docData: OrgDocument): Promise<void> {
  const docRef = doc(db, 'documents', docData.id);
  await setDoc(docRef, docData, { merge: true });
}

export async function deleteDocument(id: string): Promise<void> {
  await deleteDoc(doc(db, 'documents', id));
}

// ---------------- FAQs ----------------
export async function getFAQs(): Promise<FAQItem[]> {
  try {
    const q = query(collection(db, 'faq'), orderBy('order', 'asc'));
    const snap = await getDocs(q);
    if (!snap.empty) {
      return snap.docs.map(d => ({ id: d.id, ...d.data() } as FAQItem));
    }
  } catch (err) {
    console.warn('Using initial FAQs fallback:', err);
  }
  return INITIAL_FAQS;
}

export async function saveFAQ(item: FAQItem): Promise<void> {
  const docRef = doc(db, 'faq', item.id);
  await setDoc(docRef, item, { merge: true });
}

export async function deleteFAQ(id: string): Promise<void> {
  await deleteDoc(doc(db, 'faq', id));
}

// ---------------- Programs (10-Point) ----------------
export async function getPrograms(): Promise<PolicyProgram[]> {
  try {
    const q = query(collection(db, 'programs'), orderBy('number', 'asc'));
    const snap = await getDocs(q);
    if (!snap.empty) {
      return snap.docs.map(d => ({ id: d.id, ...d.data() } as PolicyProgram));
    }
  } catch (err) {
    console.warn('Using initial programs fallback:', err);
  }
  return INITIAL_PROGRAMS;
}

export async function saveProgram(program: PolicyProgram): Promise<void> {
  const docRef = doc(db, 'programs', program.id);
  await setDoc(docRef, program, { merge: true });
}

// ---------------- Contact Messages ----------------
export async function submitContactMessage(msg: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}): Promise<string> {
  const payload = {
    ...msg,
    status: 'unread',
    createdAt: new Date().toISOString()
  };
  const docRef = await addDoc(collection(db, 'contactMessages'), payload);
  return docRef.id;
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  try {
    const snap = await getDocs(collection(db, 'contactMessages'));
    const messages = snap.docs.map(d => ({ id: d.id, ...d.data() } as ContactMessage));
    return messages.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  } catch (err) {
    console.error('Error fetching contact messages:', err);
    return [];
  }
}

export async function updateMessageStatus(id: string, status: 'unread' | 'read' | 'archived'): Promise<void> {
  await updateDoc(doc(db, 'contactMessages', id), { status });
}

export async function deleteContactMessage(id: string): Promise<void> {
  await deleteDoc(doc(db, 'contactMessages', id));
}

// ---------------- Party Members & Messaging ----------------
const LOCAL_MEMBERS_KEY = 'brp_members_cache';

export function getMembersSync(): PartyMember[] {
  try {
    const cached = localStorage.getItem(LOCAL_MEMBERS_KEY);
    if (cached !== null) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch {
    // ignore
  }
  return INITIAL_MEMBERS;
}

export async function getMembers(): Promise<PartyMember[]> {
  try {
    const snap = await getDocs(collection(db, 'members'));
    const items = snap.docs.map(d => ({ id: d.id, ...d.data() } as PartyMember));
    // Sort by newest first
    items.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
    try {
      localStorage.setItem(LOCAL_MEMBERS_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
    return items;
  } catch (err) {
    console.warn('Error fetching members from Firestore, using local cache:', err);
  }

  // Fallback to local cache
  return getMembersSync();
}

export async function registerMember(data: {
  name: string;
  division: string;
  district?: string;
  upazila?: string;
  phone: string;
  email?: string;
  occupation?: string;
  notes?: string;
}): Promise<PartyMember> {
  const randomCode = Math.floor(1000 + Math.random() * 9000);
  const memberId = `BRP-2026-${randomCode}`;
  const id = `member-${Date.now()}`;

  const newMember: PartyMember = {
    id,
    memberId,
    name: data.name.trim(),
    division: data.division.trim(),
    district: data.district ? data.district.trim() : '',
    upazila: data.upazila ? data.upazila.trim() : '',
    phone: data.phone.trim(),
    email: data.email ? data.email.trim() : '',
    occupation: data.occupation ? data.occupation.trim() : '',
    notes: data.notes ? data.notes.trim() : '',
    status: 'active',
    createdAt: new Date().toISOString(),
    messagesSent: []
  };

  // 1. Immediately update localStorage for instant reactivity
  try {
    const current = getMembersSync();
    const updated = [newMember, ...current.filter(m => m.id !== id)];
    localStorage.setItem(LOCAL_MEMBERS_KEY, JSON.stringify(updated));
  } catch {
    // ignore
  }

  // 2. Persist to Firestore
  try {
    await setDoc(doc(db, 'members', id), newMember);
  } catch (err) {
    console.warn('Could not save member to Firestore, cached locally:', err);
  }

  return newMember;
}

export async function updateMemberStatus(id: string, status: PartyMember['status']): Promise<void> {
  // Update local storage
  try {
    const current = getMembersSync();
    const updated = current.map(m => m.id === id ? { ...m, status } : m);
    localStorage.setItem(LOCAL_MEMBERS_KEY, JSON.stringify(updated));
  } catch {
    // ignore
  }

  // Update Firestore
  try {
    await updateDoc(doc(db, 'members', id), { status });
  } catch (err) {
    console.warn('Error updating member status in Firestore:', err);
  }
}

export async function deleteMember(id: string): Promise<void> {
  // 1. Update local storage first
  try {
    const current = getMembersSync();
    const updated = current.filter(m => m.id !== id);
    localStorage.setItem(LOCAL_MEMBERS_KEY, JSON.stringify(updated));
  } catch {
    // ignore
  }

  // 2. Update Firestore
  try {
    await deleteDoc(doc(db, 'members', id));
  } catch (err) {
    console.warn('Error deleting member in Firestore:', err);
  }
}

export async function deleteAllMembers(): Promise<void> {
  // 1. Clear local storage
  try {
    localStorage.setItem(LOCAL_MEMBERS_KEY, JSON.stringify([]));
  } catch {
    // ignore
  }

  // 2. Clear Firestore collection
  try {
    const snap = await getDocs(collection(db, 'members'));
    const deletePromises = snap.docs.map(d => deleteDoc(doc(db, 'members', d.id)));
    await Promise.all(deletePromises);
  } catch (err) {
    console.warn('Error clearing members collection in Firestore:', err);
  }
}

export async function addMemberMessageLog(
  memberId: string, 
  msg: { sender: string; channel: 'whatsapp' | 'sms' | 'email' | 'system'; message: string }
): Promise<void> {
  const logItem: MemberMessageLog = {
    id: `msg-${Date.now()}`,
    sender: msg.sender,
    channel: msg.channel,
    message: msg.message,
    sentAt: new Date().toISOString()
  };

  // Update local storage
  try {
    const current = getMembersSync();
    const updated = current.map(m => {
      if (m.id === memberId) {
        const messagesSent = m.messagesSent ? [...m.messagesSent, logItem] : [logItem];
        return { ...m, messagesSent };
      }
      return m;
    });
    localStorage.setItem(LOCAL_MEMBERS_KEY, JSON.stringify(updated));
  } catch {
    // ignore
  }

  // Update Firestore
  try {
    const memberDocRef = doc(db, 'members', memberId);
    const snap = await getDoc(memberDocRef);
    if (snap.exists()) {
      const data = snap.data() as PartyMember;
      const messagesSent = data.messagesSent ? [...data.messagesSent, logItem] : [logItem];
      await updateDoc(memberDocRef, { messagesSent });
    }
  } catch (err) {
    console.warn('Error adding message log in Firestore:', err);
  }
}
