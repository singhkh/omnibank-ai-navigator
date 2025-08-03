import React from 'react';
import { BrainCircuit, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="bg-primary text-primary-foreground p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <BrainCircuit className="w-8 h-8" />
          <h1 className="text-2xl font-bold font-headline">OmniBank AI Navigator</h1>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/20">
          <HelpCircle className="w-6 h-6" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
