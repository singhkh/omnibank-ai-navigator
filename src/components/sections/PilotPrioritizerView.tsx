
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import type { View } from '../layout/navigation';
import type { AnalyzePilotProjectOutput } from '@/ai/flows/ai-driven-roi-analysis';
import { Info, ArrowRight } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Risk, RiskSeverity } from '@/app/page';
import { riskTemplate } from '@/app/page';


interface PilotPrioritizerViewProps {
  tool: string | null;
  setRoiAnalysis: (analysis: AnalyzePilotProjectOutput | null) => void;
  setActiveView: (view: View) => void;
  setIsPrioritizerCompleted: (isCompleted: boolean) => void;
  isPrioritizerCompleted: boolean;
  setRiskProfile: (profile: Risk[]) => void;
}

const sliderToSeverity = (value: number): RiskSeverity => {
  if (value <= 3) return "Low";
  if (value <= 7) return "Medium";
  return "High";
};

const getDynamicSummary = (id: string, value: number, baseSummary: string): string => {
    const severity = sliderToSeverity(value);
    
    // Custom summaries based on severity
    if (id === 'adoption_risk') {
      if (severity === "High") return `CRITICAL RISK: Our model shows employee resistance is very high, jeopardizing the entire project.`;
      if (severity === "Medium") return `MODERATE RISK: Employee adoption will be a significant challenge requiring a dedicated change management plan.`;
    }
    if (id === 'reputation_risk' || id === 'model_bias' || id === 'security_risk') {
         if (severity === "High") return `CRITICAL RISK: ${baseSummary}`;
    }

    const prefix = {
        Low: "LOW RISK: ",
        Medium: "MODERATE RISK: ",
        High: "HIGH RISK: "
    }[severity];
    
    return prefix + baseSummary;
}


const PilotPrioritizerView: React.FC<PilotPrioritizerViewProps> = ({
  tool,
  setRoiAnalysis,
  setActiveView,
  setIsPrioritizerCompleted,
  isPrioritizerCompleted,
  setRiskProfile
}) => {
  // State for Customer-Facing Bot
  const [customerNewRevenue, setCustomerNewRevenue] = useState([10]);
  const [customerRetentionBoost, setCustomerRetentionBoost] = useState([5]);
  const [customerBrandEnhancement, setCustomerBrandEnhancement] = useState([5]);
  const [customerModelRisk, setCustomerModelRisk] = useState([8]);
  const [customerSecurityRisk, setCustomerSecurityRisk] = useState([9]);
  const [customerReputationRisk, setCustomerReputationRisk] = useState([7]);


  // State for Internal Advisor-Assist
  const [internalNewRevenue, setInternalNewRevenue] = useState([5]);
  const [internalRetentionBoost, setInternalRetentionBoost] = useState([10]);
  const [internalBrandEnhancement, setInternalBrandEnhancement] = useState([3]);
  const [internalModelRisk, setInternalModelRisk] = useState([5]);
  const [internalAdoptionRisk, setInternalAdoptionRisk] = useState([7]);
  const [internalDataRisk, setInternalDataRisk] = useState([4]);

  
  const [
    recommendationText,
    setRecommendationText,
  ] = useState<string>('');

  // Derived scores
  const customerImpact = customerNewRevenue[0] + customerRetentionBoost[0] + customerBrandEnhancement[0];
  const internalImpact = internalNewRevenue[0] + internalRetentionBoost[0] + internalBrandEnhancement[0];

  const customerRisk = (customerModelRisk[0] + customerSecurityRisk[0] + customerReputationRisk[0]) / 3;
  const internalRisk = (internalModelRisk[0] + internalAdoptionRisk[0] + internalDataRisk[0]) / 3;

  const customerScore = customerRisk > 0 ? customerImpact / (customerRisk * customerRisk) : customerImpact;
  const internalScore = internalRisk > 0 ? internalImpact / (internalRisk * internalRisk) : internalImpact;

  useEffect(() => {
    // This effect runs when the component mounts.
    // We want to reset the completion state unless the user is navigating back from a later step.
    if (activeView === 'Pilot Prioritizer') {
      setIsPrioritizerCompleted(false);
      setRecommendationText('');
    }
  }, [ ]);

  const handleCalculate = () => {
    // 1. Calculate composite scores from the detailed slider inputs.
    const customerFinancialImpact = (customerNewRevenue[0] * 0.4) + (customerRetentionBoost[0] * 0.4) + (customerBrandEnhancement[0] * 0.2);
    const customerImplementationRisk = (customerModelRisk[0] * 0.5) + (customerSecurityRisk[0] * 0.3) + (customerReputationRisk[0] * 0.2);

    const internalFinancialImpact = (internalNewRevenue[0] * 0.5) + (internalRetentionBoost[0] * 0.3) + (internalBrandEnhancement[0] * 0.2);
    const internalImplementationRisk = (internalModelRisk[0] * 0.2) + (internalAdoptionRisk[0] * 0.6) + (internalDataRisk[0] * 0.2);

    // 2. Run the risk-adjusted recommendation formula.
    const finalCustomerScore = customerImplementationRisk > 0 ? customerFinancialImpact / (customerImplementationRisk * customerImplementationRisk) : customerFinancialImpact;
    const finalInternalScore = internalImplementationRisk > 0 ? internalFinancialImpact / (internalImplementationRisk * internalImplementationRisk) : internalFinancialImpact;

    // 3. Determine the winning path.
    const winner = finalInternalScore >= finalCustomerScore ? 'internal' : 'customer';

    // 4. Build the new dynamic risk profile
    let newRiskProfile: Risk[] = [];
    const templateToUse = riskTemplate[winner];

    if (winner === 'internal') {
        newRiskProfile = templateToUse.map(risk => {
            let severityValue: number;
            let summary: string;
            switch (risk.id) {
                case 'model_risk':
                    severityValue = internalModelRisk[0];
                    summary = getDynamicSummary(risk.id, severityValue, risk.summary);
                    break;
                case 'adoption_risk':
                    severityValue = internalAdoptionRisk[0];
                    summary = getDynamicSummary(risk.id, severityValue, risk.summary);
                    break;
                case 'data_security_risk':
                    severityValue = internalDataRisk[0];
                    summary = getDynamicSummary(risk.id, severityValue, risk.summary);
                    break;
                default:
                    severityValue = 5;
                    summary = risk.summary;
            }
            return { ...risk, severity: sliderToSeverity(severityValue), summary };
        });
    } else { // customer
        newRiskProfile = templateToUse.map(risk => {
            let severityValue: number;
            let summary: string;
            switch(risk.id) {
                case 'model_bias':
                    severityValue = customerModelRisk[0];
                    summary = getDynamicSummary(risk.id, severityValue, risk.summary);
                    break;
                case 'security_risk':
                    severityValue = customerSecurityRisk[0];
                    summary = getDynamicSummary(risk.id, severityValue, risk.summary);
                    break;
                case 'reputation_risk':
                    severityValue = customerReputationRisk[0];
                    summary = getDynamicSummary(risk.id, severityValue, risk.summary);
                    break;
                default:
                    severityValue = 5;
                    summary = risk.summary;
            }
            return { ...risk, severity: sliderToSeverity(severityValue), summary };
        });
    }

    setRecommendationText(`Recommended Pilot: ${winner === 'internal' ? 'Internal Advisor-Assist Tool' : 'Customer-Facing Chatbot'}`);
    setRiskProfile(newRiskProfile);
    setIsPrioritizerCompleted(true);
  };
  
  const handleNavigateToRisk = () => {
    setActiveView('Risk Dashboard');
  }

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
              <CardDescription>High-risk, high-reward public launch.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-1">
               <Accordion type="multiple" className="w-full" defaultValue={['item-1']}>
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-base font-semibold">
                      <div className="flex items-center gap-2">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">Estimate the **optimistic financial upside** of a public launch. Consider new revenue, customer retention, and brand lift. (Scale: 1=Marginal, 10=Transformational)</p>
                          </TooltipContent>
                        </Tooltip>
                        <span>Financial Impact Model</span>
                        <span className="text-xs font-mono py-0.5 px-1.5 rounded-full bg-primary/10 text-primary">{customerImpact.toFixed(0)}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4 space-y-6">
                        <div className="space-y-3">
                            <Label>New Revenue & Cross-Sell Lift</Label>
                             <div className="flex items-center gap-4">
                                <Slider
                                    min={0}
                                    max={20}
                                    step={1}
                                    value={customerNewRevenue}
                                    onValueChange={setCustomerNewRevenue}
                                    disabled={isPrioritizerCompleted}
                                />
                               <span className="font-bold text-primary w-12 text-center">
                                {customerNewRevenue[0]}%
                              </span>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <Label>Customer Retention Boost</Label>
                             <div className="flex items-center gap-4">
                                <Slider
                                    min={0}
                                    max={15}
                                    step={1}
                                    value={customerRetentionBoost}
                                    onValueChange={setCustomerRetentionBoost}
                                    disabled={isPrioritizerCompleted}
                                />
                               <span className="font-bold text-primary w-12 text-center">
                                {customerRetentionBoost[0]}%
                              </span>
                            </div>
                        </div>
                         <div className="space-y-3">
                            <Label>Brand Enhancement Value</Label>
                             <div className="flex items-center gap-4">
                                <Slider
                                    min={1}
                                    max={10}
                                    step={1}
                                    value={customerBrandEnhancement}
                                    onValueChange={setCustomerBrandEnhancement}
                                    disabled={isPrioritizerCompleted}
                                />
                               <span className="font-bold text-primary w-12 text-center">
                                {customerBrandEnhancement[0]}
                              </span>
                            </div>
                        </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-base font-semibold">
                      <div className="flex items-center gap-2">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="max-w-xs">Estimate the **severe external risks** of a public launch. Consider regulatory fines, public backlash from biased advice, and reputational damage. (Scale: 1=Low/Manageable, 10=High/Potentially Catastrophic)</p>
                            </TooltipContent>
                        </Tooltip>
                        <span>Implementation Risk Model</span>
                         <span className="text-xs font-mono py-0.5 px-1.5 rounded-full bg-destructive/10 text-destructive">{customerRisk.toFixed(1)}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4 space-y-6">
                      <div className="space-y-3">
                          <Label>Model Risk & Bias</Label>
                          <div className="flex items-center gap-4">
                              <Slider min={1} max={10} step={1} value={customerModelRisk} onValueChange={setCustomerModelRisk} disabled={isPrioritizerCompleted} />
                              <span className="font-bold text-destructive w-8 text-center">{customerModelRisk[0]}</span>
                          </div>
                      </div>
                      <div className="space-y-3">
                          <Label>Data Privacy & Security Risk</Label>
                          <div className="flex items-center gap-4">
                              <Slider min={1} max={10} step={1} value={customerSecurityRisk} onValueChange={setCustomerSecurityRisk} disabled={isPrioritizerCompleted} />
                              <span className="font-bold text-destructive w-8 text-center">{customerSecurityRisk[0]}</span>
                          </div>
                      </div>
                      <div className="space-y-3">
                          <Label>Reputational & Trust Risk</Label>
                          <div className="flex items-center gap-4">
                              <Slider min={1} max={10} step={1} value={customerReputationRisk} onValueChange={setCustomerReputationRisk} disabled={isPrioritizerCompleted} />
                              <span className="font-bold text-destructive w-8 text-center">{customerReputationRisk[0]}</span>
                          </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
            </CardContent>
          </Card>

          {/* Column B */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline">
                Option B: Internal Advisor-Assist
              </CardTitle>
              <CardDescription>Low-risk, high-impact internal launch.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-1">
               <Accordion type="multiple" className="w-full" defaultValue={['item-1']}>
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-base font-semibold">
                       <div className="flex items-center gap-2">
                          <Tooltip>
                              <TooltipTrigger asChild>
                                  <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                              </TooltipTrigger>
                              <TooltipContent>
                                  <p className="max-w-xs">Estimate the **pragmatic financial upside** of an internal launch. Focus on concrete efficiency gains, improved compliance, and long-term capability building. (Scale: 1=Marginal, 10=Significant)</p>
                              </TooltipContent>
                          </Tooltip>
                          <span>Financial Impact Model</span>
                          <span className="text-xs font-mono py-0.5 px-1.5 rounded-full bg-primary/10 text-primary">{internalImpact.toFixed(0)}</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4 space-y-6">
                        <div className="space-y-3">
                            <Label>Efficiency Gains & Cost Savings</Label>
                             <div className="flex items-center gap-4">
                                <Slider
                                    min={0}
                                    max={20}
                                    step={1}
                                    value={internalNewRevenue}
                                    onValueChange={setInternalNewRevenue}
                                    disabled={isPrioritizerCompleted}
                                />
                               <span className="font-bold text-primary w-12 text-center">
                                {internalNewRevenue[0]}%
                              </span>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <Label>Compliance Improvement</Label>
                             <div className="flex items-center gap-4">
                                <Slider
                                    min={0}
                                    max={15}
                                    step={1}
                                    value={internalRetentionBoost}
                                    onValueChange={setInternalRetentionBoost}
                                    disabled={isPrioritizerCompleted}
                                />
                               <span className="font-bold text-primary w-12 text-center">
                                {internalRetentionBoost[0]}%
                              </span>
                            </div>
                        </div>
                         <div className="space-y-3">
                            <Label>Capability Building</Label>
                             <div className="flex items-center gap-4">
                                <Slider
                                    min={1}
                                    max={10}
                                    step={1}
                                    value={internalBrandEnhancement}
                                    onValueChange={setInternalBrandEnhancement}
                                    disabled={isPrioritizerCompleted}
                                />
                               <span className="font-bold text-primary w-12 text-center">
                                {internalBrandEnhancement[0]}
                              </span>
                            </div>
                        </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-base font-semibold">
                      <div className="flex items-center gap-2">
                          <Tooltip>
                              <TooltipTrigger asChild>
                                  <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                              </TooltipTrigger>
                              <TooltipContent>
                                  <p className="max-w-xs">Estimate the **contained internal risks** of this pilot. The primary challenges are employee adoption and change management, which are manageable. (Scale: 1=Low/Manageable, 10=High/Significant Resistance)</p>
                              </TooltipContent>
                          </Tooltip>
                          <span>Implementation Risk Model</span>
                          <span className="text-xs font-mono py-0.5 px-1.5 rounded-full bg-destructive/10 text-destructive">{internalRisk.toFixed(1)}</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4 space-y-6">
                       <div className="space-y-3">
                          <Label>Model Risk</Label>
                          <div className="flex items-center gap-4">
                              <Slider min={1} max={10} step={1} value={internalModelRisk} onValueChange={setInternalModelRisk} disabled={isPrioritizerCompleted} />
                              <span className="font-bold text-destructive w-8 text-center">{internalModelRisk[0]}</span>
                          </div>
                      </div>
                      <div className="space-y-3">
                          <Label>Implementation & Adoption Risk</Label>
                          <div className="flex items-center gap-4">
                              <Slider min={1} max={10} step={1} value={internalAdoptionRisk} onValueChange={setInternalAdoptionRisk} disabled={isPrioritizerCompleted} />
                              <span className="font-bold text-destructive w-8 text-center">{internalAdoptionRisk[0]}</span>
                          </div>
                      </div>
                      <div className="space-y-3">
                          <Label>Data Governance & Security Risk</Label>
                          <div className="flex items-center gap-4">
                              <Slider min={1} max={10} step={1} value={internalDataRisk} onValueChange={setInternalDataRisk} disabled={isPrioritizerCompleted} />
                              <span className="font-bold text-destructive w-8 text-center">{internalDataRisk[0]}</span>
                          </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 flex justify-center">
          <Button size="lg" onClick={handleCalculate} disabled={isPrioritizerCompleted}>
            Calculate Recommendation
          </Button>
        </div>
        
        {isPrioritizerCompleted && (
          <Card className="max-w-4xl mx-auto shadow-lg mt-8 bg-secondary border-primary border-2 animate-fade-in">
            <CardHeader>
              <CardTitle className="text-center text-primary">Recommendation Calculated!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
              <p className="text-lg font-semibold text-primary">
                {recommendationText}
              </p>
                <Button size="lg" onClick={handleNavigateToRisk}>
                  View Full Risk Analysis & Verdict
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </TooltipProvider>
  );
};

export default PilotPrioritizerView;

    