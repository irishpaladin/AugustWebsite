import React from 'react'
export function Card({ className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={`card ${className}`} {...props} />
}
export function CardHeader({ className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={`p-6 ${className}`} {...props} />
}
export function CardTitle({ className = '', ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
    return <h3 className={`text-lg font-semibold ${className}`} {...props} />
}
export function CardContent({ className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={`p-6 pt-0 ${className}`} {...props} />
}