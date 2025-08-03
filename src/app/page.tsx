'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/header';
import Navigation, { type View } from '@/components/layout/navigation';
import AiLandscapeView from '@/components/sections/AiLandscapeView';
import PilotPrioritizerView from '@/components/sections/PilotPrioritizerView';
import RiskDashboardView from '@/components/sections/RiskDashboardView';
import TheVerdictView from '@/components/sections/TheVerdictView';
import type { AnalyzePilotProjectOutput } from '@/ai/flows/ai-driven-roi-analysis';

export default function Home() {
  const [activeView, setActiveView] = useState<View>('AI Landscape');
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [roiAnalysis, setRoiAnalysis] = useState<AnalyzePilotProjectOutput | null>(null);
  const [isPrioritizerCompleted, setIsPrioritizerCompleted] = useState(false);
  const [riskProfile, setRiskProfile] = useState([
    {
      title: "Model Risk",
      icon: "brain",
      severity: "Medium" as const, // Can be "High", "Medium", or "Low"
      summary: "Risk of inaccurate or biased AI predictions that could mislead our internal advisors.",
      mitigations: [
        "Human advisors act as a final validation layer.",
        "Continuously monitor model performance on internal data.",
        "Develop an internal 'AI Explainability' dashboard."
      ]
    },
    {
      title: "Implementation & Adoption Risk",
      icon: "people",
      severity: "High" as const,
      summary: "The primary risk: our financial advisors may resist the tool, fearing job displacement.",
      mitigations: [
        "Launch an 'AI Champion' program with early adopters.",
        "Develop a robust training and change management plan.",
        "Clearly communicate that the tool is for augmentation, not replacement."
      ]
    },
    {
      title: "Data Governance & Security Risk",
      icon: "shield",
      severity: "Medium" as const,
      summary: "Risk of internal data misuse. Less severe than a public breach but still significant.",
      mitigations: [
        "Enforce strict role-based access controls within the bank.",
        "Audit all data access logs.",
        "All data remains within OmniBank's secure infrastructure."
      ]
    }
  ]);


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
            setRoiAnalysis={setRoiAnalysis}
            setActiveView={setActiveView}
            setIsPrioritizerCompleted={setIsPrioritizerCompleted}
            isPrioritizerCompleted={isPrioritizerCompleted}
            setRiskProfile={setRiskProfile}
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
          <TheVerdictView />
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
