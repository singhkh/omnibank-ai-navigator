'use client';

import React, { useState, useMemo } from 'react';
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
  const [riskAssessment, setRiskAssessment] = useState<string | null>(null);

  // For simplicity, we'll enable all views after the first step.
  // In a real scenario, this would be driven by completion of each step.
  const isPilotReady = true;
  const isRiskReady = true;
  const isVerdictReady = true;

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
          />
        );
      case 'Risk Dashboard':
        return (
          <RiskDashboardView
            tool={selectedTool}
            roiAnalysis={roiAnalysis}
            setRiskAssessment={setRiskAssessment}
            setActiveView={setActiveView}
          />
        );
      case 'The Verdict':
        return (
          <TheVerdictView
            tool={selectedTool}
            roiAnalysis={roiAnalysis}
            riskAssessment={riskAssessment}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Navigation 
        activeView={activeView} 
        setActiveView={setActiveView}
        isPilotReady={isPilotReady}
        isRiskReady={isRiskReady}
        isVerdictReady={isVerdictReady}
      />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <div className="transition-opacity duration-300 ease-in-out">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
