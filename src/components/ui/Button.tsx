import React from 'react'
export function Button({variant='primary', className='', ...props}:{variant?: 'primary'|'outline', className?: string} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={`btn ${variant==='primary'?'btn-primary':'btn-outline'} ${className}`} {...props} />
}
