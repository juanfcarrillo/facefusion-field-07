
import React from 'react';
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
  const { toast } = useToast();

  const handleLoginClick = () => {
    toast({
      title: "Coming soon!",
      description: "Login functionality will be available in the next version."
    });
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border py-3">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md gradient-bg flex items-center justify-center">
            <span className="font-bold text-white text-xl">SE</span>
          </div>
          <h1 className="font-bold text-xl">Syntax Error</h1>
        </div>
        
        <div className="flex gap-4 items-center">
          <button 
            onClick={handleLoginClick}
            className="px-4 py-2 text-sm font-medium text-white bg-muted rounded-md hover:bg-muted/80 transition-colors"
          >
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
