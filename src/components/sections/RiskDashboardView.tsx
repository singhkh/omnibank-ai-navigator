'use client';

import React from 'react';
import type { View } from '../layout/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BrainCircuit, Users, Shield, Cog, DollarSign, ArrowRight, Megaphone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

interface Risk {
  icon: string;
  title: string;
  summary: string;
  mitigation: string[];
  riskLevel: 'High' | 'Medium' | 'Low';
  severity: 'High' | 'Medium' | 'Low';
}

interface RiskDashboardViewProps {
  setActiveView: (view: View) => void;
  riskProfile: Risk[];
}


const iconMap: { [key: string]: React.ElementType } = {
  brain: BrainCircuit,
  people: Users,
  shield: Shield,
  cogs: Cog,
  dollar: DollarSign,
  megaphone: Megaphone
};

interface RiskCardProps {
    icon: string;
    title: string;
    summary: string;
    mitigation: string[];
    severity: 'High' | 'Medium' | 'Low';
}

const RiskCard: React.FC<RiskCardProps> = ({ icon, title, summary, mitigation, severity }) => {
    const Icon = iconMap[icon] || Cog;
    return (
        <Card className={cn(
            "flex flex-col shadow-lg transition-transform duration-300 ease-in-out hover:scale-105",
            "border-l-4",
            severity === 'High' ? 'border-destructive' : 'border-yellow-500'
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

const RiskDashboardView: React.FC<RiskDashboardViewProps> = ({ setActiveView, riskProfile }) => {
  return (
    <div className="space-y-8 animate-fade-in">
        <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-primary">Ethical & Implementation Risk Dashboard</h2>
            <p className="mt-2 text-lg text-muted-foreground">A qualitative analysis of key risk factors for the recommended pilot program.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {riskProfile.map(risk => <RiskCard key={risk.title} {...risk} />)}
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
