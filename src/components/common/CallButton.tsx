import React from 'react';
import { PhoneCall } from 'lucide-react';
import { SCHOOL_CONTACT } from '../../constants/contactInfo';

interface CallButtonProps {
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
  variant?: 'primary' | 'outline' | 'navy';
  className?: string;
  id?: string;
  fullWidth?: boolean;
  label?: string;
}

export const CallButton: React.FC<CallButtonProps> = ({
  size = 'md',
  showNumber = false,
  variant = 'navy',
  className = '',
  id = 'call-school-btn',
  fullWidth = false,
  label = 'Call the School',
}) => {
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

  const variantClasses = {
    primary: 'bg-blue-700 hover:bg-blue-600 active:bg-blue-800 text-white shadow-sm',
    navy: 'bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white shadow-sm',
    outline: 'border-2 border-slate-900 hover:bg-slate-900 hover:text-white text-slate-900 bg-transparent',
  };

  return (
    <a
      id={id}
      href={SCHOOL_CONTACT.phoneTel}
      className={`inline-flex items-center justify-center rounded-xl transition-all duration-200 cursor-pointer select-none ${sizeClasses[size]} ${variantClasses[variant]} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      title={`Call Emaudo Secondary School directly at ${SCHOOL_CONTACT.phoneDisplay}`}
    >
      <PhoneCall className={iconSizes[size]} />
      <span className="whitespace-nowrap">
        {label}
        {showNumber && <span className="ml-1 opacity-90 font-normal">({SCHOOL_CONTACT.phoneDisplay})</span>}
      </span>
    </a>
  );
};
