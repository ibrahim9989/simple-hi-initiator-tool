
import React from 'react';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'ur', name: 'اردو', flag: '🇵🇰' }
  ];

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="flex items-center gap-2 bg-slate-800/80 backdrop-blur-sm rounded-lg p-2 border border-slate-700">
        <Globe className="w-4 h-4 text-gray-400" />
        {languages.map((lang) => (
          <Button
            key={lang.code}
            onClick={() => setLanguage(lang.code as any)}
            variant={language === lang.code ? "default" : "ghost"}
            size="sm"
            className={`text-xs px-2 py-1 h-auto ${
              language === lang.code 
                ? 'bg-purple-600 text-white' 
                : 'text-gray-400 hover:text-white hover:bg-slate-700'
            }`}
          >
            <span className="mr-1">{lang.flag}</span>
            {lang.name}
          </Button>
        ))}
      </div>
    </div>
  );
};
