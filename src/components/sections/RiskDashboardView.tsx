'use client';

import React, { useState } from 'react';
import { generateRiskAssessment } from '@/ai/flows/ai-based-risk-dashboard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Loader2, ArrowRight } from 'lucide-react';
import type { View } from '../layout/navigation';
import type { AnalyzePilotProjectOutput } from '@/ai/flows/ai-driven-roi-analysis';
import { useToast } from '@/hooks/use-toast';

interface RiskDashboardViewProps {
  tool: string | null;
  roiAnalysis: AnalyzePilotProjectOutput | null;
  setRiskAssessment: (assessment: string) => void;
  setActiveView: (view: View) => void;
}

const RiskDashboardView: React.FC<RiskDashboardViewProps> = ({ tool, roiAnalysis, setRiskAssessment, setActiveView }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [assessmentResult, setAssessmentResult] = useState<string | null>(null);
  const { toast } = useToast();

  if (!tool || !roiAnalysis) {
    return (
      <Card className="max-w-4xl mx-auto shadow-lg animate-fade-in">
        <CardHeader>
          <CardTitle>Risk Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Please complete the AI Landscape and Pilot Prioritizer steps first.</p>
        </CardContent>
      </Card>
    );
  }

  const handleGenerateAssessment = async () => {
    setIsLoading(true);
    setAssessmentResult(null);
    try {
      const result = await generateRiskAssessment({
        aiTool: tool,
        roiAnalysis: roiAnalysis.roiAssessment,
      });
      setAssessmentResult(result.riskAssessment);
      setRiskAssessment(result.riskAssessment);
    } catch (error) {
      console.error('Failed to generate risk assessment:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not generate risk assessment. Please try again.",
      })
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-4xl mx-auto shadow-lg animate-fade-in">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">Risk Dashboard</CardTitle>
        <CardDescription>Generate a detailed risk assessment for the selected AI pilot project.</CardDescription>
      </CardHeader>
      <CardContent>
        {!assessmentResult && (
          <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg">
            <h3 className="text-lg font-semibold">Ready to assess risks for "{tool}"?</h3>
            <p className="text-muted-foreground mb-4">Click the button below to generate the AI-powered risk assessment.</p>
            <Button onClick={handleGenerateAssessment} disabled={isLoading} size="lg">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate Risk Assessment'
              )}
            </Button>
          </div>
        )}
      </CardContent>
      {assessmentResult && (
         <CardFooter className="flex flex-col items-start gap-4">
          <h3 className="text-lg font-semibold">Risk Assessment Result</h3>
          <Card className="w-full bg-secondary/50">
            <CardContent className="pt-6">
              <p className="whitespace-pre-wrap">{assessmentResult}</p>
            </CardContent>
          </Card>
          <Button onClick={() => setActiveView('The Verdict')} className="mt-4 self-end">
             View The Verdict <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default RiskDashboardView;
