import { Helmet } from '@dr.pogodin/react-helmet';
import { type ReactElement } from 'react';
import { ScrollRestoration, useLocation } from 'react-router-dom'; 

import Footer from '@/layouts/parts/Footer';
import Header from '@/layouts/parts/Header';
import Website from '@/layouts/Website';

interface RootLayoutProps {
  children: ReactElement;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const location = useLocation(); 

  return (
    <Website>
      <Helmet>
        <title>Christ's Love Christian School</title>
        <meta name="description" content="Christ's Love Christian School — a private faith-based school nurturing students from Kindergarten through Grade 7 in academic excellence and Christian values." />
      </Helmet>
      <ScrollRestoration />
      <Header />
      
      {/* This unique key wrapper forces React to cleanly redraw your content whenever you switch tabs */}
      <div key={location.pathname} className="w-full">
        {children}
      </div>
      
      <Footer />
    </Website>
  );
}
