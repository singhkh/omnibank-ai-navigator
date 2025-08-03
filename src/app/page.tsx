'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/header';
import Navigation, { type View } from '@/components/layout/navigation';
import AiLandscapeView from '@/components/sections/AiLandscapeView';
import PilotPrioritizerView from '@/components/sections/PilotPrioritizerView';
import RiskDashboardView from '@/components/sections/RiskDashboardView';
import TheVerdictView from '@/components/sections/TheVerdictView';

export type RiskSeverity = "High" | "Medium" | "Low";

export interface Risk {
  id: string;
  title: string;
  icon: string;
  severity: RiskSeverity;
  summary: string;
  mitigations: string[];
}

export const riskTemplate: { internal: Risk[], customer: Risk[] } = {
  internal: [
    { 
      id: 'model_risk', 
      title: "Model Risk", 
      icon: "brain", 
      severity: "Medium", 
      summary: "Risk of inaccurate or biased AI predictions that could mislead our internal advisors.", 
      mitigations: [
        "Human advisors act as a final validation layer.",
        "Continuously monitor model performance on internal data.",
        "Develop an internal 'AI Explainability' dashboard."
      ] 
    },
    { 
      id: 'adoption_risk', 
      title: "Implementation & Adoption Risk", 
      icon: "people", 
      severity: "High", 
      summary: "The primary risk: our financial advisors may resist the tool, fearing job displacement.", 
      mitigations: [
        "Launch an 'AI Champion' program with early adopters.",
        "Develop a robust training and change management plan.",
        "Clearly communicate that the tool is for augmentation, not replacement."
      ] 
    },
    { 
      id: 'data_security_risk', 
      title: "Data Governance & Security Risk", 
      icon: "shield", 
      severity: "Medium", 
      summary: "Risk of internal data misuse. Less severe than a public breach but still significant.", 
      mitigations: [
        "Enforce strict role-based access controls within the bank.",
        "Audit all data access logs.",
        "All data remains within OmniBank's secure infrastructure."
      ] 
    }
  ],
  customer: [
    { 
      id: 'model_bias', 
      title: "Model Risk & Bias", 
      icon: "brain", 
      severity: "High", 
      summary: "CATACROPHIC RISK of biased advice causing direct customer harm and regulatory fines.", 
      mitigations: [
        "Requires third-party ethical AI audits before launch.",
        "Implement complex bias detection algorithms.",
        "Extensive 'red team' testing for harmful outputs."
      ] 
    },
    { 
      id: 'security_risk', 
      title: "Data Privacy & Security Risk", 
      icon: "shield", 
      severity: "High", 
      summary: "Massive risk of a public data breach of sensitive customer financial data, leading to lawsuits.", 
      mitigations: [
        "Requires end-to-end post-quantum cryptography.",
        "Full compliance with GDPR, CCPA, and the AI Act.",
        "Significant investment in cybersecurity infrastructure."
      ] 
    },
    { 
      id: 'reputation_risk', 
      title: "Reputational & Trust Risk", 
      icon: "megaphone", 
      severity: "High", 
      summary: "A single instance of a 'hallucinated' or harmful answer going viral could destroy customer trust.", 
      mitigations: [
        "Implement a multi-layered content moderation system.",
        "Extensive PR and crisis communication plan required.",
        "Limit initial launch to a small, opt-in beta group."
      ] 
    }
  ]
};

export default function Home() {
  const [activeView, setActiveView] = useState<View>('AI Landscape');
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [isPrioritizerCompleted, setIsPrioritizerCompleted] = useState(false);
  const [riskProfile, setRiskProfile] = useState<Risk[]>([]);
  const [recommendationText, setRecommendationText] = useState('');
  const [recommendedTier, setRecommendedTier] = useState('');
  const [recommendedTierJustification, setRecommendedTierJustification] = useState('');


  const renderContent = () => {
    switch (activeView) {
      case 'AI Landscape':
        return (
          <AiLandscapeView
            setSelectedTool={setSelectedTool}
            setActiveView={setActiveView}
          />
        );
      case 'Pilot Prioritizer':
        return (
          <PilotPrioritizerView
            tool={selectedTool}
            setActiveView={setActiveView}
            setIsPrioritizerCompleted={setIsPrioritizerCompleted}
            isPrioritizerCompleted={isPrioritizerCompleted}
            setRiskProfile={setRiskProfile}
            setRecommendationText={setRecommendationText}
            setRecommendedTier={setRecommendedTier}
            setRecommendedTierJustification={setRecommendedTierJustification}
          />
        );
      case 'Risk Dashboard':
        return (
          <RiskDashboardView
            riskProfile={riskProfile}
            setActiveView={setActiveView}
          />
        );
      case 'The Verdict':
        return (
          <TheVerdictView 
            recommendationText={recommendationText}
            recommendedTier={recommendedTier}
            recommendedTierJustification={recommendedTierJustification}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <Navigation 
        activeView={activeView} 
        setActiveView={setActiveView}
        isPilotReady={true}
        isRiskReady={isPrioritizerCompleted}
        isVerdictReady={isPrioritizerCompleted}
      />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <div className="transition-opacity duration-300 ease-in-out">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
