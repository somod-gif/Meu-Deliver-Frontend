'use client'

import { useEffect, useState } from 'react'
import { Globe } from 'lucide-react'

export default function GoogleTranslate({
  className = '',
  variant = 'default', // 'default' | 'compact' | 'icon-only'
  languages = 'en,pt,fr,es',
}) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState('')

  useEffect(() => {
    if (window.google?.translate?.TranslateElement) {
      initializeTranslate()
      return
    }

    const existingScript = document.getElementById('google-translate-script')
    if (existingScript) return

    const script = document.createElement('script')
    script.id = 'google-translate-script'
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateInit'
    script.async = true

    script.onload = () => {
      window.googleTranslateInit = initializeTranslate
    }

    document.head.appendChild(script)

    return () => {
      if (window.googleTranslateInit) {
        delete window.googleTranslateInit
      }
    }
  }, [])

  const initializeTranslate = () => {
    try {
      new window.google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: languages,
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false
      }, 'google-translate-element')

      setIsLoaded(true)
      applyCustomStyles()
      setupLanguageChangeListener()
    } catch (error) {
      console.error('Google Translate initialization error:', error)
    }
  }

  const setupLanguageChangeListener = () => {
    const observer = new MutationObserver(() => {
      const languageSpan = document.querySelector('.goog-te-menu-value span:last-child')
      if (languageSpan) {
        setCurrentLanguage(languageSpan.textContent)
      }
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true
    })

    return () => observer.disconnect()
  }

  const applyCustomStyles = () => {
    const styleId = 'google-translate-styles'
    if (document.getElementById(styleId)) return

    const style = document.createElement('style')
    style.id = styleId
    style.textContent = `
      .goog-te-banner-frame { display: none !important; }
      body { top: 0 !important; }
      
      .goog-te-gadget {
        font-family: 'Inter', sans-serif !important;
      }
      
      .goog-te-gadget-simple {
        background: transparent !important;
        border: none !important;
        padding: 0 !important;
        cursor: pointer !important;
        display: flex !important;
        align-items: center !important;
        gap: 6px !important;
        border-radius: 8px !important;
        transition: all 0.2s ease !important;
      }
      
      .goog-te-menu-value span:first-child { display: none !important; }
      
      .goog-te-menu-value span:last-child {
        color: #4B5563 !important;
        font-size: ${variant === 'icon-only' ? '0' : '0.875rem'} !important;
        font-weight: 500 !important;
      }
      
      .goog-te-menu-frame {
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1) !important;
        border-radius: 8px !important;
        border: 1px solid #E5E7EB !important;
        margin-top: 8px !important;
        min-width: 160px !important;
        z-index: 9999 !important;
      }
      
      .goog-te-menu2 {
        background-color: white !important;
        border-radius: 8px !important;
        max-height: 300px !important;
        padding: 4px 0 !important;
      }
      
      .goog-te-menu2-item {
        padding: 8px 16px !important;
        font-size: 0.875rem !important;
        color: #374151 !important;
      }
      
      .goog-te-menu2-item:hover {
        background-color: #F9FAFB !important;
      }
      
      .goog-te-gadget a { display: none !important; }
      
      .goog-te-menu-value span:last-child::after {
        content: '';
        display: ${variant === 'icon-only' ? 'none' : 'inline-block'};
        width: 0;
        height: 0;
        margin-left: 6px;
        border-top: 4px solid;
        border-right: 4px solid transparent;
        border-left: 4px solid transparent;
        color: #9CA3AF;
      }
      
      .goog-te-gadget:hover .goog-te-menu-value span:last-child {
        color: #00B1A5 !important;
      }
    `
    document.head.appendChild(style)
  }

  return (
    <div className={`flex items-center ${className}`}>
      {variant !== 'icon-only' && (
        <div className="flex items-center gap-2 text-gray-600">
          <Globe className={`w-5 h-5 text-[#00b1a5]`} />
          {variant === 'default' && (
            <span className="text-sm">Language</span>
          )}
        </div>
      )}
      
      {variant === 'icon-only' ? (
        <button 
          className="p-2 hover:bg-gray-50 rounded-lg"
          aria-label="Change language"
          onClick={() => document.querySelector('.goog-te-gadget-simple')?.click()}
        >
          <Globe className="w-6 h-6 text-[#00b1a5]" />
        </button>
      ) : (
        <div id="google-translate-element" className="min-w-[60px]"></div>
      )}
    </div>
  )
}