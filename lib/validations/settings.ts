import { z } from 'zod';

export const siteSettingsSchema = z.object({
  siteTitle: z.string().min(1, 'Site title is required'),
  siteDescription: z.string().optional(),
  contactEmail: z.string().email('Invalid email address'),
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
  twitterUrl: z.string().optional(),
  instagramUrl: z.string().optional(),
  discordUrl: z.string().optional(),
  linkedinUrl: z.string().optional(),
  footerText: z.string().optional(),
  googleAnalyticsId: z.string().optional(),
});

export type SiteSettingsFormValues = z.infer<typeof siteSettingsSchema>;
