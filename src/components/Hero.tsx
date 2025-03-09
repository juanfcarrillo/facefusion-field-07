
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const Hero = () => {
  const scrollToUpload = () => {
    const uploadSection = document.getElementById('upload-section');
    if (uploadSection) {
      uploadSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center text-center px-4 py-16">
      <div 
        className="absolute inset-0 -z-10 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle at center, hsl(260, 80%, 70%) 0%, transparent 70%)',
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
        Transform Your Face Into 
        <span className="block text-primary">AR Magic</span>
      </h1>
      
      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10">
        Upload your photo and our AI will create a stunning 3D model ready for augmented reality experiences.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-16">
        <Button 
          size="lg" 
          className="gradient-bg hover:opacity-90 px-8"
          onClick={scrollToUpload}
        >
          Get Started
        </Button>
        <Button 
          variant="outline" 
          size="lg"
          className="px-8 border-primary text-primary hover:text-primary hover:bg-primary/10"
        >
          How It Works
        </Button>
      </div>
      
      <button 
        onClick={scrollToUpload}
        className="animate-bounce rounded-full p-2 bg-muted/50 hover:bg-muted transition-colors"
      >
        <ArrowDown className="h-6 w-6 text-primary" />
      </button>
    </div>
  );
};

export default Hero;
