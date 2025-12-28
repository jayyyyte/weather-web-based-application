import { Cloud, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

export function Header({ isDark, onToggleTheme }: HeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
      <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-2">
        <Cloud className="w-10 h-10" />
        Weather Dashboard
      </h1>
      
      <button
        onClick={onToggleTheme}
        className="p-3 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition-all"
      >
        {isDark ? (
          <Sun className="w-6 h-6 text-yellow-300" />
        ) : (
          <Moon className="w-6 h-6 text-white" />
        )}
      </button>
    </div>
  );
}