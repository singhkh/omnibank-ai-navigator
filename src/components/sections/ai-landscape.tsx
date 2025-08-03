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

const formSchema = z.object({
  userRole: z.string().min(2, {
    message: 'User role must be at least 2 characters.',
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface AiLandscapeProps {
  setSelectedTool: (tool: string) => void;
  setActiveView: (view: View) => void;
}

const AiLandscape: React.FC<AiLandscapeProps> = ({ setSelectedTool, setActiveView }) => {
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
    <Card className="max-w-4xl mx-auto shadow-lg animate-fade-in">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">AI Landscape</CardTitle>
        <CardDescription>Discover AI tools tailored to your role at OmniBank.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="userRole"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Your Role</FormLabel>
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
            <h3 className="text-lg font-semibold">Recommended Tools</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
              {recommendations.map((tool, index) => (
                <Card key={index} className="flex flex-col">
                  <CardHeader>
                    <CardTitle className="text-base">{tool}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm text-muted-foreground">AI-powered solution for {form.getValues('userRole')}s.</p>
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
  );
};

export default AiLandscape;
