import { useEffect, useState, useRef, memo } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface SkillBarProps {
  skill: string;
  percentage: number;
  delay?: number;
}

const SkillBar = memo(({ skill, percentage, delay = 0 }: SkillBarProps) => {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useScrollAnimation(ref);

  useEffect(() => {
    if (isVisible) {
      const timeout = setTimeout(() => {
        setWidth(percentage);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [isVisible, percentage, delay]);

  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium">{skill}</span>
        <span className="text-sm text-muted-foreground">{percentage}%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-primary transition-all duration-1000 ease-out rounded-full"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
});

SkillBar.displayName = 'SkillBar';

export default SkillBar;
