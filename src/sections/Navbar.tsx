import React from 'react'
import { createPortal } from 'react-dom'
import Container from '@/components/shared/Container'
import { Baby, FileText, Menu, X, ChevronDown, Download } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [formsOpen, setFormsOpen] = React.useState(false)
  const [downloadNoticeOpen, setDownloadNoticeOpen] = React.useState(false)

  const handbookDownloadHref = '/forms/August Daycare-Parent Handbook July 2026.pdf'

  const triggerDownload = React.useCallback((href: string) => {
    const link = document.createElement('a')
    link.href = href
    link.download = 'August Daycare-Parent Handbook July 2026.pdf'
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }, [])

  const handleDownloadLinkClick = React.useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      event.preventDefault()
      setDownloadNoticeOpen(true)
      triggerDownload(href)
    },
    [triggerDownload]
  )

  const links: Array<{ label: string; href: string; isDownload?: boolean }> = [
    { label: 'About', href: '#about' },
    { label: 'Programs', href: '#programs' },
    { label: 'Gallery', href: '#gallery' },
    {
      label: 'Fees',
      href: handbookDownloadHref,
      isDownload: true,
    },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ]

  const formLinks = Object.entries(
    import.meta.glob('../../public/forms/*', { eager: true, import: 'default' })
  )
    .map(([path, href]) => {
      const fileName = path.split('/').pop() ?? ''
      const label = fileName.replace(/\.[^.]+$/, '')
      return { label, href: href as string }
    })
    .sort((a, b) => a.label.localeCompare(b.label))

  const closeMobileMenu = () => {
    setMobileOpen(false)
    setFormsOpen(false)
  }

  // Optional: if user resizes from mobile -> desktop, close mobile menu state
  React.useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) closeMobileMenu()
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const downloadModal = downloadNoticeOpen
    ? createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/60 p-4"
          onClick={() => setDownloadNoticeOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-900">Download started</p>
                <p className="mt-2 text-sm text-slate-600">
                  Your handbook PDF should begin downloading shortly. If it does not, use the
                  button below to try again.
                </p>
              </div>
              <button
                type="button"
                className="rounded-full p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                onClick={() => setDownloadNoticeOpen(false)}
                aria-label="Close download notice"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
                onClick={() => triggerDownload(handbookDownloadHref)}
              >
                <Download className="h-4 w-4" />
                Download again
              </button>
              <button
                type="button"
                className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                onClick={() => setDownloadNoticeOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>,
        document.body
      )
    : null

  return (
    <div className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur">
      <Container className="flex items-center justify-between py-4">
        <a href="#home" className="flex items-center gap-2 font-extrabold" onClick={closeMobileMenu}>
          <img src="../../public/images/logo.png" width={200} height={100} alt="Logo" />
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              download={link.isDownload ? true : undefined}
              onClick={(event) => {
                if (link.isDownload) {
                  handleDownloadLinkClick(event, link.href)
                }
              }}
              className="inline-flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              <span>{link.label}</span>
              {link.isDownload ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-700">
                  <Download className="h-3 w-3" />
                  PDF
                </span>
              ) : null}
            </a>
          ))}

          {/* Forms dropdown (desktop hover) */}
          <div className="relative group">
            <button
              type="button"
              className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              <Baby className="h-4 w-4" />
              <span>Forms</span>
            </button>

            <div
              className="
                absolute right-0 top-full z-20
                w-72 rounded-xl border bg-white shadow-lg p-3
                opacity-0 invisible pointer-events-none
                group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto
                transition-opacity duration-150
              "
            >
              <p className="mb-2 text-xs font-semibold text-slate-500">
                Download enrollment & consent forms
              </p>
              <ul className="space-y-1 text-sm text-slate-700">
                {formLinks.map((form) => (
                  <li key={form.label}>
                    <a
                      href={form.href}
                      download
                      className="flex items-center justify-between rounded-lg px-2 py-2 hover:bg-slate-50"
                    >
                      <span>{form.label}</span>
                      <FileText className="h-4 w-4 text-primary" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>

        {/* Right side: Desktop CTA + Mobile hamburger */}
        <div className="flex items-center gap-2">
          {/* Desktop CTA only */}
          <a href="#contact" className="hidden md:inline-flex">
            <Button className="rounded-xl">Say hello!</Button>
          </a>

          {/* Mobile hamburger only */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-xl border bg-white px-3 py-2 text-slate-700 shadow-sm md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      {/* Mobile menu panel */}
      <div
        className={`md:hidden overflow-hidden border-t bg-white/95 backdrop-blur transition-[max-height] duration-200 ${
          mobileOpen ? 'max-h-[520px]' : 'max-h-0'
        }`}
      >
        <Container className="py-3">
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                download={link.isDownload ? true : undefined}
                onClick={(event) => {
                  closeMobileMenu()
                  if (link.isDownload) {
                    handleDownloadLinkClick(event, link.href)
                  }
                }}
                className="flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                <span>{link.label}</span>
                {link.isDownload ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-700">
                    <Download className="h-3 w-3" />
                    PDF
                  </span>
                ) : null}
              </a>
            ))}

            {/* Mobile Forms accordion */}
            <button
              type="button"
              className="flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
              onClick={() => setFormsOpen((v) => !v)}
              aria-expanded={formsOpen}
            >
              <span className="flex items-center gap-2">
                <Baby className="h-4 w-4" />
                Forms
              </span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${formsOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {formsOpen && (
              <div className="mb-2 ml-2 rounded-xl border bg-white p-2">
                <p className="px-2 pb-2 text-xs font-semibold text-slate-500">
                  Download enrollment & consent forms
                </p>
                <ul className="space-y-1 text-sm text-slate-700">
                  {formLinks.map((form) => (
                    <li key={form.label}>
                      <a
                        href={form.href}
                        download
                        onClick={closeMobileMenu}
                        className="flex items-center justify-between rounded-lg px-2 py-2 hover:bg-slate-50"
                      >
                        <span>{form.label}</span>
                        <FileText className="h-4 w-4 text-primary" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Mobile CTA */}
            <a href="#contact" onClick={closeMobileMenu} className="pt-2">
              <Button className="w-full rounded-xl">Say hello!</Button>
            </a>
          </div>
        </Container>
      </div>

      {downloadModal}
    </div>
  )
}
