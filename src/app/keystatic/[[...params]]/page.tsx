'use client';

import { makePage } from '@keystatic/next/ui/app';
import config from '../../../../keystatic.config';

// Force dark mode before Keystatic reads localStorage to initialize its theme state
if (typeof window !== 'undefined') {
  localStorage.setItem('keystatic-color-scheme', 'dark');
}

export default makePage(config);
