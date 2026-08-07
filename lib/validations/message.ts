import { z } from 'zod';

export const contactMessageSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  subject: z.string().default('General Inquiry'),
  message: z.string().min(5, 'Message must be at least 5 characters'),
});

export type ContactMessageFormValues = z.infer<typeof contactMessageSchema>;
