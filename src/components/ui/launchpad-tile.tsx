import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface LaunchpadTileProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

export function LaunchpadTile({ 
  title, 
  subtitle, 
  icon: Icon, 
  onClick, 
  className,
  disabled = false 
}: LaunchpadTileProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "group relative p-6 bg-card rounded-lg border transition-all duration-200",
        "hover:shadow-fiori hover:scale-[1.02] hover:border-primary/30",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
        "min-h-[120px] w-full max-w-[280px]",
        className
      )}
    >
      <div className="flex flex-col items-center text-center space-y-3">
        <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {subtitle}
          </p>
        </div>
      </div>
    </button>
  );
}