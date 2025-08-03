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
            <AccordionTrigger className="font-semibold text-left">Our Goal: From Assumption to Insight</AccordionTrigger>
            <AccordionContent className="text-muted-foreground space-y-2">
              <p>The AI Investment Navigator is a dynamic modeling tool. It is designed to transform your strategic assumptions into a clear, data-driven recommendation. The workflow guides you from high-level strategy to a specific, actionable plan.</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="font-semibold text-left">How to Use the Prioritizer Tool: A Step-by-Step Guide</AccordionTrigger>
            <AccordionContent className="text-muted-foreground space-y-2">
                <p>This interactive screen is the engine of the Navigator.</p>
                <ul className="list-decimal pl-5 space-y-2">
                  <li><b>Expand the Modeling Sections</b><br/>For each option ("Customer-Facing" and "Internal-Assist"), click to expand the "Financial Impact Model" and "Implementation Risk Model" sections.</li>
                  <li><b>Adjust the Granular Levers</b><br/>Use the detailed sliders within each section to reflect your strategic assumptions. Adjust specific factors like "New Revenue & Cross-Sell Lift" or "Regulatory & Compliance Fines." As you move the sliders, you will see the "Overall Score" for that section update in real-time.</li>
                  <li><b>Generate the Full Analysis</b><br/>Once you are satisfied with your model, click the "Calculate Recommendation" button. This action will generate the final verdict and populate the "Risk Dashboard" with a dynamic analysis tailored specifically to your inputs. The final sections of the tool will then unlock.</li>
                </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="font-semibold text-left">Understanding Your Dynamic Results</AccordionTrigger>
            <AccordionContent className="text-muted-foreground space-y-2">
               <p>This tool does more than just show static data; it creates a custom report based on your modeling.</p>
               <p><b>The Risk Dashboard:</b> After you calculate a recommendation, this screen will display a set of risk cards. The severity (color) and summary text of these cards are dynamically generated. If you model a high regulatory risk, the corresponding risk card will turn red and its text will reflect that critical danger.</p>
               <p><b>The Verdict & Roadmap:</b> These final screens summarize the justification for the single recommended path that resulted from your specific inputs and provide a concrete implementation plan to move forward.</p>
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
