'use client'

import { useEffect, useState } from 'react'

export default function GoogleTranslate() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (document.getElementById('google-translate-script')) {
      setIsLoaded(true)
      return
    }

    const script = document.createElement('script')
    script.id = 'google-translate-script'
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
    script.async = true

    script.onload = () => setIsLoaded(true)
    script.onerror = () => {
      setError(true)
      console.error('Failed to load Google Translate script')
    }

    document.body.appendChild(script)

    window.googleTranslateElementInit = () => {
      try {
        new window.google.translate.TranslateElement({
          pageLanguage: 'en',
          includedLanguages: 'en,pt,fr',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
          multilanguagePage: true
        }, 'google_translate_element')
        setIsLoaded(true)
      } catch (err) {
        setError(true)
        console.error('Error initializing Google Translate:', err)
      }
    }

    return () => {
      const scriptTag = document.getElementById('google-translate-script')
      if (scriptTag) scriptTag.remove()
      delete window.googleTranslateElementInit
    }
  }, [])

  useEffect(() => {
    if (!isLoaded) return
    const style = document.createElement('style')
    style.textContent = `
      .goog-te-banner-frame { display: none !important; }
      body { top: 0 !important; }
      .goog-te-gadget { font-family: inherit !important; font-size: 14px !important; }
      .goog-te-gadget-simple {
        background: white !important;
        border: 1px solid #e5e7eb !important;
        border-radius: 0.5rem !important;
        padding: 6px 12px !important;
        color: #374151 !important;
        cursor: pointer;
      }
      .goog-te-gadget-simple:hover {
        border-color: #00b1a5 !important;
        box-shadow: 0 0 0 3px rgba(0,177,165,0.1) !important;
      }
      .goog-te-gadget-simple .goog-te-menu-value span:first-child {
        display: none !important;
      }
      .goog-te-menu-frame {
        border-radius: 0.5rem !important;
        border: 1px solid #e5e7eb !important;
        box-shadow: 0 10px 15px rgba(0,0,0,0.1) !important;
      }
      .goog-te-menu2 {
        max-height: 300px !important;
        overflow-y: auto !important;
        border-radius: 0.5rem !important;
      }
      .goog-te-menu2-item {
        padding: 8px 16px !important;
        transition: background-color 0.2s ease !important;
      }
      .goog-te-menu2-item:hover {
        background-color: #f9fafb !important;
      }
      .goog-te-menu2-item-selected {
        background-color: #00b1a5 !important;
        color: white !important;
      }
      .goog-te-gadget .goog-te-gadget-simple a {
        display: none !important;
      }

      @media (max-width: 640px) {
        .goog-te-gadget-simple {
          padding: 5px 10px !important;
          font-size: 13px !important;
        }
      }
    `
    document.head.appendChild(style)
  }, [isLoaded])

  if (error) {
    return (
      <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        Translation service unavailable
      </div>
    )
  }

  return (
    <div className="relative w-fit max-w-full">
      <div className="flex items-center gap-3 p-1">
        <div className="flex items-center gap-2 text-gray-700">
          <svg
            className="w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
            />
          </svg>
          <span className="text-sm font-medium hidden sm:inline">Translate</span>
        </div>

        <div className="relative min-w-[100px]">
          {!isLoaded && (
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-md animate-pulse">
              <div className="w-4 h-4 bg-gray-300 rounded-full" />
              <div className="w-20 h-3 bg-gray-300 rounded" />
            </div>
          )}
          <div
            id="google_translate_element"
            className={`transition-opacity duration-300 ${!isLoaded ? 'opacity-0 absolute' : 'opacity-100'}`}
          />
        </div>
      </div>
    </div>
  )
}
