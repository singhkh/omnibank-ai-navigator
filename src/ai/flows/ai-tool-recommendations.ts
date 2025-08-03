'use server';
/**
 * @fileOverview An AI tool recommendation agent.
 *
 * - getAiToolRecommendations - A function that suggests relevant AI tools based on the user's role.
 * - AiToolRecommendationsInput - The input type for the getAiToolRecommendations function.
 * - AiToolRecommendationsOutput - The return type for the getAiToolRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiToolRecommendationsInputSchema = z.object({
  userRole: z.string().describe('The user\'s role within OmniBank.'),
});
export type AiToolRecommendationsInput = z.infer<typeof AiToolRecommendationsInputSchema>;

const AiToolRecommendationsOutputSchema = z.object({
  tools: z.array(z.string()).describe('A list of relevant AI tools for the user\'s role.'),
});
export type AiToolRecommendationsOutput = z.infer<typeof AiToolRecommendationsOutputSchema>;

export async function getAiToolRecommendations(input: AiToolRecommendationsInput): Promise<AiToolRecommendationsOutput> {
  return aiToolRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiToolRecommendationsPrompt',
  input: {schema: AiToolRecommendationsInputSchema},
  output: {schema: AiToolRecommendationsOutputSchema},
  prompt: `You are an AI assistant specializing in recommending AI tools for various roles within OmniBank.

  Based on the user's role, suggest a list of relevant AI tools that can help them with their work.

  User Role: {{{userRole}}}

  Please provide a list of AI tools that would be most applicable to their role.`,
});

const aiToolRecommendationsFlow = ai.defineFlow(
  {
    name: 'aiToolRecommendationsFlow',
    inputSchema: AiToolRecommendationsInputSchema,
    outputSchema: AiToolRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
