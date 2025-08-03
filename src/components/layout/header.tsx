import React from 'react';
import { BrainCircuit } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-primary text-primary-foreground p-4 shadow-md">
      <div className="container mx-auto flex items-center gap-4">
        <BrainCircuit className="w-8 h-8" />
        <h1 className="text-2xl font-bold font-headline">OmniBank AI Navigator</h1>
      </div>
    </header>
  );
};

export default Header;
