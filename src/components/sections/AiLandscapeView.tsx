'use client';

import React, { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getAiToolRecommendations } from '@/ai/flows/ai-tool-recommendations';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, ArrowRight } from 'lucide-react';
import type { View } from '../layout/navigation';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

const formSchema = z.object({
  userRole: z.string().min(2, {
    message: 'User role must be at least 2 characters.',
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface AiLandscapeViewProps {
  setSelectedTool: (tool: string) => void;
  setActiveView: (view: View) => void;
}

const AiLandscapeView: React.FC<AiLandscapeViewProps> = ({ setSelectedTool, setActiveView }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userRole: '',
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setRecommendations([]);
    try {
      const result = await getAiToolRecommendations({ userRole: data.userRole });
      setRecommendations(result.tools);
    } catch (error) {
      console.error('Failed to get AI tool recommendations:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not fetch AI tool recommendations. Please try again.",
      })
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectTool = (tool: string) => {
    setSelectedTool(tool);
    setActiveView('Pilot Prioritizer');
  };

  return (
    <div className="space-y-8 animate-fade-in">
       <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-primary">The AI Landscape: Peak Hype Demands Caution</h2>
        <p className="mt-2 text-lg text-muted-foreground">The Gartner Hype Cycle for AI provides a valuable framework for understanding the maturity and adoption of various AI technologies.</p>
      </div>

      <div className="w-full max-w-4xl mx-auto">
        <Image 
          src="https://placehold.co/1200x600.png"
          alt="Gartner Hype Cycle Diagram" 
          width={1200}
          height={600}
          className="rounded-lg shadow-lg"
          data-ai-hint="Gartner HypeCycle"
        />
      </div>

      <Card className="max-w-4xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Discover Your AI Opportunity</CardTitle>
          <CardDescription>
            Use the tool below to identify AI solutions that can impact your role at OmniBank.
            This is the first step in our structured process to evaluate and prioritize AI pilot projects.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="userRole"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Your Role at OmniBank</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Financial Analyst, Marketing Manager, etc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Get Recommendations
              </Button>
            </form>
          </Form>
        </CardContent>
        {recommendations.length > 0 && (
          <CardFooter className="flex flex-col items-start gap-4">
              <h3 className="text-lg font-semibold">Recommended Tools for a {form.getValues('userRole')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                {recommendations.map((tool, index) => (
                  <Card key={index} className="flex flex-col">
                    <CardHeader>
                      <CardTitle className="text-base">{tool}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-sm text-muted-foreground">AI-powered solution to enhance productivity and decision-making.</p>
                    </CardContent>
                    <CardFooter>
                      <Button onClick={() => handleSelectTool(tool)} className="w-full" variant="secondary">
                        Analyze Pilot Project <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default AiLandscapeView;
