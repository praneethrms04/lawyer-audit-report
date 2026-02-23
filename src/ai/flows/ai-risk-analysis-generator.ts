'use server';
/**
 * @fileOverview An AI agent that analyzes property data, extracts risk issues,
 * infers EC and Tax values, and generates a summary conclusion for a professional report.
 *
 * - generateAIRiskAnalysis - A function that handles the AI risk analysis process.
 * - AIRiskAnalysisInput - The input type for the generateAIRiskAnalysis function.
 * - AIRiskAnalysisOutput - The return type for the generateAIRiskAnalysis function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

/**
 * Zod schema for the input to the AI risk analysis flow.
 */
const AIRiskAnalysisInputSchema = z.object({
  AIGeneratedDescription: z.array(z.string()).describe('An array of raw AI-generated descriptions for risk analysis. Each string represents a potential issue or observation.'),
  ecRecords: z.array(z.object({
    deedNo: z.string().optional().describe('Deed number from an Encumbrance Certificate record.'),
    deedDate: z.string().optional().describe('Deed date from an Encumbrance Certificate record.'),
    deedType: z.string().optional().describe('Deed type from an Encumbrance Certificate record.'),
    firstPartyName: z.string().optional().describe('First party name from an Encumbrance Certificate record.'),
    secondPartyName: z.string().optional().describe('Second party name from an Encumbrance Certificate record.'),
    sro: z.string().optional().describe('SRO from an Encumbrance Certificate record.'),
  })).describe('Array of Encumbrance Certificate records, used to infer EC values.'),
  taxdetails: z.object({
    PropertyID: z.string().optional().describe('Property ID from tax details.'),
    OwnerName: z.string().optional().describe('Owner Name from tax details.'),
    Locality: z.string().optional().describe('Locality from tax details.'),
    PlinthArea: z.string().optional().describe('Plinth Area from tax details.'),
    AnnualTax: z.string().optional().describe('Annual Tax amount from tax details.'),
    ArrearTax: z.string().optional().describe('Arrear Tax amount from tax details.'),
  }).optional().describe('Tax details for the property, used to infer Tax values.'),
});

export type AIRiskAnalysisInput = z.infer<typeof AIRiskAnalysisInputSchema>;

/**
 * Zod schema for the output of the AI risk analysis flow.
 */
const AIRiskAnalysisOutputSchema = z.object({
  issues: z.array(z.object({
    issue: z.string().describe('A concise statement of the identified risk issue.'),
    ecValue: z.string().optional().describe('A relevant value from EC records (e.g., deed number), if inferred and available.'),
    taxValue: z.string().optional().describe('A relevant value from tax details (e.g., Annual Tax, Property ID), if inferred and available.'),
    comment: z.string().describe('An elaboration or contextual comment on the issue.'),
  })).describe('Structured list of identified risk issues, each with issue, inferred values, and comment.'),
  conclusion: z.string().describe('A comprehensive summary conclusion based on all identified risk issues.'),
});

export type AIRiskAnalysisOutput = z.infer<typeof AIRiskAnalysisOutputSchema>;

/**
 * Generates an AI-powered risk analysis report based on provided property data.
 * This function processes raw AI-generated descriptions, infers relevant EC and Tax values,
 * and compiles a structured list of issues along with a summary conclusion.
 *
 * @param input - The input data for risk analysis, including AI descriptions, EC records, and tax details.
 * @returns A promise that resolves to the structured risk analysis output.
 */
export async function generateAIRiskAnalysis(input: AIRiskAnalysisInput): Promise<AIRiskAnalysisOutput> {
  return aiRiskAnalysisFlow(input);
}

/**
 * Defines the Genkit prompt for the AI risk analysis. This prompt instructs the LLM
 * to act as a financial and property risk analyst.
 */
const aiRiskAnalysisPrompt = ai.definePrompt({
  name: 'aiRiskAnalysisPrompt',
  input: {schema: AIRiskAnalysisInputSchema},
  output: {schema: AIRiskAnalysisOutputSchema},
  prompt: `You are an expert financial and property risk analyst. Your task is to analyze raw AI-generated property descriptions, identify specific risk issues, and structure them along with relevant values from Encumbrance Certificate (EC) records and Tax details. Finally, provide a concise summary conclusion.

Here are the raw AI-generated descriptions to analyze, each representing a potential issue or observation:
{{#each AIGeneratedDescription}}
- {{{this}}}
{{/each}}

Here are the Encumbrance Certificate (EC) records, if available:
{{#if ecRecords.length}}
  {{#each ecRecords}}
  Deed No: {{deedNo}}, Date: {{deedDate}}, Type: {{deedType}}, First Party: {{firstPartyName}}, Second Party: {{secondPartyName}}, SRO: {{sro}}
  {{/each}}
{{else}}
  No EC records available.
{{/if}}

Here are the Tax details, if available:
{{#if taxdetails}}
  Property ID: {{taxdetails.PropertyID}}, Owner: {{taxdetails.OwnerName}}, Locality: {{taxdetails.Locality}}, Annual Tax: {{taxdetails.AnnualTax}}, Arrear Tax: {{taxdetails.ArrearTax}}
{{else}}
  No tax details available.
{{/if}}

For each item in 'AIGeneratedDescription':
1. Identify a clear and concise 'issue' (a brief problem statement).
2. Write a 'comment' that elaborates on the issue, providing context or a brief explanation.
3. If the description or context explicitly mentions or strongly implies a connection to an EC record, infer and extract a relevant 'ecValue'. This should typically be a unique identifier like 'deedNo' or a key detail from the most pertinent EC record if an issue relates to it.
4. Similarly, if the description or context explicitly mentions or strongly implies a connection to tax details, infer and extract a relevant 'taxValue'. This could be a specific tax amount like 'AnnualTax' or 'ArrearTax', or an identifier like 'PropertyID' if the issue pertains to a specific tax record.

Finally, provide a comprehensive 'conclusion' that summarizes the overall risk profile based on all identified issues, highlighting the most critical aspects.

Ensure the output is a JSON object matching the following structure:
\`\`\`json
{
  "issues": [
    {
      "issue": "...",
      "ecValue": "...", // optional, if inferred
      "taxValue": "...", // optional, if inferred
      "comment": "..."
    }
  ],
  "conclusion": "..."
}
\`\`\`
`,
});

/**
 * Defines the Genkit flow for performing AI risk analysis.
 * It uses the `aiRiskAnalysisPrompt` to process input and generate structured output.
 */
const aiRiskAnalysisFlow = ai.defineFlow(
  {
    name: 'aiRiskAnalysisFlow',
    inputSchema: AIRiskAnalysisInputSchema,
    outputSchema: AIRiskAnalysisOutputSchema,
  },
  async (input) => {
    const {output} = await aiRiskAnalysisPrompt(input);
    // The output from the prompt is directly the structured analysis.
    return output!;
  }
);
