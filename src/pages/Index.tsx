
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import UploadSection from '@/components/UploadSection';
import GallerySection from '@/components/GallerySection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <UploadSection />
        <GallerySection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
