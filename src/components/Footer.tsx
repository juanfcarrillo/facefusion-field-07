
import React from 'react';

const Footer = () => {
  return (
    <footer className="py-8 px-4 border-t border-border">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md gradient-bg flex items-center justify-center">
              <span className="font-bold text-white text-xl">SE</span>
            </div>
            <h2 className="font-bold text-xl">Syntax Error</h2>
          </div>
          
          <div className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Syntax Error Team. All rights reserved. Created for Hackathon.
          </div>
          
          <div className="flex gap-4">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Terms</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
