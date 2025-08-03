'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import type { AnalyzePilotProjectOutput } from '@/ai/flows/ai-driven-roi-analysis';

interface TheVerdictProps {
  tool: string | null;
  roiAnalysis: AnalyzePilotProjectOutput | null;
  riskAssessment: string | null;
}

const TheVerdict: React.FC<TheVerdictProps> = ({ tool, roiAnalysis, riskAssessment }) => {
  if (!tool || !roiAnalysis || !riskAssessment) {
    return (
      <Card className="max-w-4xl mx-auto shadow-lg animate-fade-in">
        <CardHeader>
          <CardTitle>The Verdict</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Please complete all previous steps to see the final verdict.</p>
        </CardContent>
      </Card>
    );
  }

  const overallScore = Math.round((roiAnalysis.opportunityScore * 0.7) + ((100 - roiAnalysis.riskScore) * 0.3));

  return (
    <Card className="max-w-4xl mx-auto shadow-lg animate-fade-in">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-headline">The Verdict: AI Pilot for "{tool}"</CardTitle>
        <CardDescription>A comprehensive summary of the analysis.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <section>
          <h3 className="text-xl font-semibold mb-4 text-primary">Final Recommendation</h3>
          <Card className="bg-secondary/50 border-primary border-l-4">
             <CardContent className="pt-6">
              <p className="text-lg">
                Based on the analysis, implementing <strong>{tool}</strong> presents a strong opportunity with a calculated overall score of <strong>{overallScore}/100</strong>.
                The project demonstrates significant potential benefits that appear to outweigh the identified risks. Proceeding with a pilot is recommended, with careful attention to the mitigation strategies outlined in the risk assessment.
              </p>
             </CardContent>
          </Card>
        </section>

        <Separator />
        
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-primary">ROI & Potential Analysis</h3>
          <p className="text-muted-foreground">{roiAnalysis.roiAssessment}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div>
              <h4 className="font-semibold mb-2">Opportunity Score</h4>
              <div className="flex items-center gap-4">
                <Progress value={roiAnalysis.opportunityScore} className="w-full" />
                <span className="font-bold text-lg text-primary">{roiAnalysis.opportunityScore}</span>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Risk Score</h4>
              <div className="flex items-center gap-4">
                <Progress value={roiAnalysis.riskScore} className="w-full [&>div]:bg-destructive" />
                <span className="font-bold text-lg text-destructive">{roiAnalysis.riskScore}</span>
              </div>
            </div>
          </div>
        </section>

        <Separator />

        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-primary">Detailed Risk Assessment</h3>
          <p className="whitespace-pre-wrap text-muted-foreground">{riskAssessment}</p>
        </section>
      </CardContent>
    </Card>
  );
};

export default TheVerdict;
