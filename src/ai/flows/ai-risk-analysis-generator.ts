'use server';
/**
 * @fileOverview An AI agent that analyzes property data, extracts risk issues,
 * and generates a summary conclusion for a professional report.
 *
 * - generateAIRiskAnalysis - A function that handles the AI risk analysis process.
 */

import {ai} from '@/ai/genkit';
import {
  type AIRiskAnalysisInput,
  type AIRiskAnalysisOutput,
  AIRiskAnalysisInputSchema,
  ConclusionOutputSchema,
} from './ai-risk-analysis-types';


/**
 * Generates an AI-powered risk analysis report based on provided property data.
 * This function takes pre-structured risk issues and generates a summary conclusion.
 *
 * @param input - The input data for risk analysis, containing structured issues.
 * @returns A promise that resolves to the structured risk analysis output including the original issues and the new conclusion.
 */
export async function generateAIRiskAnalysis(input: AIRiskAnalysisInput): Promise<AIRiskAnalysisOutput> {
  const conclusionResult = await aiRiskAnalysisFlow(input);
  return {
    issues: input.issues,
    conclusion: conclusionResult.conclusion,
  };
}

/**
 * Defines the Genkit prompt for the AI risk analysis. This prompt instructs the LLM
 * to act as a financial and property risk analyst to generate a conclusion from existing issues.
 */
const aiRiskAnalysisPrompt = ai.definePrompt({
  name: 'aiRiskAnalysisPrompt',
  input: {schema: AIRiskAnalysisInputSchema},
  output: {schema: ConclusionOutputSchema},
  prompt: `You are an expert financial and property risk analyst. Your task is to analyze a list of pre-identified risk issues and generate a concise, professional summary conclusion for a report.

Here are the identified risk issues:
{{#each issues}}
- Issue: {{{issue}}}
  - Comment: {{{comment}}}
  {{#if ecValue}}- EC Ref: {{{ecValue}}}{{/if}}
  {{#if taxValue}}- Tax Ref: {{{taxValue}}}{{/if}}
{{/each}}

Based on all the issues provided, provide a comprehensive 'conclusion' that summarizes the overall risk profile, highlighting the most critical aspects. The conclusion should be a single paragraph.

Ensure the output is a JSON object matching the following structure:
\`\`\`json
{
  "conclusion": "..."
}
\`\`\`
`,
});

/**
 * Defines the Genkit flow for performing AI risk analysis.
 * It uses the `aiRiskAnalysisPrompt` to generate a conclusion from structured issues.
 */
const aiRiskAnalysisFlow = ai.defineFlow(
  {
    name: 'aiRiskAnalysisFlow',
    inputSchema: AIRiskAnalysisInputSchema,
    outputSchema: ConclusionOutputSchema,
  },
  async (input) => {
    const {output} = await aiRiskAnalysisPrompt(input);
    return output!;
  }
);
