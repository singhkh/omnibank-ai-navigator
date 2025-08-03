
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
  setActiveView: (view: View) => void;
  setIsPrioritizerCompleted: (isCompleted: boolean) => void;
  isPrioritizerCompleted: boolean;
  setRiskProfile: (profile: Risk[]) => void;
  setRecommendationText: (text: string) => void;
  setRecommendedTier: (tier: string) => void;
  setRecommendedTierJustification: (justification: string) => void;
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
  setActiveView,
  setIsPrioritizerCompleted,
  isPrioritizerCompleted,
  setRiskProfile,
  setRecommendationText,
  setRecommendedTier,
  setRecommendedTierJustification,
}) => {
  // State for Customer-Facing Bot
  const [customerNewRevenue, setCustomerNewRevenue] = useState([10]);
  const [customerRetentionBoost, setCustomerRetentionBoost] = useState([5]);
  const [customerBrandEnhancement, setCustomerBrandEnhancement] = useState([5]);
  const [customerModelRisk, setCustomerModelRisk] = useState([8]);
  const [customerSecurityRisk, setCustomerSecurityRisk] = useState([9]);
  const [customerReputationRisk, setCustomerReputationRisk] = useState([7]);


  // State for Internal Advisor-Assist
  const [internalEfficiencyGains, setInternalEfficiencyGains] = useState([5]);
  const [internalComplianceSavings, setInternalComplianceSavings] = useState([10]);
  const [internalCapabilityBuilding, setInternalCapabilityBuilding] = useState([3]);
  const [internalModelRisk, setInternalModelRisk] = useState([5]);
  const [internalAdoptionRisk, setInternalAdoptionRisk] = useState([7]);
  const [internalDataRisk, setInternalDataRisk] = useState([4]);

  const [recommendationResultText, setRecommendationResultText] = useState('');

  // Derived scores for real-time feedback
  const customerImpact = customerNewRevenue[0] + customerRetentionBoost[0] + customerBrandEnhancement[0];
  const internalImpact = internalEfficiencyGains[0] + internalComplianceSavings[0] + internalCapabilityBuilding[0];

  const customerRisk = (customerModelRisk[0] + customerSecurityRisk[0] + customerReputationRisk[0]) / 3;
  const internalRisk = (internalModelRisk[0] + internalAdoptionRisk[0] + internalDataRisk[0]) / 3;

  useEffect(() => {
    setIsPrioritizerCompleted(false);
    setRecommendationResultText('');
  }, []);

  const handleCalculate = () => {
    // 1. Calculate composite scores from the detailed slider inputs with weighting.
    const customerFinancialImpact = (customerNewRevenue[0] * 0.4) + (customerRetentionBoost[0] * 0.4) + (customerBrandEnhancement[0] * 0.2);
    const customerImplementationRisk = (customerModelRisk[0] * 0.5) + (customerSecurityRisk[0] * 0.3) + (customerReputationRisk[0] * 0.2);

    const internalFinancialImpact = (internalEfficiencyGains[0] * 0.5) + (internalComplianceSavings[0] * 0.3) + (internalCapabilityBuilding[0] * 0.2);
    const internalImplementationRisk = (internalAdoptionRisk[0] * 0.6) + (internalModelRisk[0] * 0.2) + (internalDataRisk[0] * 0.2);

    // 2. Run the risk-adjusted recommendation formula.
    const customerScore = customerImplementationRisk > 0 ? customerFinancialImpact / (customerImplementationRisk * customerImplementationRisk) : customerFinancialImpact;
    const internalScore = internalImplementationRisk > 0 ? internalFinancialImpact / (internalImplementationRisk * internalImplementationRisk) : internalFinancialImpact;
    
    // 3. Determine the winning path and its profile.
    let winningPathName: string;
    let winningImpactScore: number;
    let winningRiskScore: number;
    let winner: 'internal' | 'customer';

    if (internalScore >= customerScore) {
      winner = 'internal';
      winningPathName = "Internal Advisor-Assist Tool";
      winningImpactScore = internalFinancialImpact;
      winningRiskScore = internalImplementationRisk;
    } else {
      winner = 'customer';
      winningPathName = "Customer-Facing Bot";
      winningImpactScore = customerFinancialImpact;
      winningRiskScore = customerImplementationRisk;
    }

    // 4. Determine the Strategic Pilot Tier
    let tier, tierJustification;
    if (winningRiskScore > 7 || winningImpactScore < 4) {
      tier = "Tier 1: Exploratory Lab";
      tierJustification = "Your model indicates either VERY HIGH RISK or LOW IMPACT, justifying a small, low-cost experiment to validate basic assumptions before further investment.";
    } else if (winningRiskScore > 4 && winningRiskScore <= 7) {
      tier = "Tier 2: Strategic Pilot";
      tierJustification = "Your model indicates a MEDIUM RISK profile. This justifies a significant but prudent investment focused on building a robust capability before scaling.";
    } else { // Risk is Low and Impact is High
      tier = "Tier 3: Accelerated Launch";
      tierJustification = "Your model indicates a LOW RISK and HIGH IMPACT profile, justifying an aggressive, well-funded pilot designed for rapid scaling and market capture.";
    }
    
    // 5. Build the new dynamic risk profile
    const templateToUse = riskTemplate[winner];
    const newRiskProfile: Risk[] = templateToUse.map(risk => {
        let severityValue: number = 5;
        let summary: string = risk.summary;

        if (winner === 'internal') {
            switch (risk.id) {
                case 'model_risk':
                    severityValue = internalModelRisk[0];
                    break;
                case 'adoption_risk':
                    severityValue = internalAdoptionRisk[0];
                    break;
                case 'data_security_risk':
                    severityValue = internalDataRisk[0];
                    break;
            }
        } else { // customer
            switch(risk.id) {
                case 'model_bias':
                    severityValue = customerModelRisk[0];
                    break;
                case 'security_risk':
                    severityValue = customerSecurityRisk[0];
                    break;
                case 'reputation_risk':
                    severityValue = customerReputationRisk[0];
                    break;
            }
        }
        return { ...risk, severity: sliderToSeverity(severityValue), summary: getDynamicSummary(risk.id, severityValue, risk.summary) };
    });

    // 6. Set all state for other components
    setRecommendationText(`Recommended Pilot: ${winningPathName}`);
    setRecommendedTier(tier);
    setRecommendedTierJustification(tierJustification);
    setRiskProfile(newRiskProfile);
    setRecommendationResultText(`Recommended Pilot: ${winningPathName}`); // For this component's feedback card
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
                             <p className="max-w-xs">Expand this section to model the potential financial upside. Adjust the underlying drivers to see how they affect the overall impact score.</p>
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
                                <p className="max-w-xs">Expand this section to model the potential downsides. Adjust the granular risk factors to see how they influence the overall risk score for this option.</p>
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
                                  <p className="max-w-xs">Expand this section to model the potential financial upside. Adjust the underlying drivers to see how they affect the overall impact score.</p>
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
                                    value={internalEfficiencyGains}
                                    onValueChange={setInternalEfficiencyGains}
                                    disabled={isPrioritizerCompleted}
                                />
                               <span className="font-bold text-primary w-12 text-center">
                                {internalEfficiencyGains[0]}%
                              </span>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <Label>Compliance Cost Savings</Label>
                             <div className="flex items-center gap-4">
                                <Slider
                                    min={0}
                                    max={15}
                                    step={1}
                                    value={internalComplianceSavings}
                                    onValueChange={setInternalComplianceSavings}
                                    disabled={isPrioritizerCompleted}
                                />
                               <span className="font-bold text-primary w-12 text-center">
                                {internalComplianceSavings[0]}%
                              </span>
                            </div>
                        </div>
                         <div className="space-y-3">
                            <Label>Capability Building Value</Label>
                             <div className="flex items-center gap-4">
                                <Slider
                                    min={1}
                                    max={10}
                                    step={1}
                                    value={internalCapabilityBuilding}
                                    onValueChange={setInternalCapabilityBuilding}
                                    disabled={isPrioritizerCompleted}
                                />
                               <span className="font-bold text-primary w-12 text-center">
                                {internalCapabilityBuilding[0]}
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
                                  <p className="max-w-xs">Expand this section to model the potential downsides. Adjust the granular risk factors to see how they influence the overall risk score for this option.</p>
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
                {recommendationResultText}
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

    
