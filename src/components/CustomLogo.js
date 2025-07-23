import React from 'react';
import {useLocation} from '@docusaurus/router';

export default function CustomLogo() {
  const location = useLocation();
  const isHomePage = location.pathname === '/' || location.pathname === '/docs';
  
  const logoUrl = isHomePage ? 'https://deeptempo.ai' : '/';
  
  return (
    <a href={logoUrl} style={{display: 'flex', alignItems: 'center'}}>
      <img 
        src="/img/logo.png" 
        alt="DeepTempo Logo" 
        style={{height: '32px'}}
      />
    </a>
  );
} 