import React, {useState} from 'react'
export function Accordion({items}:{items:{q:string,a:string}[]}){
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="mx-auto max-w-3xl divide-y rounded-2xl border bg-white">
      {items.map((it, idx)=> (
        <details key={idx} open={open===idx} onToggle={(e)=> setOpen((e.target as HTMLDetailsElement).open? idx : null)}>
          <summary className="cursor-pointer select-none px-6 py-4 font-medium outline-none">{it.q}</summary>
          <div className="px-6 pb-6 text-slate-600">{it.a}</div>
        </details>
      ))}
    </div>
  )
}