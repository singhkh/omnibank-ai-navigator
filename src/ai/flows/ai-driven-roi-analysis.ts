'use server';

/**
 * @fileOverview AI-Driven ROI Analysis Flow.
 *
 * This flow evaluates the risks and opportunities of suggested AI tools based on their projected Return on Investment (ROI).
 * It is used within the 'Pilot Prioritizer' section of the OmniBank AI Navigator application.
 *
 * @function analyzePilotProject - Analyzes a pilot project and provides an ROI assessment.
 * @typedef {AnalyzePilotProjectInput} AnalyzePilotProjectInput - The input type for the analyzePilotProject function.
 * @typedef {AnalyzePilotProjectOutput} AnalyzePilotProjectOutput - The return type for the analyzePilotProject function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzePilotProjectInputSchema = z.object({
  toolName: z.string().describe('The name of the AI tool being evaluated.'),
  projectDescription: z.string().describe('A description of the pilot project using the AI tool.'),
  projectedBenefits: z.string().describe('The projected benefits of the pilot project.'),
  estimatedCosts: z.string().describe('The estimated costs associated with the pilot project.'),
});
export type AnalyzePilotProjectInput = z.infer<typeof AnalyzePilotProjectInputSchema>;

const AnalyzePilotProjectOutputSchema = z.object({
  roiAssessment: z.string().describe('An assessment of the project ROI, including risks and opportunities.'),
  riskScore: z.number().describe('A numerical score representing the overall risk associated with the project (0-100).'),
  opportunityScore: z.number().describe('A numerical score representing the overall opportunity associated with the project (0-100).'),
});
export type AnalyzePilotProjectOutput = z.infer<typeof AnalyzePilotProjectOutputSchema>;

export async function analyzePilotProject(input: AnalyzePilotProjectInput): Promise<AnalyzePilotProjectOutput> {
  return analyzePilotProjectFlow(input);
}

const analyzePilotProjectPrompt = ai.definePrompt({
  name: 'analyzePilotProjectPrompt',
  input: {schema: AnalyzePilotProjectInputSchema},
  output: {schema: AnalyzePilotProjectOutputSchema},
  prompt: `You are an AI assistant that helps project planners evaluate the risks and opportunities of AI pilot projects based on their projected Return on Investment (ROI).

  Evaluate the following AI pilot project:

  Tool Name: {{{toolName}}}
  Project Description: {{{projectDescription}}}
  Projected Benefits: {{{projectedBenefits}}}
  Estimated Costs: {{{estimatedCosts}}}

  Provide an assessment of the project ROI, including potential risks and opportunities.  Also, assign a numerical risk score and opportunity score from 0-100.
  `,
});

const analyzePilotProjectFlow = ai.defineFlow(
  {
    name: 'analyzePilotProjectFlow',
    inputSchema: AnalyzePilotProjectInputSchema,
    outputSchema: AnalyzePilotProjectOutputSchema,
  },
  async input => {
    const {output} = await analyzePilotProjectPrompt(input);
    return output!;
  }
);
