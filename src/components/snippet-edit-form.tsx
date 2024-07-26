'use client'

import type { Snippet } from "@prisma/client"
import { Editor } from "@monaco-editor/react"
import { useState } from "react"
import * as actions from "@/actions"//you can do import { editSnippet } from '@/actions'

interface SnippetEditFormProps {
    snippet:Snippet
}

export default function SnippetEditForm( { snippet}:SnippetEditFormProps ){
    const [ code, setCode ] = useState( snippet.code )

    const handleEditorChange = ( value : string ="")=>{
        setCode( value )
    }

//first arg always 'null'    
const editSnippetAction = actions.editSnippet.bind( null , snippet.id, code );

    return(
        <div><Editor  
                height="40vh"
                theme="vs-dark"
                language="javascript"
                defaultValue={ snippet.code }
                options={ { minimap: { enabled: false }}}
                onChange={ handleEditorChange }                
            />

        <form action={ editSnippetAction}>
            <button type="submit" className="p-2 border rounded">
                Save
            </button>
        </form>
        </div>
    )

}