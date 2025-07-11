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
      /* Hide the Google Translate banner */
      .goog-te-banner-frame { 
        display: none !important; 
      }
      
      body { 
        top: 0 !important; 
        position: static !important;
      }
      
      /* Main container styling */
      .goog-te-gadget {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
        font-size: 0 !important;
      }
      
      /* Translate button styling */
      .goog-te-gadget-simple {
        background: transparent !important;
        border: none !important;
        padding: 8px !important;
        margin: 0 !important;
        cursor: pointer !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        border-radius: 8px !important;
        transition: all 0.2s ease !important;
        position: relative !important;
        min-width: 40px !important;
        height: 40px !important;
      }
      
      .goog-te-gadget-simple:hover {
        background: var(--button-hover) !important;
      }
      
      /* Hide the default text, show only icon */
      .goog-te-menu-value {
        margin: 0 !important;
        padding: 0 !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
      }
      
      .goog-te-menu-value span:first-child { 
        display: none !important; 
      }
      
      .goog-te-menu-value span:last-child {
        color: transparent !important;
        font-size: 0 !important;
        width: 0 !important;
        height: 0 !important;
        display: none !important;
      }
      
      /* Dropdown menu styling */
      .goog-te-menu-frame {
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
        border-radius: 12px !important;
        border: 1px solid var(--navbar-border) !important;
        margin-top: 8px !important;
        min-width: 180px !important;
        z-index: 9999 !important;
        background: var(--dropdown-bg) !important;
        overflow: hidden !important;
      }
      
      .goog-te-menu-frame.skiptranslate {
        z-index: 9999 !important;
      }
      
      /* Menu container */
      .goog-te-menu2 {
        background-color: var(--dropdown-bg) !important;
        border-radius: 12px !important;
        max-height: 320px !important;
        overflow-y: auto !important;
        padding: 8px 0 !important;
        border: none !important;
      }
      
      /* Menu items */
      .goog-te-menu2-item {
        padding: 12px 16px !important;
        font-size: 14px !important;
        color: var(--text-color) !important;
        border-bottom: none !important;
        cursor: pointer !important;
        transition: background-color 0.2s ease !important;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
        white-space: nowrap !important;
      }
      
      .goog-te-menu2-item:hover {
        background-color: var(--button-hover) !important;
      }
      
      .goog-te-menu2-item-selected {
        background-color: var(--primary-color) !important;
        color: white !important;
      }
      
      /* Hide the "Powered by" link */
      .goog-te-gadget .goog-te-gadget-simple a {
        display: none !important;
      }
      
      /* Custom scrollbar for the dropdown */
      .goog-te-menu2::-webkit-scrollbar {
        width: 6px;
      }
      
      .goog-te-menu2::-webkit-scrollbar-track {
        background: var(--button-bg);
        border-radius: 3px;
      }
      
      .goog-te-menu2::-webkit-scrollbar-thumb {
        background: var(--text-secondary);
        border-radius: 3px;
      }
      
      .goog-te-menu2::-webkit-scrollbar-thumb:hover {
        background: var(--text-color);
      }
      
      /* Ensure proper positioning */
      .goog-te-menu-frame {
        position: fixed !important;
        transform: translateX(-50%) !important;
        left: 50% !important;
      }
      
      /* Additional z-index fixes */
      .goog-te-menu-frame,
      .goog-te-menu-frame.skiptranslate,
      .goog-te-menu2 {
        z-index: 99999 !important;
      }
    `
    document.head.appendChild(style)
  }

  const handleTranslateClick = (e) => {
    e.stopPropagation()
    const translateElement = document.querySelector('.goog-te-gadget-simple')
    if (translateElement) {
      translateElement.click()
    }
  }

  return (
    <div className={`relative ${className}`}>
      {variant === 'icon-only' ? (
        <div className="relative">
          <button 
            className="p-2 hover:bg-[var(--button-hover)] rounded-lg transition-colors duration-200 relative"
            aria-label="Change language"
            onClick={handleTranslateClick}
          >
            <Globe className="w-6 h-6 text-[var(--primary-color)] transition-colors duration-200" />
          </button>
          <div 
            id="google-translate-element" 
            className="absolute opacity-0 pointer-events-none w-0 h-0 overflow-hidden"
          />
        </div>
      ) : (
        <div className="flex items-center">
          <div className="flex items-center space-x-2">
            {/* <Globe className="w-5 h-5 text-[var(--primary-color)]" /> */}
            {/* <div id="google-translate-element" className="min-w-[80px]" /> */}
          </div>
        </div>
      )}
    </div>
  )
}