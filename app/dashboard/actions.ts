'use server'
import { db } from '@/db'
import { userProgress } from '@/db/schema'
import { auth } from '@/auth'
import { revalidatePath } from 'next/cache'

export async function saveProgress(formData: FormData) {
    const session = await auth()
    const progressValue = Number(formData.get('progress'))
    
    await db
    .insert(userProgress)
    .values({
        id: session!.user!.id!,
        progress: progressValue,
    })
    .onConflictDoUpdate({
        target: userProgress.id,
        set: { progress: progressValue },
    });

        
    revalidatePath('/dashboard')
}
