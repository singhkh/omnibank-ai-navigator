'use client';

import React, { useState, useMemo } from 'react';
import Header from '@/components/layout/header';
import Navigation, { type View } from '@/components/layout/navigation';
import AiLandscape from '@/components/sections/ai-landscape';
import PilotPrioritizer from '@/components/sections/pilot-prioritizer';
import RiskDashboard from '@/components/sections/risk-dashboard';
import TheVerdict from '@/components/sections/the-verdict';
import type { AnalyzePilotProjectOutput } from '@/ai/flows/ai-driven-roi-analysis';

export default function Home() {
  const [activeView, setActiveView] = useState<View>('AI Landscape');
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [roiAnalysis, setRoiAnalysis] = useState<AnalyzePilotProjectOutput | null>(null);
  const [riskAssessment, setRiskAssessment] = useState<string | null>(null);

  const isPilotReady = useMemo(() => !!selectedTool, [selectedTool]);
  const isRiskReady = useMemo(() => isPilotReady && !!roiAnalysis, [isPilotReady, roiAnalysis]);
  const isVerdictReady = useMemo(() => isRiskReady && !!riskAssessment, [isRiskReady, riskAssessment]);

  const renderContent = () => {
    switch (activeView) {
      case 'AI Landscape':
        return (
          <AiLandscape
            setSelectedTool={setSelectedTool}
            setActiveView={setActiveView}
          />
        );
      case 'Pilot Prioritizer':
        return (
          <PilotPrioritizer
            tool={selectedTool}
            setRoiAnalysis={setRoiAnalysis}
            setActiveView={setActiveView}
          />
        );
      case 'Risk Dashboard':
        return (
          <RiskDashboard
            tool={selectedTool}
            roiAnalysis={roiAnalysis}
            setRiskAssessment={setRiskAssessment}
            setActiveView={setActiveView}
          />
        );
      case 'The Verdict':
        return (
          <TheVerdict
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
