import React from 'react';
import { Button } from '@/components/ui/button';
import { Layers, Target, Shield, Gavel } from 'lucide-react';

export type View = 'AI Landscape' | 'Pilot Prioritizer' | 'Risk Dashboard' | 'The Verdict';

interface NavigationProps {
  activeView: View;
  setActiveView: (view: View) => void;
  isPilotReady: boolean;
  isRiskReady: boolean;
  isVerdictReady: boolean;
}

const navItems: { view: View; label: string; icon: React.ElementType, key: string }[] = [
  { view: 'AI Landscape', label: 'AI Landscape', icon: Layers, key: 'ai-landscape' },
  { view: 'Pilot Prioritizer', label: 'Pilot Prioritizer', icon: Target, key: 'pilot-prioritizer' },
  { view: 'Risk Dashboard', label: 'Risk Dashboard', icon: Shield, key: 'risk-dashboard' },
  { view: 'The Verdict', label: 'The Verdict', icon: Gavel, key: 'the-verdict' },
];

const Navigation: React.FC<NavigationProps> = ({ activeView, setActiveView, isPilotReady, isRiskReady, isVerdictReady }) => {

  const isEnabled = (view: View) => {
    switch (view) {
      case 'AI Landscape':
        return true;
      case 'Pilot Prioritizer':
        return isPilotReady;
      case 'Risk Dashboard':
        return isRiskReady;
      case 'The Verdict':
        return isVerdictReady;
      default:
        return false;
    }
  }

  return (
    <nav className="bg-card border-b border-border shadow-sm">
      <div className="container mx-auto flex justify-center items-center p-2 space-x-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const disabled = !isEnabled(item.view);
          return (
            <Button
              key={item.key}
              variant={activeView === item.view ? 'secondary' : 'ghost'}
              onClick={() => setActiveView(item.view)}
              className="font-semibold"
              disabled={disabled}
              aria-disabled={disabled}
            >
              <Icon className="mr-2 h-5 w-5" />
              {item.label}
            </Button>
          )
        })}
      </div>
    </nav>
  );
};

export default Navigation;
