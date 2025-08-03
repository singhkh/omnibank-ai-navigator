'use client';

import React from 'react';
import { BrainCircuit, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


const HelpModal = () => (
    <Dialog>
    <DialogTrigger asChild>
      <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/20">
        <HelpCircle className="w-6 h-6" />
      </Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle className="text-2xl font-headline">User Guide: The AI Investment Navigator</DialogTitle>
        <DialogDescription>
          Making informed, data-driven decisions on AI pilot projects.
        </DialogDescription>
      </DialogHeader>
      <div className="py-4">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-semibold">Our Goal: Making a Data-Driven Decision</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              This tool is designed to move beyond gut feelings and hype. By systematically evaluating potential AI pilot projects based on their financial impact and implementation risk, we can make informed, data-driven decisions that align with OmniBank's strategic objectives.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="font-semibold">How to Use the Prioritizer Tool: A Step-by-Step Guide</AccordionTrigger>
            <AccordionContent className="text-muted-foreground space-y-2">
                <p><strong>Step 1: Adjust the Sliders:</strong> Use the sliders for both "Option A" and "Option B" to represent your assessment of their potential impact and risk.</p>
                <p><strong>Step 2: Click "Calculate":</strong> Once you have set the values, press the "Calculate Recommendation" button.</p>
                <p><strong>Step 3: Review the Output:</strong> The tool will display the recommended pilot project based on the scores calculated from your inputs.</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="font-semibold">Understanding the Recommendation</AccordionTrigger>
            <AccordionContent className="text-muted-foreground space-y-2">
               <p>The recommendation is based on a simple but powerful formula: <strong>Score = Impact / (Risk * Risk)</strong>.</p>
               <p>This formula heavily penalizes higher risk, ensuring that we prioritize projects that are not only promising in their potential returns but also more likely to be implemented successfully and safely. The project with the higher score is the one recommended for the pilot.</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </DialogContent>
  </Dialog>
)

const Header = () => {
  return (
    <header className="bg-primary text-primary-foreground p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <BrainCircuit className="w-8 h-8" />
          <h1 className="text-2xl font-bold font-headline">OmniBank AI Navigator</h1>
        </div>
        <HelpModal />
      </div>
    </header>
  );
};

export default Header;
