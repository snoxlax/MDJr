import React from 'react'
import MDToHtml from './MDToHtml'

interface ConvertedMdProps {
  markdownContent: string
}

export default function ConvertedMd({ markdownContent }: ConvertedMdProps) {
  return (
    <div className='markdowndiv'>
      <MDToHtml>
        {markdownContent}
      </MDToHtml>
    </div >
  )
}
