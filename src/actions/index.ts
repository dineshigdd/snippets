'use server'

import { revalidatePath } from 'next/cache';
import { db } from '@/db'
import { redirect } from 'next/navigation';

export async function createSnippet( 
    formState: { message : string }, 
    formData: FormData 
){
    try{
        //Check the user's inputs and make sure they're valid
        const title = formData.get('title')
        const code = formData.get('code')

        if( typeof title !== 'string' || title.length < 3 ){
            return {
                message: 'Title must be longer'
            }
        }

        if( typeof code !== 'string' || title.length < 10 ){
            return {
                message: 'Code must be longer'
            }
        }

        //Create a new record in the database
        const snippet =  await db.snippet.create({
            data: {
                title,
                code
            }
        })

        //simulaye an umknown error. disable comment to check
        // throw new Error("Error saving to the database")
    }catch( err: unknown ){
        if ( err instanceof Error){
                return {
                    message: err.message,
                };
        } else{
                return {
                    message:'Something went wrong...'
                };
            }
        }     

    //Redirect the user back to the root route
    /* Do not put redirect inside a try-catch block.redirect 
    issue sort of error message and it will be captured by catch and 
    the 'error' "NEXT_REDIRECT" will be displayed
    and the page will not be redirected */
    
    redirect('/')

}

export async function editSnippet( id:number , code: string) {
   await db.snippet.update({
    where:{ id },
    data:{ code },
   });

   revalidatePath('/')
   redirect(`/snippets/${ id }`)
}


export async function deleteSnippet( id: number ){
    await db.snippet.delete({
        where:{ id }
    })

    revalidatePath('/')
    redirect('/')
}