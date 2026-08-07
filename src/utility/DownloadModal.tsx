import React from 'react'
import { createPortal } from 'react-dom'
import { Download, X } from 'lucide-react'

type DownloadModalProps = {
  isOpen: boolean
  title?: string
  message?: string
  downloadHref: string
  onClose: () => void
}

export default function DownloadModal({
  isOpen,
  title = 'Download started',
  message,
  downloadHref,
  onClose,
}: DownloadModalProps) {
  if (!isOpen) return null

  const fileName = downloadHref.split('/').pop() ?? 'download'

  const triggerDownload = () => {
    const link = document.createElement('a')
    link.href = downloadHref
    link.download = fileName
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/60 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-slate-900">{title}</p>
            <p className="mt-2 text-sm text-slate-600">
              The file,{' '}
              <span className="font-semibold text-primary">{fileName}</span>{' '}
              should begin downloading shortly. If it does not, use the button below to try again.
            </p>
          </div>
          <button
            type="button"
            className="rounded-full p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
            onClick={onClose}
            aria-label="Close download notice"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
            onClick={triggerDownload}
          >
            <Download className="h-4 w-4" />
            Download again
          </button>
          <button
            type="button"
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}
