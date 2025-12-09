import { useEffect, useRef, useState } from 'react';
import { Code, Coffee, Rocket, Users } from 'lucide-react';
import { useScrollAnimation, useStaggerAnimation } from '@/hooks/useGsapAnimation';

const Stats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const titleRef = useScrollAnimation('slideUp');
  const gridRef = useStaggerAnimation();

  const stats = [
    {
      icon: Code,
      end: 50,
      suffix: '+',
      label: 'Проектов',
      color: 'text-blue-500',
    },
    {
      icon: Coffee,
      end: 1000,
      suffix: '+',
      label: 'Чашек кофе',
      color: 'text-amber-500',
    },
    {
      icon: Rocket,
      end: 3,
      suffix: '+',
      label: 'Года опыта',
      color: 'text-purple-500',
    },
    {
      icon: Users,
      end: 20,
      suffix: '+',
      label: 'Довольных клиентов',
      color: 'text-green-500',
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 bg-gradient-card relative overflow-hidden">
      {/* Декоративный фон */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div ref={titleRef} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              {"<Достижения/>"}
            </h2>
            <p className="text-xl text-muted-foreground">
              Цифры, которые говорят сами за себя
            </p>
          </div>

          <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} ref={statsRef}>
                <StatCounter
                  {...stat}
                  isVisible={isVisible}
                  delay={index * 100}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const StatCounter = ({ icon: Icon, end, suffix, label, color, isVisible, delay }: {
  icon: React.ComponentType<{ className?: string }>;
  end: number;
  suffix: string;
  label: string;
  color: string;
  isVisible: boolean;
  delay: number;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const increment = end / steps;
    let current = 0;

    const timer = setTimeout(() => {
      const counter = setInterval(() => {
        current += increment;
        if (current >= end) {
          setCount(end);
          clearInterval(counter);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(counter);
    }, delay);

    return () => clearTimeout(timer);
  }, [isVisible, end, delay]);

  return (
    <div className="group relative">
      <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border hover:border-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-xl text-center">
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4 ${color} group-hover:scale-110 transition-transform`}>
          <Icon className="w-8 h-8" />
        </div>
        <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
          {count}{suffix}
        </div>
        <div className="text-muted-foreground font-medium">{label}</div>
      </div>
      
      {/* Декоративный элемент */}
      <div className="absolute -inset-1 bg-gradient-primary rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity blur-xl -z-10"></div>
    </div>
  );
};

export default Stats;
