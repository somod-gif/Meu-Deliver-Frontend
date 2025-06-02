'use client'

import { useEffect } from 'react'

export default function GoogleTranslate() {
  useEffect(() => {
    // Prevent re-injecting the script
    if (document.getElementById('google-translate-script')) return;

    const script = document.createElement('script')
    script.id = 'google-translate-script'
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
    document.body.appendChild(script)

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'en,pt,fr',
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false
      }, 'google_translate_element')
    }

    // Clean Google branding after render
    const interval = setInterval(() => {
      const frame = document.querySelector('iframe');
      const branding = document.querySelector('.goog-logo-link, .goog-te-gadget span');
      if (branding) branding.style.display = 'none';
      if (frame) frame.style.display = 'none';
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div id="google_translate_element" className="text-sm" >
        Translate
    </div>
  )
}
