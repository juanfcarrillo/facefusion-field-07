
import React from 'react';
import Navbar from '@/components/Navbar';
import UploadSection from '@/components/UploadSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <UploadSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
