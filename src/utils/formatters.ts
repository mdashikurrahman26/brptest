export function toBengaliNumber(num: number | string): string {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num).replace(/[0-9]/g, (w) => bnDigits[+w]);
}

export function formatBengaliDate(isoDate: string): string {
  if (!isoDate) return '';
  // If already in Bengali, return directly
  if (/[০-৯]/.test(isoDate)) return isoDate;

  try {
    const d = new Date(isoDate);
    if (isNaN(d.getTime())) return isoDate;
    
    const months = [
      'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
      'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
    ];
    
    const day = toBengaliNumber(d.getDate());
    const month = months[d.getMonth()];
    const year = toBengaliNumber(d.getFullYear());
    
    return `${day} ${month}, ${year}`;
  } catch {
    return isoDate;
  }
}

export function truncateText(text: string, maxLength: number): string {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s\u0980-\u09FF-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}
