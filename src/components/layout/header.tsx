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
            <AccordionContent className="text-muted-foreground space-y-2">
              <p>This tool is designed to move beyond intuition and provide a clear, evidence-based framework for OmniBank's first major investment in Generative AI. It allows us to simulate the trade-offs between two potential pilot programs by weighing their financial potential against their significant implementation risks.</p>
              <p><strong>AI Landscape & Risk Dashboards:</strong> These static screens provide the strategic context based on our internal analysis of the market and the ethical/regulatory environment.</p>
              <p><strong>Pilot Prioritizer:</strong> This is the interactive core where you can explore scenarios and see their impact on our strategic recommendation.</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="font-semibold">How to Use the Prioritizer Tool: A Step-by-Step Guide</AccordionTrigger>
            <AccordionContent className="text-muted-foreground space-y-2">
                <p><strong>Step 1: Evaluate "Option A: Customer-Facing Bot"</strong><br/>This option represents a high-risk, high-reward public launch. Adjust the sliders based on your assessment of financial impact and implementation risk.</p>
                <p><strong>Step 2: Evaluate "Option B: Internal Advisor-Assist"</strong><br/>This option represents a lower-risk, capability-building internal launch. Adjust the sliders based on projected efficiency gains and the more contained risks of an internal project.</p>
                <p><strong>Step 3: Calculate the Recommendation</strong><br/>Click the "Calculate Recommendation" button. The "Recommended Path" at the bottom will update instantly based on your inputs.</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="font-semibold">Understanding the Recommendation</AccordionTrigger>
            <AccordionContent className="text-muted-foreground space-y-2">
               <p>The recommendation is based on a risk-adjusted scoring model: <strong>Priority Score = Financial Impact / (Risk Score)²</strong>.</p>
               <p>In the current "Peak of Hype" for AI, our greatest threat is moving too quickly. This model intentionally penalizes risk, guiding us to learn safely before we try to earn aggressively.</p>
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
