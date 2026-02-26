'use client'

import { useEffect } from 'react'
import type { Metadata } from 'next'

export default function PrivacyPolicyPage() {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://cdn.iubenda.com/iubenda.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <>
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 uppercase tracking-tight mb-10">
            Privacy Policy
          </h1>
          <div>
            <a
              href="https://www.iubenda.com/privacy-policy/88724875"
              className="iubenda-white iubenda-noiframe iubenda-embed"
              title="Privacy Policy"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
