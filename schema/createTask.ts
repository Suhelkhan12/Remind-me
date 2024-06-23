import {z} from 'zod';

export const createTaskSchema = z.object({
    collectionId: z.string(),
    content: z.string(),
    expiresAt: z.date().optional()
})

export type createTaskSchemaType = z.infer<typeof createTaskSchema>