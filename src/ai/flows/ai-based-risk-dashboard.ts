'use server';

/**
 * @fileOverview Generates an AI-based risk assessment based on suggested AI tools and ROI analysis.
 *
 * - generateRiskAssessment - A function that generates a risk assessment.
 * - RiskAssessmentInput - The input type for the generateRiskAssessment function.
 * - RiskAssessmentOutput - The return type for the generateRiskAssessment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RiskAssessmentInputSchema = z.object({
  aiTool: z.string().describe('The name of the AI tool being assessed.'),
  roiAnalysis: z.string().describe('The ROI analysis of the AI tool.'),
});
export type RiskAssessmentInput = z.infer<typeof RiskAssessmentInputSchema>;

const RiskAssessmentOutputSchema = z.object({
  riskAssessment: z.string().describe('The AI-generated risk assessment.'),
});
export type RiskAssessmentOutput = z.infer<typeof RiskAssessmentOutputSchema>;

export async function generateRiskAssessment(
  input: RiskAssessmentInput
): Promise<RiskAssessmentOutput> {
  return generateRiskAssessmentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'riskAssessmentPrompt',
  input: {schema: RiskAssessmentInputSchema},
  output: {schema: RiskAssessmentOutputSchema},
  prompt: `You are an expert risk manager. Based on the AI tool and its ROI analysis, generate a comprehensive risk assessment.

AI Tool: {{{aiTool}}}
ROI Analysis: {{{roiAnalysis}}}

Risk Assessment:`,
});

const generateRiskAssessmentFlow = ai.defineFlow(
  {
    name: 'generateRiskAssessmentFlow',
    inputSchema: RiskAssessmentInputSchema,
    outputSchema: RiskAssessmentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
