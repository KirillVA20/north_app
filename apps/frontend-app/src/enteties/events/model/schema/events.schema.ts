import { z } from 'zod';

export const EventSchema = z.object({
  id: z.string().uuid('Invalid event ID'),
  title: z.string().min(1, 'Title is required'),
  time: z.string().datetime('Invalid date-time format'),
  duration: z.number().nonnegative('Duration must be non-negative'),
  status: z.enum(['planned', 'ongoing', 'ended', 'cancelled']),
  location: z
    .tuple([z.number(), z.number()])
    .refine(
      ([lat, lng]) => lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180,
      'Invalid coordinates',
    ),
  description: z.string().min(1, 'Description is required'),
});

export type EvenType = z.infer<typeof EventSchema>;
