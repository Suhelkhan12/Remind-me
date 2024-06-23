'use server'
import prisma, { wait } from "@/lib/wait"
import { createCollectionSchemaType } from "@/schema/createCollection"
import { createTaskSchemaType } from "@/schema/createTask";
import { currentUser } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache";


// for creating collection
export async function createCollection(submitedData:createCollectionSchemaType){
        const user = await currentUser();
        if(!user){
            throw new Error("No clerk user found")
        }
        const collection =  await prisma.collection.create({
            data:{
                name:submitedData.name,
                color:submitedData.color,
                userId:user.id,
            }
        })
        revalidatePath("/");
        return collection;
}

// for deleting collection
export async function deleteCollection(id:string){
    const user = await currentUser();
    if(!user){
        throw new Error("No user found.")
    }
    await wait(2000)
   const response = await prisma.collection.delete({
        where:{
            id
        }
    })
    revalidatePath("/");
    return response;
}

// for creating task
export async function createTask(data:createTaskSchemaType){
    const user = await currentUser(); 
    if(!user){
        throw new Error("no user found")
    }
    await wait(1500)
    const task = await prisma.task.create({
        data:{
            content:data.content,
            userId:user.id,
            completed:false,
            collection:{
                connect:{
                    id: data.collectionId
                }
            }
        }
    })

    revalidatePath('/');
    return task

}

// for checking a task
export async function completeTask(id:string, checked:boolean){
    const user = await currentUser();

    if(!user){
        throw new Error('No user founds')
    }

    const updatedTask = await prisma.task.update({
        where:{
            id,
            userId:user.id
        },
        data:{
            completed:checked
        }
    })

    revalidatePath("/");
    return updatedTask
}