import React from 'react';
import { MessageCircle } from 'lucide-react';
import { WHATSAPP_URL } from '../lib/constants';

export function WhatsAppFloat() {
  return (
    <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="wa-float" aria-label="WhatsApp us">
      <MessageCircle size={26} />
    </a>
  );
}
