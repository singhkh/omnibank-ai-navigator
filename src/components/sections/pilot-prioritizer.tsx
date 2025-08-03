'use client';

import React, { useState, useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { analyzePilotProject, type AnalyzePilotProjectOutput } from '@/ai/flows/ai-driven-roi-analysis';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, ArrowRight } from 'lucide-react';
import type { View } from '../layout/navigation';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  toolName: z.string(),
  projectDescription: z.string().min(10, 'Description must be at least 10 characters.'),
  projectedBenefits: z.string().min(10, 'Benefits must be at least 10 characters.'),
  estimatedCosts: z.string().min(2, 'Costs must be at least 2 characters.'),
});

type FormValues = z.infer<typeof formSchema>;

interface PilotPrioritizerProps {
  tool: string | null;
  setRoiAnalysis: (analysis: AnalyzePilotProjectOutput) => void;
  setActiveView: (view: View) => void;
}

const PilotPrioritizer: React.FC<PilotPrioritizerProps> = ({ tool, setRoiAnalysis, setActiveView }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalyzePilotProjectOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      toolName: tool || '',
      projectDescription: '',
      projectedBenefits: '',
      estimatedCosts: '',
    },
  });

  useEffect(() => {
    if (tool) {
      form.setValue('toolName', tool);
    }
  }, [tool, form]);

  if (!tool) {
    return (
      <Card className="max-w-4xl mx-auto shadow-lg animate-fade-in">
        <CardHeader>
          <CardTitle>Pilot Prioritizer</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Please select a tool from the AI Landscape first.</p>
        </CardContent>
      </Card>
    );
  }

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setAnalysisResult(null);
    try {
      const result = await analyzePilotProject(data);
      setAnalysisResult(result);
      setRoiAnalysis(result);
    } catch (error) {
      console.error('Failed to analyze pilot project:', error);
       toast({
        variant: "destructive",
        title: "Error",
        description: "Could not analyze the project. Please try again.",
      })
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-4xl mx-auto shadow-lg animate-fade-in">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">Pilot Prioritizer</CardTitle>
        <CardDescription>Analyze the potential ROI for an AI pilot project.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="toolName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">AI Tool Name</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly className="bg-muted/50" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="projectDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Project Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe the pilot project..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="projectedBenefits"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Projected Benefits</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., Increased efficiency, cost savings..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="estimatedCosts"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Estimated Costs</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., $10,000 for licenses and integration" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Analyze Project
            </Button>
          </form>
        </Form>
      </CardContent>
      {analysisResult && (
        <CardFooter className="flex flex-col items-start gap-4">
          <h3 className="text-lg font-semibold">Analysis Result</h3>
          <Card className="w-full bg-secondary/50">
            <CardHeader><CardTitle>ROI Assessment</CardTitle></CardHeader>
            <CardContent><p>{analysisResult.roiAssessment}</p></CardContent>
          </Card>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <div className="space-y-2">
              <Label>Risk Score</Label>
              <Progress value={analysisResult.riskScore} className="w-full [&>div]:bg-destructive" />
              <p className="text-right font-bold text-destructive">{analysisResult.riskScore}/100</p>
            </div>
            <div className="space-y-2">
              <Label>Opportunity Score</Label>
              <Progress value={analysisResult.opportunityScore} className="w-full" />
              <p className="text-right font-bold text-primary">{analysisResult.opportunityScore}/100</p>
            </div>
          </div>
           <Button onClick={() => setActiveView('Risk Dashboard')} className="mt-4 self-end">
             Generate Risk Assessment <ArrowRight className="ml-2 h-4 w-4" />
           </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default PilotPrioritizer;
