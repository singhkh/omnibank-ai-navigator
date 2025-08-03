'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, FlaskConical, Users, Castle, ArrowRight } from 'lucide-react';
import RoadmapModal from '../common/RoadmapModal';
import { Button } from '../ui/button';

const JustificationCard = ({ icon: Icon, title, text }: { icon: React.ElementType, title: string, text: string }) => (
  <Card className="text-center shadow-lg transition-transform duration-300 ease-in-out hover:scale-105">
    <CardHeader>
      <div className="mx-auto bg-secondary p-4 rounded-full w-fit">
        <Icon className="w-8 h-8 text-primary" />
      </div>
    </CardHeader>
    <CardContent>
      <CardTitle className="text-lg font-headline mb-2">{title}</CardTitle>
      <p className="text-muted-foreground text-sm">{text}</p>
    </CardContent>
  </Card>
);


const TheVerdictView: React.FC = () => {
  const [showRoadmapModal, setShowRoadmapModal] = useState(false);

  const justifications = [
    {
      icon: FlaskConical,
      title: 'De-Risk the Technology',
      text: 'Provides a "safe sandbox" to master AI performance, bias, and hallucinations before any public exposure.',
    },
    {
      icon: Users,
      title: 'Solve the Human Factor',
      text: 'Allows us to focus on employee training and adoption, turning our advisors into our biggest AI advocates.',
    },
    {
      icon: Castle,
      title: 'Build a Defensible Asset',
      text: 'Enables us to build a proprietary, fine-tuned AI model based on our own data and expert feedback.',
    }
  ];

  const nextSteps = [
    "Secure Board approval for the $2.5M pilot budget.",
    "Form a cross-functional AI Governance task force.",
    "Initiate vendor contract negotiations and technical due diligence.",
  ];

  return (
    <>
      <div className="space-y-12 animate-fade-in">
          {/* Section 1: The Final Recommendation */}
          <div className="bg-primary text-primary-foreground rounded-lg shadow-2xl p-6 flex items-center justify-center gap-4">
              <Target className="w-10 h-10" />
              <h1 className="text-3xl font-bold tracking-wider uppercase">Recommendation: Strategic Pilot</h1>
          </div>

          {/* Section 2: The "Why" - Key Justifications */}
          <section>
              <h2 className="text-2xl font-bold text-center mb-8 text-primary">The "Why": Key Justifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {justifications.map(card => <JustificationCard key={card.title} {...card} />)}
              </div>
          </section>

          {/* Section 3: The Path Forward - Next Steps */}
          <section>
            <Card className="max-w-3xl mx-auto shadow-lg">
              <CardHeader>
                  <CardTitle className="text-2xl text-center font-headline">Proposed Next Steps</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                  <ul className="list-decimal list-inside space-y-2 text-muted-foreground">
                      {nextSteps.map((step, index) => <li key={index} className="text-base">{step}</li>)}
                  </ul>
                  <div className="text-center pt-6">
                    <Button size="lg" onClick={() => setShowRoadmapModal(true)}>
                        View Full Implementation Roadmap <ArrowRight className="ml-2" />
                    </Button>
                  </div>
              </CardContent>
            </Card>
          </section>
      </div>
      <RoadmapModal open={showRoadmapModal} onOpenChange={setShowRoadmapModal} />
    </>
  );
};

export default TheVerdictView;
