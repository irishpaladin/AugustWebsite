import React from 'react'
export function Badge({className='', children, bgColor = "bg-pastel-lavender"}:{className?: string, children: React.ReactNode, bgColor?: string}){
  return <span className={`badge ${bgColor} text-slate-700 ${className}`}>{children}</span>
}
