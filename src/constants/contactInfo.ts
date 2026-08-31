import { SchoolContactInfo } from '../types';

export const SCHOOL_CONTACT: SchoolContactInfo = {
  schoolName: 'Emaudo Secondary School',
  addressLines: [
    '178 Osimen Street,',
    'Emaudo, Ekpoma,',
    'Edo State, Nigeria'
  ],
  fullAddress: '178 Osimen Street, Emaudo, Ekpoma, Edo State, Nigeria',
  whatsappDisplay: '+234 813 911 1765',
  whatsappRaw: '2348139111765',
  whatsappMessage: 'Hello Emaudo Secondary School, I would like to make an enquiry.',
  whatsappUrl: 'https://wa.me/2348139111765?text=' + encodeURIComponent('Hello Emaudo Secondary School, I would like to make an enquiry.'),
  phoneDisplay: '+234 813 911 1765',
  phoneTel: 'tel:+2348139111765',
  email: '[EMAIL ADDRESS]',
};

export const getCustomWhatsAppUrl = (customMessage?: string) => {
  const message = customMessage?.trim() || SCHOOL_CONTACT.whatsappMessage;
  return `https://wa.me/${SCHOOL_CONTACT.whatsappRaw}?text=${encodeURIComponent(message)}`;
};
