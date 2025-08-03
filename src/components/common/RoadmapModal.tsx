'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Rocket, Target, Scaling } from 'lucide-react';

const roadmapData = [
    {
      phase: "Phase 1: Foundation",
      timeline: "First 6 Months",
      icon: Rocket,
      actions: [
        "Formally establish a cross-functional AI Governance task force.",
        "Finalize vendor selection and complete contract negotiations.",
        "Onboard a pilot group of 50 \"AI Champion\" financial advisors.",
        "Deploy the core \"Advisor-Assist\" tool in a sandboxed environment.",
      ],
      kpis: [
        "Adoption Rate: >80% of pilot advisors logging in weekly.",
        "Usability Score: Achieve a score of >7/10 on internal user satisfaction surveys.",
        "Qualitative Feedback: Document key pain points and feature requests from the champion group.",
      ]
    },
    {
      phase: "Phase 2: Capability Building & Integration",
      timeline: "Months 7 - 18",
      icon: Target,
      actions: [
        "Integrate the AI tool with OmniBank's core CRM and client data systems.",
        "Begin fine-tuning the AI model based on advisor feedback and real-world query data.",
        "Develop and roll out a comprehensive change management and training program for the next wave of users.",
      ],
      kpis: [
        "Efficiency Gain: Reduce average time-to-answer for complex client queries by 15%.",
        "Compliance Metric: AI model successfully flags >50% of potential compliance issues before human review.",
        "Model Accuracy: Achieve <5% rate of \"harmful\" or \"significantly incorrect\" AI-generated responses, as rated by human supervisors.",
      ]
    },
    {
        phase: "Phase 3: ROI Validation & Scalability Planning",
        timeline: "Months 19 - 24",
        icon: Scaling,
        actions: [
          "Scale the pilot to a larger group of 500 advisors across different departments.",
          "Begin rigorously measuring the impact on core business outcomes.",
          "Develop the business case and technical plan for a full, bank-wide rollout based on pilot data.",
        ],
        kpis: [
          "Business Impact: Measure a >5% increase in cross-sell/up-sell conversion rates for pilot advisors vs. a control group.",
          "Cost Savings: Demonstrate a reduction in customer issue escalations to senior staff by 20%.",
          "ROI Validation: Confirm a clear path to a positive return on investment for a full rollout.",
        ]
    }
  ];

interface RoadmapModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const RoadmapModal: React.FC<RoadmapModalProps> = ({ open, onOpenChange }) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-headline text-center">Strategic Pilot: Implementation Roadmap</DialogTitle>
                </DialogHeader>
                <div className="flex-grow overflow-y-auto pr-6 -mr-6">
                    <div className="relative pl-8">
                        {/* Vertical line */}
                        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>

                        {roadmapData.map((phase, index) => {
                             const Icon = phase.icon;
                            return(
                                <div key={index} className="relative mb-12">
                                    <div className="absolute -left-2.5 top-1.5 w-5 h-5 bg-primary rounded-full z-10 border-4 border-background"></div>
                                    <div className="ml-12">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="bg-secondary p-3 rounded-full">
                                                <Icon className="w-6 h-6 text-primary"/>
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-primary">{phase.phase}</h3>
                                                <p className="text-sm font-semibold text-muted-foreground">{phase.timeline}</p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <h4 className="font-semibold mb-2">Key Actions:</h4>
                                                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                                    {phase.actions.map((item, idx) => <li key={idx}>{item}</li>)}
                                                </ul>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold mb-2">Key Performance Indicators (KPIs):</h4>
                                                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                                    {phase.kpis.map((item, idx) => <li key={idx}>{item}</li>)}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default RoadmapModal;
