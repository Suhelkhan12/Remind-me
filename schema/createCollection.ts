import {z} from 'zod'
import { AllCollectionColors } from '@/lib/constants'

export const createCollectionSchema = z.object({
    name: z.string().min(4 , {
        message:'Collection name must be atleast 4 characters.'
    }),
    color: z.string().refine(color => Object.keys(AllCollectionColors).includes(color)),
})

export type createCollectionSchemaType = z.infer<typeof createCollectionSchema>