'use client';

import React from 'react';
import type { View } from '../layout/navigation';
import type { AnalyzePilotProjectOutput } from '@/ai/flows/ai-driven-roi-analysis';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BrainCircuit, Users, Shield, Cog, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';

interface RiskDashboardViewProps {
  tool: string | null;
  roiAnalysis: AnalyzePilotProjectOutput | null;
  setRiskAssessment: (assessment: string) => void;
  setActiveView: (view: View) => void;
}

const riskData = [
  {
    icon: BrainCircuit,
    title: 'Model Risk',
    summary: 'The risk of inaccurate or biased AI predictions leading to flawed, costly business decisions.',
    mitigation: [
      'Implement a rigorous, independent model validation process.',
      'Continuously monitor for model drift and schedule regular retraining.',
      'Conduct fairness audits to detect and correct algorithmic bias.',
    ],
    riskLevel: 'high',
  },
  {
    icon: Users,
    title: 'Implementation & Adoption Risk',
    summary: 'The risk that the tool integrates poorly with our systems and that employees resist or fail to adopt it.',
    mitigation: [
      'Initiate a phased rollout, starting with a "champion" pilot group.',
      'Develop comprehensive, hands-on training and support programs.',
      'Ensure dedicated resources for integrating with legacy infrastructure.',
    ],
    riskLevel: 'medium',
  },
  {
    icon: Shield,
    title: 'Data Governance & Security Risk',
    summary: 'The risk of data breaches, misuse of sensitive data, or non-compliance with privacy regulations (GDPR, CCPA).',
    mitigation: [
      'Enforce strict role-based access controls to sensitive data.',
      'Ensure the platform is fully compliant with all relevant data privacy laws.',
      'Conduct regular, independent security audits and penetration testing.',
    ],
    riskLevel: 'high',
  },
    {
    icon: Cog,
    title: 'Operational Risk',
    summary: 'The risk of day-to-day failures, including system outages or over-reliance on vendor support.',
    mitigation: [
      'Establish clear Service Level Agreements (SLAs) with the vendor.',
      'Develop documented procedures for handling system errors and downtime.',
      'Ensure redundant systems are in place for critical functions.',
    ],
    riskLevel: 'medium',
  },
  {
    icon: DollarSign,
    title: 'Financial Risk',
    summary: "The risk that the project's costs exceed budget and the promised ROI is not realized.",
    mitigation: [
      'Implement continuous ROI tracking against the initial business case.',
      'Build contingency into the budget for unforeseen costs.',
      'Establish clear "Go/No-Go" decision gates for future funding based on performance.',
    ],
    riskLevel: 'medium',
  },
];

interface RiskCardProps {
    icon: React.ElementType;
    title: string;
    summary: string;
    mitigation: string[];
    riskLevel: 'high' | 'medium';
}

const RiskCard: React.FC<RiskCardProps> = ({ icon: Icon, title, summary, mitigation, riskLevel }) => {
    return (
        <Card className={cn(
            "flex flex-col shadow-lg transition-transform duration-300 ease-in-out hover:scale-105",
            "border-l-4",
            riskLevel === 'high' ? 'border-destructive' : 'border-yellow-500'
        )}>
            <CardHeader>
                <div className="flex items-center gap-4">
                    <Icon className="w-8 h-8 text-primary" />
                    <CardTitle className="text-xl font-headline">{title}</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="flex flex-col flex-grow space-y-4">
                <p className="text-muted-foreground">{summary}</p>
                <div>
                    <h4 className="font-semibold mb-2">Mitigation Strategies:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        {mitigation.map((item, index) => <li key={index}>{item}</li>)}
                    </ul>
                </div>
            </CardContent>
        </Card>
    )
}

const RiskDashboardView: React.FC<RiskDashboardViewProps> = ({ setActiveView }) => {
  return (
    <div className="space-y-8 animate-fade-in">
        <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-primary">Ethical & Implementation Risk Dashboard</h2>
            <p className="mt-2 text-lg text-muted-foreground">A qualitative analysis of key risk factors for our AI pilot programs.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {riskData.map(risk => <RiskCard key={risk.title} {...risk} />)}
        </div>
         <div className="flex justify-center pt-4">
          <Button size="lg" onClick={() => setActiveView('The Verdict')}>
            Proceed to The Verdict
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
    </div>
  );
};

export default RiskDashboardView;
