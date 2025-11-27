'use client';

import React, { Suspense } from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import Tovari from './tovari';

function CatalogFallback() {
  return (
    <div style={{ 
      padding: '4rem 2rem', 
      textAlign: 'center',
      background: '#0a0e15',
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        width: '60px',
        height: '60px',
        border: '3px solid rgba(255, 255, 255, 0.1)',
        borderTop: '3px solid #F65C85',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        marginBottom: '1.5rem'
      }}></div>
      <div style={{
        fontSize: '1.2rem',
        color: 'rgba(255, 255, 255, 0.7)',
        fontWeight: '600',
        fontFamily: 'Inter, sans-serif',
        textTransform: 'uppercase',
        letterSpacing: '0.1em'
      }}>Загрузка каталога мотоциклов...</div>
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<CatalogFallback />}>
          <Tovari />
        </Suspense>
      </main>
      <Footer />
    </>
  );
} 