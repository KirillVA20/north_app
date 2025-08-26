import { z } from "zod";

export const OrganizationSchema = z.object({
    id: z.string(),
    name: z.string().min(1, 'Name is required'),
    address: z.string(),
    description: z.string(),
    mebmerList: z.array(z.string()),
    eventIds: z.array(z.string()),
    subscribersIds: z.array(z.string())
})

export type Organization = z.infer<typeof OrganizationSchema>