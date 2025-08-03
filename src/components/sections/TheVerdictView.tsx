'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import RoadmapModal from '../common/RoadmapModal';
import { ArrowRight, CheckCircle2, DollarSign, FlaskConical, Rocket, Scale, Shield } from 'lucide-react';

interface TheVerdictViewProps {
  recommendationText: string;
  recommendedTier: string;
  recommendedTierJustification: string;
}

const budgetCards = [
    {
        tier: "Tier 1: Exploratory Lab",
        icon: FlaskConical,
        scope: "Small-scale experiment (10-20 users) to test core hypotheses on a non-critical dataset.",
        budget: "$150K - $300K",
        timeline: "3-6 Months"
    },
    {
        tier: "Tier 2: Strategic Pilot",
        icon: Rocket,
        scope: "Formal pilot (50-100 users) with a dedicated team, focused on building a scalable, secure, and compliant capability.",
        budget: "$1M - $2.5M",
        timeline: "12-18 Months"
    },
    {
        tier: "Tier 3: Accelerated Launch",
        icon: Scale,
        scope: "Aggressive, large-scale deployment (500+ users) with significant marketing and change management support.",
        budget: "$5M+",
        timeline: "18-24+ Months"
    }
]

const TheVerdictView: React.FC<TheVerdictViewProps> = ({ 
    recommendationText, 
    recommendedTier,
    recommendedTierJustification 
}) => {
  const [showRoadmapModal, setShowRoadmapModal] = useState(false);

  if (!recommendationText) {
    return (
      <Card className="max-w-4xl mx-auto shadow-lg animate-fade-in">
        <CardHeader>
          <CardTitle className="text-center">The Verdict</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            Please complete the Pilot Prioritizer to generate a final recommendation.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
    <div className="space-y-12 animate-fade-in">
      {/* Section 1: The Recommended Path & Tier */}
      <section>
        <Card className="bg-gradient-to-br from-primary to-blue-900 text-primary-foreground shadow-2xl overflow-hidden">
            <div className="p-8 md:p-12">
                <div className="flex items-center gap-4">
                    <CheckCircle2 className="w-12 h-12 text-accent" />
                    <div>
                        <CardTitle className="text-4xl font-bold">{recommendedTier}</CardTitle>
                        <CardDescription className="text-primary-foreground/80 text-lg">{recommendationText}</CardDescription>
                    </div>
                </div>
            </div>
        </Card>
      </section>

      {/* Section 2: The Strategic Justification */}
      <section>
        <Card className="max-w-4xl mx-auto shadow-lg">
            <CardHeader>
                <div className="flex items-center gap-4">
                     <Shield className="w-8 h-8 text-primary" />
                     <CardTitle className="text-2xl font-headline">Strategic Rationale</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-lg text-muted-foreground">{recommendedTierJustification}</p>
            </CardContent>
        </Card>
      </section>
      
      {/* Section 3: The Budgetary Impact */}
      <section>
        <h2 className="text-2xl font-bold text-center mb-8 text-primary">Associated Budget & Scope</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {budgetCards.map((card) => {
                const isRecommended = card.tier === recommendedTier;
                const Icon = card.icon;
                return (
                    <Card key={card.tier} className={cn(
                        "flex flex-col text-center shadow-lg transition-all duration-300 ease-in-out",
                        isRecommended ? "border-2 border-primary scale-105 bg-secondary" : "border"
                    )}>
                        <CardHeader>
                            <div className="mx-auto bg-secondary p-4 rounded-full w-fit border">
                                <Icon className="w-8 h-8 text-primary" />
                            </div>
                            <CardTitle className="text-xl font-headline">{card.tier}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow space-y-4">
                            <p className="text-muted-foreground text-sm">{card.scope}</p>
                             <div className="font-semibold text-primary">
                                <p className="text-3xl">{card.budget}</p>
                                <p className="text-sm text-muted-foreground">{card.timeline}</p>
                            </div>
                        </CardContent>
                        {isRecommended && (
                            <CardFooter>
                                 <Button className="w-full" onClick={() => setShowRoadmapModal(true)}>
                                    View Implementation Roadmap <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </CardFooter>
                        )}
                    </Card>
                )
            })}
        </div>
      </section>

    </div>
    <RoadmapModal open={showRoadmapModal} onOpenChange={setShowRoadmapModal} />
    </>
  );
};

export default TheVerdictView;
