import { db } from '@/db';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import * as actions from '@/actions';



interface SnippetShowPageProps{
    params: {
        id: string
    }
}


export default async function SnippetsShowPage( props : SnippetShowPageProps ) {


    const snippet = await db.snippet.findFirst({
        where: { id: parseInt( props.params.id  )}
    })

    if( !snippet ){
        return notFound()
    }

    const deleteSnippetAction = actions.deleteSnippet.bind( null , snippet.id )

    return(
        <div>
             <div className="flex m-4 justify-between items-center">
                <h1 className='text-xl font-bold'>{ snippet.title }</h1>
                <div className='flex gap-2'>
                    <Link href={ `/snippets/${ snippet.id }/edit`} className='p-2 border rounded'>Edit</Link>
                    <form action={ deleteSnippetAction }>
                        <button className='p-2 border rounded'>Delete</button>
                    </form>
                </div>
            </div>
                <pre className='p-3 border rounded bg-gray-200 border-gray-200'>
                    <code>
                        { snippet.code }
                    </code>
                </pre>            
        </div>
    )
}
//This function is used only at the build time
export async function generateStaticParams(){
    const snippet = await db.snippet.findMany();

    return snippet.map(( snippet) => {
        return {
            id: snippet.id.toString 
            /*the id we used is a number. 
            but , here we need to have a string when generating static paths */
        }
    })
}