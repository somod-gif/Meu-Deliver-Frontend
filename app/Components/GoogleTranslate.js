import { useEffect, useState } from 'react'
import { Globe, ChevronDown } from 'lucide-react'

export default function GoogleTranslate() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState('EN')

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸', short: 'EN' },
    { code: 'pt', name: 'Português', flag: '🇧🇷', short: 'PT' },
    { code: 'fr', name: 'Français', flag: '🇫🇷', short: 'FR' }
  ]

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
        includedLanguages: 'en,pt,fr,es,de,it,ja,ko,zh',
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false,
        multilanguagePage: true,
        gaTrack: false,
        gaId: null
      }, 'google_translate_element')
      
      // Make select element accessible after initialization
      setTimeout(() => {
        const selectElement = document.querySelector('#google_translate_element select')
        if (selectElement) {
          selectElement.setAttribute('id', 'google-translate-select')
          // Monitor for changes to update our UI
          selectElement.addEventListener('change', (e) => {
            const selectedValue = e.target.value
            const langMap = { 'en': 'EN', 'pt': 'PT', 'fr': 'FR' }
            if (langMap[selectedValue]) {
              setCurrentLang(langMap[selectedValue])
            }
          })
        }
      }, 1000)
    }

    // Enhanced Google branding cleanup
    const cleanGoogleBranding = () => {
      // Hide Google branding
      const branding = document.querySelectorAll('.goog-logo-link, .goog-te-gadget span, .goog-te-banner-frame, .goog-te-ftab')
      branding.forEach(el => {
        if (el) el.style.display = 'none'
      })

      // Hide the original Google translate element but keep it functional
      const googleElement = document.getElementById('google_translate_element')
      if (googleElement) {
        googleElement.style.opacity = '0'
        googleElement.style.position = 'absolute'
        googleElement.style.left = '-9999px'
        googleElement.style.pointerEvents = 'none'
      }

      // Remove Google's top banner
      const banner = document.querySelector('.goog-te-banner-frame')
      if (banner) banner.remove()

      // Clean up body modifications by Google
      document.body.style.top = '0px'
      
      // Remove the notification bar
      const notifBar = document.querySelector('.goog-te-banner-frame.skiptranslate')
      if (notifBar) notifBar.remove()
    }

    // Run cleanup multiple times to ensure it works
    const interval = setInterval(cleanGoogleBranding, 500)
    setTimeout(() => clearInterval(interval), 5000)

    return () => {
      clearInterval(interval)
      const script = document.getElementById('google-translate-script')
      if (script) script.remove()
    }
  }, [])

  const handleLanguageChange = (langCode, langShort) => {
    // Find the Google Translate select element
    const selectElement = document.querySelector('#google_translate_element select')
    if (selectElement) {
      // Set the value
      selectElement.value = langCode
      
      // Fire the change event that Google Translate listens for
      const event = new Event('change', { bubbles: true })
      selectElement.dispatchEvent(event)
      
      // Also try triggering with mouse events as backup
      selectElement.click()
      
      setCurrentLang(langShort)
      setIsOpen(false)
    } else {
      // Fallback: directly trigger Google Translate if select not found
      if (window.google && window.google.translate) {
        const translateElement = new window.google.translate.TranslateElement({
          pageLanguage: 'en',
          includedLanguages: 'en,pt,fr'
        })
        
        // Force page translation
        if (langCode !== 'en') {
          setTimeout(() => {
            const frames = document.querySelectorAll('iframe')
            frames.forEach(frame => {
              try {
                if (frame.src.includes('translate.google')) {
                  const frameDoc = frame.contentDocument || frame.contentWindow.document
                  const option = frameDoc.querySelector(`option[value="${langCode}"]`)
                  if (option) {
                    option.selected = true
                    const selectInFrame = option.parentElement
                    selectInFrame.dispatchEvent(new Event('change'))
                  }
                }
              } catch (e) {
                // Cross-origin iframe access blocked
              }
            })
          }, 100)
        }
      }
      
      setCurrentLang(langShort)
      setIsOpen(false)
    }
  }

  return (
    <div className="relative">
      {/* Hidden Google Translate Element */}
      <div id="google_translate_element" className="hidden"></div>
      
      {/* Custom Professional UI */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-200 hover:border-[#00b1a5] hover:bg-[#00b1a5]/5 transition-all duration-300 bg-white/80 backdrop-blur-sm group"
          aria-label="Select language"
        >
          <Globe className="w-4 h-4 text-gray-600 group-hover:text-[#00b1a5] transition-colors" />
          <span className="text-sm font-medium text-gray-700 group-hover:text-[#00b1a5] transition-colors">
            {currentLang}
          </span>
          <ChevronDown className={`w-3 h-3 text-gray-500 group-hover:text-[#00b1a5] transition-all duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 top-full mt-2 w-44 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code, lang.short)}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-[#00b1a5]/10 transition-colors duration-200 ${
                  currentLang === lang.short ? 'bg-[#00b1a5]/5 text-[#00b1a5]' : 'text-gray-700'
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <div className="flex-1">
                  <div className="font-medium text-sm">{lang.name}</div>
                  <div className="text-xs text-gray-500">{lang.short}</div>
                </div>
                {currentLang === lang.short && (
                  <div className="w-2 h-2 bg-[#00b1a5] rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Click outside to close */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <style jsx global>{`
        /* Hide Google Translate branding completely */
        .goog-te-banner-frame,
        .goog-te-ftab,
        .goog-logo-link,
        .goog-te-gadget span,
        .goog-te-combo {
          display: none !important;
        }
        
        /* Hide the original Google translate dropdown */
        #google_translate_element select {
          display: none !important;
        }
        
        /* Remove Google's top notification bar */
        body {
          top: 0 !important;
        }
        
        /* Style any remaining Google elements */
        .goog-te-menu-value {
          color: transparent !important;
        }
        
        /* Remove Google branding text */
        .goog-te-gadget-simple .goog-te-menu-value span:first-child {
          display: none;
        }
        
        /* Animation classes for dropdown */
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-in-from-top-2 {
          from { transform: translateY(-8px); }
          to { transform: translateY(0); }
        }
        
        .animate-in {
          animation: fade-in 0.2s ease-out, slide-in-from-top-2 0.2s ease-out;
        }
      `}</style>
    </div>
  )
}