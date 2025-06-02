'use client'

import { useEffect } from 'react'

export default function GoogleTranslate() {
  useEffect(() => {
    const addScript = () => {
      if (document.getElementById('google-translate-script')) return

      const script = document.createElement('script')
      script.id = 'google-translate-script'
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
      document.body.appendChild(script)

      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement({
          pageLanguage: 'en',
          includedLanguages: 'en,pt,fr',
          layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false
        }, 'google_translate_element')
      }
    }

    addScript()
  }, [])

  return (
    <div id="google_translate_element" className="mt-4" />
  )
}



// 'use client'

// import { useEffect, useState } from 'react'
// import { Globe, ChevronDown } from 'lucide-react'

// export default function GoogleTranslate({ isMobile = false }) {
//   const [isOpen, setIsOpen] = useState(false)
//   const [currentLang, setCurrentLang] = useState('EN')

//   const languages = [
//     { code: 'en', name: 'English', flag: '🇺🇸', short: 'EN' },
//     { code: 'pt', name: 'Português', flag: '🇧🇷', short: 'PT' },
//     { code: 'fr', name: 'Français', flag: '🇫🇷', short: 'FR' }
//   ]

//   useEffect(() => {
//     if (document.getElementById('google-translate-script')) return

//     const script = document.createElement('script')
//     script.id = 'google-translate-script'
//     script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
//     document.body.appendChild(script)

//     window.googleTranslateElementInit = () => {
//       new window.google.translate.TranslateElement({
//         pageLanguage: 'en',
//         includedLanguages: 'en,pt,fr',
//         layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
//         autoDisplay: false,
//         multilanguagePage: true
//       }, 'google_translate_element')

//       setTimeout(() => {
//         const selectElement = document.querySelector('#google_translate_element select')
//         if (selectElement) {
//           selectElement.setAttribute('id', 'google-translate-select')
//           selectElement.addEventListener('change', (e) => {
//             const selectedValue = e.target.value
//             const langMap = { 'en': 'EN', 'pt': 'PT', 'fr': 'FR' }
//             if (langMap[selectedValue]) {
//               setCurrentLang(langMap[selectedValue])
//             }
//           })
//         }
//       }, 1000)
//     }

//     const cleanGoogleBranding = () => {
//       const branding = document.querySelectorAll('.goog-logo-link, .goog-te-gadget span, .goog-te-banner-frame, .goog-te-ftab')
//       branding.forEach(el => {
//         if (el) el.style.display = 'none'
//       })

//       const googleElement = document.getElementById('google_translate_element')
//       if (googleElement) {
//         googleElement.style.opacity = '0'
//         googleElement.style.position = 'absolute'
//         googleElement.style.left = '-9999px'
//         googleElement.style.width = '1px'
//         googleElement.style.height = '1px'
//         googleElement.style.overflow = 'hidden'

//         const selectElement = googleElement.querySelector('select')
//         if (selectElement) {
//           selectElement.style.opacity = '0'
//           selectElement.style.position = 'absolute'
//           selectElement.tabIndex = -1
//         }
//       }

//       document.body.style.top = '0px'

//       const notifications = document.querySelectorAll('.goog-te-banner-frame, .goog-te-banner-frame.skiptranslate')
//       notifications.forEach(notif => notif.remove())

//       if (document.body.style.position === 'relative') {
//         document.body.style.position = 'static'
//       }
//     }

//     const interval = setInterval(cleanGoogleBranding, 500)
//     const timeout = setTimeout(() => clearInterval(interval), 5000)

//     return () => {
//       clearInterval(interval)
//       clearTimeout(timeout)
//       const script = document.getElementById('google-translate-script')
//       if (script) script.remove()
//     }
//   }, [])

//   const handleLanguageChange = (langCode, langShort) => {
//     setCurrentLang(langShort)
//     setIsOpen(false)

//     const triggerTranslation = () => {
//       const selectElement = document.querySelector('#google_translate_element select')
//       if (selectElement) {
//         selectElement.value = langCode
//         selectElement.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }))
//         setTimeout(() => {
//           selectElement.value = langCode
//           selectElement.dispatchEvent(new Event('change', { bubbles: true }))
//         }, 100)
//       }
//     }

//     triggerTranslation()
//     setTimeout(triggerTranslation, 1000)
//   }

//   return (
//     <div className="relative">
//       <div id="google_translate_element" className="hidden"></div>

//       <div className="relative">
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className={`
//             flex items-center space-x-2 rounded-lg border border-gray-200 hover:border-[#00b1a5] hover:bg-[#00b1a5]/5 transition-all duration-300 bg-white/80 backdrop-blur-sm group
//             ${isMobile ? 'px-4 py-3 w-full justify-center' : 'px-3 py-2'}
//           `}
//           aria-label="Select language"
//         >
//           <Globe className={`text-gray-600 group-hover:text-[#00b1a5] transition-colors ${isMobile ? 'w-5 h-5' : 'w-4 h-4'}`} />
//           <span className={`font-medium text-gray-700 group-hover:text-[#00b1a5] transition-colors ${isMobile ? 'text-base' : 'text-sm'}`}>
//             {isMobile ? languages.find(lang => lang.short === currentLang)?.name || 'English' : currentLang}
//           </span>
//           <ChevronDown className={`text-gray-500 group-hover:text-[#00b1a5] transition-all duration-300 ${isOpen ? 'rotate-180' : ''} ${isMobile ? 'w-4 h-4' : 'w-3 h-3'}`} />
//         </button>

//         {isOpen && (
//           <div className={`
//             absolute top-full z-50 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200
//             ${isMobile ? 'left-0 right-0 mt-3 mx-4' : 'right-0 mt-2 w-44'}
//           `}>
//             {languages.map((lang) => (
//               <button
//                 key={lang.code}
//                 onClick={() => handleLanguageChange(lang.code, lang.short)}
//                 className={`
//                   w-full flex items-center space-x-3 text-left hover:bg-[#00b1a5]/10 transition-colors duration-200
//                   ${isMobile ? 'px-4 py-4' : 'px-4 py-3'}
//                   ${currentLang === lang.short ? 'bg-[#00b1a5]/5 text-[#00b1a5]' : 'text-gray-700'}
//                 `}
//               >
//                 <span className="text-lg">{lang.flag}</span>
//                 <div className="flex-1">
//                   <div className={`font-medium ${isMobile ? 'text-base' : 'text-sm'}`}>{lang.name}</div>
//                   <div className={`text-gray-500 ${isMobile ? 'text-sm' : 'text-xs'}`}>{lang.short}</div>
//                 </div>
//                 {currentLang === lang.short && (
//                   <div className="w-2 h-2 bg-[#00b1a5] rounded-full"></div>
//                 )}
//               </button>
//             ))}
//           </div>
//         )}
//       </div>

//       {isOpen && (
//         <div 
//           className="fixed inset-0 z-40" 
//           onClick={() => setIsOpen(false)}
//         ></div>
//       )}

//       <style jsx global>{`
//         .goog-te-banner-frame,
//         .goog-te-ftab,
//         .goog-logo-link,
//         .goog-te-gadget span:first-child,
//         .goog-te-combo {
//           display: none !important;
//         }

//         #google_translate_element {
//           opacity: 0 !important;
//           position: absolute !important;
//           left: -9999px !important;
//           width: 1px !important;
//           height: 1px !important;
//           overflow: hidden !important;
//         }

//         body {
//           top: 0 !important;
//         }
//       `}</style>
//     </div>
//   )
// }
