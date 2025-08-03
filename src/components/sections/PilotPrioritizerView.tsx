'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import type { View } from '../layout/navigation';
import type { AnalyzePilotProjectOutput } from '@/ai/flows/ai-driven-roi-analysis';
import { Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface PilotPrioritizerViewProps {
  tool: string | null;
  setRoiAnalysis: (analysis: AnalyzePilotProjectOutput | null) => void;
  setActiveView: (view: View) => void;
  setIsPrioritizerCompleted: (isCompleted: boolean) => void;
}

const PilotPrioritizerView: React.FC<PilotPrioritizerViewProps> = ({
  tool,
  setRoiAnalysis,
  setActiveView,
  setIsPrioritizerCompleted,
}) => {
  const [customerImpact, setCustomerImpact] = useState([5]);
  const [customerRisk, setCustomerRisk] = useState([5]);
  const [internalImpact, setInternalImpact] = useState([5]);
  const [internalRisk, setInternalRisk] = useState([5]);
  const [
    recommendationText,
    setRecommendationText,
  ] = useState<string>('Awaiting Calculation...');

  useEffect(() => {
    // Reset ROI analysis when view loads as it is no longer relevant
    // to the new comparison-based approach.
    setRoiAnalysis(null);
  }, [setRoiAnalysis]);

  const handleCalculate = () => {
    const scoreA = customerImpact[0] / (customerRisk[0] * customerRisk[0]);
    const scoreB = internalImpact[0] / (internalRisk[0] * internalRisk[0]);

    if (scoreB >= scoreA) {
      setRecommendationText(
        'Recommended Pilot: Internal Advisor-Assist Tool'
      );
    } else {
      setRecommendationText('Recommended Pilot: Customer-Facing Chatbot');
    }
    setIsPrioritizerCompleted(true);
  };

  return (
    <TooltipProvider>
      <div className="animate-fade-in space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary">
            Pilot Prioritizer
          </h2>
          <p className="mt-2 text-lg text-muted-foreground">
            Compare potential AI pilot projects to determine the best path
            forward.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Column A */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline">
                Option A: Customer-Facing Bot
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Label htmlFor="impactA" className="font-semibold">
                    Potential Financial Impact
                  </Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="w-4 h-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Estimate the overall financial upside on a scale of 1-10.
                        Consider factors like new customer acquisition, increased
                        cross-selling, and brand enhancement. High numbers
                        represent a highly optimistic market reception.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="flex items-center gap-4">
                  <Slider
                    id="impactA"
                    min={1}
                    max={10}
                    step={1}
                    value={customerImpact}
                    onValueChange={setCustomerImpact}
                  />
                  <span className="font-bold text-primary w-8 text-center">
                    {customerImpact[0]}
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Label htmlFor="riskA" className="font-semibold">
                    Implementation Risk Score
                  </Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="w-4 h-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Estimate the combined risk on a scale of 1-10. Consider
                        regulatory fines from the CFPB, reputational damage from
                        biased advice, and technical failure (hallucinations).
                        High numbers represent a severe risk profile.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="flex items-center gap-4">
                  <Slider
                    id="riskA"
                    min={1}
                    max={10}
                    step={1}
                    value={customerRisk}
                    onValueChange={setCustomerRisk}
                  />
                  <span className="font-bold text-destructive w-8 text-center">
                    {customerRisk[0]}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Column B */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline">
                Option B: Internal Advisor-Assist
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Label htmlFor="impactB" className="font-semibold">
                    Potential Financial Impact
                  </Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="w-4 h-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Estimate the financial upside on a scale of 1-10.
                        Consider factors like improved advisor efficiency,
                        better compliance audit results, and the strategic value
                        of building a proprietary AI model safely.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="flex items-center gap-4">
                  <Slider
                    id="impactB"
                    min={1}
                    max={10}
                    step={1}
                    value={internalImpact}
                    onValueChange={setInternalImpact}
                  />
                  <span className="font-bold text-primary w-8 text-center">
                    {internalImpact[0]}
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Label htmlFor="riskB" className="font-semibold">
                    Implementation Risk Score
                  </Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="w-4 h-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Estimate the combined risk on a scale of 1-10. The
                        primary risk here is internal: low employee adoption and
                        the challenges of retraining. Technical and regulatory
                        risks are significantly more contained than in a public
                        launch.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="flex items-center gap-4">
                  <Slider
                    id="riskB"
                    min={1}
                    max={10}
                    step={1}
                    value={internalRisk}
                    onValueChange={setInternalRisk}
                  />
                  <span className="font-bold text-destructive w-8 text-center">
                    {internalRisk[0]}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 flex justify-center">
          <Button size="lg" onClick={handleCalculate}>
            Calculate Recommendation
          </Button>
        </div>

        <Card className="max-w-4xl mx-auto shadow-lg mt-8">
          <CardHeader>
            <CardTitle>Recommended Path:</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-muted-foreground">
              {recommendationText}
            </p>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
};

export default PilotPrioritizerView;
