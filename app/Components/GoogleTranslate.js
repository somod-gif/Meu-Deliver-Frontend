"use client";

import { useEffect, useState } from "react";
import { Globe } from "lucide-react";

export default function GoogleTranslate({
  className = "",
  variant = "default", // 'default' | 'compact' | 'icon-only'
  languages = "en,pt,fr,es",
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("");

  const setupLanguageChangeListener = () => {
    const observer = new MutationObserver(() => {
      const languageSpan = document.querySelector(
        ".goog-te-menu-value span:last-child"
      );
      if (languageSpan) {
        setCurrentLanguage(languageSpan.textContent);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true,
    });

    return () => observer.disconnect();
  };

  const applyCustomStyles = () => {
    const styleId = "google-translate-styles";
    if (document.getElementById(styleId)) return;

    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      .goog-te-banner-frame { display: none !important; }
      body { top: 0px !important; }

      .goog-te-gadget {
        font-family: 'Inter', sans-serif !important;
        width: fit-content !important;
        height: fit-content !important;
      }

      .goog-te-gadget-simple {
        background: transparent !important;
        border: 1px solid teal !important;
        padding: 8px 12px !important;
        cursor: pointer !important;
        display: flex !important;
        align-items: center !important;
        gap: 6px !important;
        border-radius: 8px !important;
        transition: all 0.2s ease !important;
        width: fit-content !important;
        height: fit-content !important;
        min-width: 120px !important;
        min-height: 40px !important;
      }

      .goog-te-gadget-simple:hover {
        border-color: teal !important;
        background-color: #F9FAFB !important;
      }

      .goog-te-menu-value {
        width: fit-content !important;
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        flex: 1 !important;
      }

      .goog-te-menu-value span:first-child { display: none !important; }

      .goog-te-menu-value span:last-child {
        color: teal !important;
        font-size: ${variant === "icon-only" ? "0" : "0.875rem"} !important;
        font-weight: 500 !important;
        white-space: nowrap !important;
      }

      .goog-te-menu-frame {
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
                    0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
        border-radius: 8px !important;
        border: 1px solid teal !important;
        margin-top: 8px !important;
        width: fit-content !important;
        min-width: 160px !important;
        max-width: 200px !important;
        z-index: 9999 !important;
        position: absolute !important;
        background-color: white !important;
      }

      .goog-te-menu2 {
        background-color: white !important;
        border-radius: 8px !important;
        max-height: 300px !important;
        padding: 4px 0 !important;
        overflow-y: auto !important;
        width: fit-content !important;
      }

      .goog-te-menu2-item {
        padding: 8px 16px !important;
        font-size: 0.875rem !important;
        color: teal !important;
        cursor: pointer !important;
        transition: background-color 0.15s ease !important;
        white-space: nowrap !important;
      }

      .goog-te-menu2-item:hover {
        background-color: #e0f2f1 !important;
      }

      .goog-te-menu2-item-selected {
        background-color: teal !important;
        color: white !important;
      }

      .goog-te-gadget a { display: none !important; }
    `;
    document.head.appendChild(style);
  };

  const initializeTranslate = () => {
    try {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: languages,
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        "google-translate-element"
      );

      setIsLoaded(true);
      applyCustomStyles();
      setupLanguageChangeListener();
    } catch (error) {
      console.error("Google Translate initialization error:", error);
    }
  };

  useEffect(() => {
    if (window.google?.translate?.TranslateElement) {
      initializeTranslate();
      return;
    }

    const existingScript = document.getElementById("google-translate-script");
    if (existingScript) return;

    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateInit";
    script.async = true;

    script.onload = () => {
      window.googleTranslateInit = initializeTranslate;
    };

    document.head.appendChild(script);

    return () => {
      if (window.googleTranslateInit) {
        delete window.googleTranslateInit;
      }
    };
  }, []);
  return (
    <div className={`flex items-center ${className}`}>
      {variant === "icon-only" ? (
        <button
          className="p-2 hover:bg-gray-50 rounded-lg"
          aria-label="Change language"
          onClick={() =>
            document.querySelector(".goog-te-gadget-simple")?.click()
          }
        >
          <Globe className="w-6 h-6 text-[#00b1a5]" />
        </button>
      ) : (
        <div id="google-translate-element" className="min-w-[60px]"></div>
      )}
    </div>
  );
}
