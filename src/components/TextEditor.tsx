import React, { useState } from 'react'

import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

export const TextEditor = () => {
  const [text, setText] = useState('')
  return (
    <>
      <CKEditor
        editor={ClassicEditor}
        data={text}
        onChange={(e: any, editor: any) => {
          const data = editor.getData()
          setText(data)
        }}
      />
      {text}
    </>
  )
}
