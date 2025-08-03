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
      <Button variant="ghost" size="icon" className="text-primary-foreground/80 hover:bg-white/20 hover:text-primary-foreground rounded-full">
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
            <AccordionTrigger className="font-semibold text-left">Our Goal: A Guided Path to a Strategic Decision</AccordionTrigger>
            <AccordionContent className="text-muted-foreground space-y-2">
              <p>The AI Investment Navigator is designed to walk you through a logical decision-making process. The initial steps are locked to ensure we build our conclusion on a solid foundation of strategy and data.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><b>Step 1: AI Landscape:</b> Understand the market context.</li>
                <li><b>Step 2: Pilot Prioritizer:</b> Interact with the core tool to weigh your options and generate a recommendation.</li>
                <li><b>Step 3: Risk & Verdict:</b> Once a recommendation is calculated, the final sections unlock, allowing you to review the specific risks and the implementation plan for your chosen path.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="font-semibold text-left">How to Use the Prioritizer Tool: The Key Step</AccordionTrigger>
            <AccordionContent className="text-muted-foreground space-y-2">
                <p>This interactive screen is where you will make the central trade-off analysis. Your inputs here will determine the final recommendation and unlock the rest of the dashboard.</p>
                <p><b>Step 1: Model the Scenarios</b><br/>Using the sliders, set your assumptions for both the "Customer-Facing Bot" and the "Internal Advisor-Assist" options.</p>
                <p><b>Step 2: Generate the Recommendation</b><br/>Click the "Calculate Recommendation" button. The tool will run a risk-adjusted analysis and display the recommended pilot program.</p>
                <p><b>Step 3: Unlock the Final Analysis</b><br/>Once the recommendation is calculated, the navigation buttons for "Risk Dashboard" and "The Verdict" will become active, and a new card will appear to guide you to the next step.</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="font-semibold text-left">Understanding the Dynamic Dashboards</AccordionTrigger>
            <AccordionContent className="text-muted-foreground space-y-2">
               <p>The final sections of this tool are dynamically generated based on your decision in the Prioritizer.</p>
               <p><b>The Risk Dashboard:</b> This screen does not show a generic list of all possible risks. It displays a tailored risk assessment specific to the recommended pilot program.</p>
               <p><b>The Verdict & Roadmap:</b> These final screens provide a summary justification and a concrete implementation plan for the single, recommended path, ensuring our strategy is focused and actionable.</p>
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
