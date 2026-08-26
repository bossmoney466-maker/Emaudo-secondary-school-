import React from 'react';
import { MessageCircle } from 'lucide-react';
import { SCHOOL_CONTACT } from '../../constants/contactInfo';

interface WhatsAppButtonProps {
  customMessage?: string;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
  className?: string;
  id?: string;
  fullWidth?: boolean;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  customMessage,
  size = 'md',
  showNumber = false,
  className = '',
  id = 'whatsapp-btn',
  fullWidth = false,
}) => {
  const url = customMessage
    ? `https://wa.me/${SCHOOL_CONTACT.whatsappRaw}?text=${encodeURIComponent(customMessage)}`
    : SCHOOL_CONTACT.whatsappUrl;

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs font-semibold gap-1.5',
    md: 'px-4 py-2 text-sm font-semibold gap-2',
    lg: 'px-6 py-3.5 text-base font-bold gap-2.5',
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <a
      id={id}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white shadow-sm hover:shadow transition-all duration-200 cursor-pointer select-none ${sizeClasses[size]} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      title={`Chat with Emaudo Secondary School on WhatsApp at ${SCHOOL_CONTACT.whatsappDisplay}`}
    >
      <MessageCircle className={`${iconSizes[size]} fill-current stroke-emerald-600 text-white`} />
      <span className="whitespace-nowrap">
        Chat on WhatsApp
        {showNumber && <span className="ml-1 opacity-90 font-normal">({SCHOOL_CONTACT.whatsappDisplay})</span>}
      </span>
    </a>
  );
};
