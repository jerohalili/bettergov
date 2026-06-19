import { z } from 'zod';

export const ConstitutionStatusSchema = z.enum([
  'in-force',
  'superseded',
  'suspended',
  'interim',
  'never-implemented',
]);

export const ConstitutionVersionSchema = z.object({
  slug: z.string(),
  name: z.string(),
  shortName: z.string(),
  year: z.number(),
  effectiveDate: z.string().optional(),
  endDate: z.string().optional(),
  status: ConstitutionStatusSchema,
  period: z.string(),
  summary: z.string(),
  formOfGovernment: z.string(),
  branchStructure: z.string(),
  rights: z.string(),
  keyChanges: z.array(z.string()),
  fullTextUrl: z.string().optional(),
  sourceUrl: z.string(),
});

export type ConstitutionVersion = z.infer<typeof ConstitutionVersionSchema>;
