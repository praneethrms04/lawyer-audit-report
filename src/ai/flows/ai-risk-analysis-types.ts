/**
 * @fileOverview Types and schemas for the AI risk analysis flow.
 */
import {z} from 'zod';

const IssueSchema = z.object({
    issue: z.string().describe('A concise statement of the identified risk issue.'),
    ecValue: z.string().optional().describe('A relevant value from EC records (e.g., deed number), if inferred and available.'),
    taxValue: z.string().optional().describe('A relevant value from tax details (e.g., Annual Tax, Property ID), if inferred and available.'),
    comment: z.string().describe('An elaboration or contextual comment on the issue.'),
});

/**
 * Zod schema for the input to the AI risk analysis flow.
 */
export const AIRiskAnalysisInputSchema = z.object({
  issues: z.array(IssueSchema).describe('Structured list of identified risk issues, each with issue, inferred values, and comment.'),
});

export type AIRiskAnalysisInput = z.infer<typeof AIRiskAnalysisInputSchema>;

/**
 * Zod schema for the output of the AI risk analysis flow.
 */
export const AIRiskAnalysisOutputSchema = z.object({
  issues: z.array(IssueSchema).describe('Structured list of identified risk issues, each with issue, inferred values, and comment.'),
  conclusion: z.string().describe('A comprehensive summary conclusion based on all identified risk issues.'),
});

export type AIRiskAnalysisOutput = z.infer<typeof AIRiskAnalysisOutputSchema>;

export const ConclusionOutputSchema = z.object({
    conclusion: z.string().describe('A comprehensive summary conclusion based on all identified risk issues.'),
});
