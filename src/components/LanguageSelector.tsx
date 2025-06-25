
import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'ur', name: 'اردو', flag: '🇵🇰' }
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <div className="fixed top-4 right-4 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="bg-slate-800/90 backdrop-blur-sm border-slate-600 text-gray-300 hover:bg-slate-700/90 hover:text-white h-10 px-3"
          >
            <Globe className="w-4 h-4 mr-2" />
            <span className="mr-1">{currentLanguage?.flag}</span>
            <span className="hidden sm:inline">{currentLanguage?.name}</span>
            <span className="sm:hidden">{currentLanguage?.code.toUpperCase()}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="end" 
          className="bg-slate-800/95 backdrop-blur-sm border-slate-600 z-[100]"
        >
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => setLanguage(lang.code as any)}
              className={`cursor-pointer text-gray-300 hover:bg-slate-700/50 hover:text-white focus:bg-slate-700/50 focus:text-white ${
                language === lang.code ? 'bg-purple-600/20 text-purple-300' : ''
              }`}
            >
              <span className="mr-2">{lang.flag}</span>
              {lang.name}
              {language === lang.code && (
                <span className="ml-auto text-purple-400">✓</span>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
