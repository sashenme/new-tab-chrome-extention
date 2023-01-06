import React from 'react'

interface WithKeyProps {
  key: React.Key;
  title: string;
  url: string;
}

const QuickLink: React.FC<WithKeyProps> = ({title, url}) => {
  
  return (
    <a className="bg-white/50 backdrop-blur-sm text-white text-sm" href={url}>
      <span>{title}</span>
    </a>
  )
}

export default QuickLink