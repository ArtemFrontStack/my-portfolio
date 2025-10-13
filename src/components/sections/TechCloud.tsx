import {
	useScrollAnimation,
	useStaggerAnimation,
} from '@/hooks/useGsapAnimation'
import { useState } from 'react'

const TechCloud = () => {
	const [hoveredTech, setHoveredTech] = useState<string | null>(null)
	const titleRef = useScrollAnimation('slideUp')
	const cloudRef = useStaggerAnimation()

	const technologies = [
		// React & Next.js
		{
			name: 'React',
			level: 'expert',
			size: 'text-2xl sm:text-3xl md:text-4xl',
			color: 'text-[#61DAFB]',
		},
		{
			name: 'Next.js',
			level: 'advanced',
			size: 'text-xl sm:text-2xl md:text-3xl',
			color: 'text-white',
		},
		// Angular
		{
			name: 'Angular',
			level: 'advanced',
			size: 'text-xl sm:text-2xl md:text-3xl',
			color: 'text-[#DD0031]',
		},
		// TypeScript & JavaScript
		{
			name: 'TypeScript',
			level: 'expert',
			size: 'text-xl sm:text-2xl md:text-3xl',
			color: 'text-[#3178C6]',
		},
		{
			name: 'JavaScript',
			level: 'expert',
			size: 'text-xl sm:text-2xl md:text-3xl',
			color: 'text-[#F7DF1E]',
		},
		// State Management
		{
			name: 'Redux',
			level: 'advanced',
			size: 'text-lg sm:text-xl md:text-2xl',
			color: 'text-[#764ABC]',
		},

		{
			name: 'NgRx',
			level: 'advanced',
			size: 'text-base sm:text-lg md:text-xl',
			color: 'text-[#DD0031]',
		},
		{
			name: 'RxJS',
			level: 'advanced',
			size: 'text-base sm:text-lg md:text-xl',
			color: 'text-[#B7178C]',
		},
		{
			name: 'TanStack Query',
			level: 'advanced',
			size: 'text-base sm:text-lg md:text-xl',
			color: 'text-[#FF4154]',
		},
		// UI Libraries
		{
			name: 'Tailwind',
			level: 'expert',
			size: 'text-xl sm:text-2xl md:text-3xl',
			color: 'text-[#06B6D4]',
		},
		{
			name: 'Material UI',
			level: 'advanced',
			size: 'text-lg sm:text-xl md:text-2xl',
			color: 'text-[#007FFF]',
		},
		{
			name: 'Angular Material UI',
			level: 'advanced',
			size: 'text-base sm:text-lg md:text-xl',
			color: 'text-[#DD0031]',
		},
		{
			name: 'Ant Design',
			level: 'intermediate',
			size: 'text-base sm:text-lg md:text-xl',
			color: 'text-[#1890FF]',
		},
		// APIs & Data
		{
			name: 'GraphQL',
			level: 'advanced',
			size: 'text-lg sm:text-xl md:text-2xl',
			color: 'text-[#E10098]',
		},
		{
			name: 'REST API',
			level: 'expert',
			size: 'text-lg sm:text-xl md:text-2xl',
			color: 'text-green-400',
		},
		{
			name: 'tRPC',
			level: 'intermediate',
			size: 'text-base sm:text-lg md:text-xl',
			color: 'text-[#398CCB]',
		},
		{
			name: 'Axios',
			level: 'advanced',
			size: 'text-base sm:text-lg md:text-xl',
			color: 'text-[#5A29E4]',
		},
		{
			name: 'Socket.io',
			level: 'advanced',
			size: 'text-base sm:text-lg md:text-xl',
			color: 'text-[#3E67B1]',
		},

		// Build Tools
		{
			name: 'Vite',
			level: 'expert',
			size: 'text-xl sm:text-2xl md:text-3xl',
			color: 'text-[#646CFF]',
		},
		{
			name: 'Webpack',
			level: 'advanced',
			size: 'text-lg sm:text-xl md:text-2xl',
			color: 'text-[#8DD6F9]',
		},
		{
			name: 'Turbopack',
			level: 'intermediate',
			size: 'text-base sm:text-lg md:text-xl',
			color: 'text-[#0096FF]',
		},
		// Validation & Forms
		{
			name: 'Zod',
			level: 'advanced',
			size: 'text-base sm:text-lg md:text-xl',
			color: 'text-[#3E67B1]',
		},
		{
			name: 'React Hook Form',
			level: 'advanced',
			size: 'text-base sm:text-lg md:text-xl',
			color: 'text-[#EC5990]',
		},
		// Testing

		{
			name: 'Jest',
			level: 'advanced',
			size: 'text-xl sm:text-2xl md:text-3xl',
			color: 'text-[#2D3748]',
		},

		// Base Technologies
		{
			name: 'HTML5',
			level: 'expert',
			size: 'text-xl sm:text-2xl md:text-3xl',
			color: 'text-[#E34F26]',
		},
		{
			name: 'CSS3',
			level: 'expert',
			size: 'text-xl sm:text-2xl md:text-3xl',
			color: 'text-[#1572B6]',
		},
		{
			name: 'SCSS',
			level: 'advanced',
			size: 'text-base sm:text-lg md:text-xl',
			color: 'text-[#CC6699]',
		},
		// DevOps & Tools
		{
			name: 'Git',
			level: 'expert',
			size: 'text-xl sm:text-2xl md:text-3xl',
			color: 'text-[#F05032]',
		},
		{
			name: 'Docker',
			level: 'intermediate',
			size: 'text-base sm:text-lg md:text-xl',
			color: 'text-[#2496ED]',
		},

		// Animation & UI
		{
			name: 'Framer Motion',
			level: 'intermediate',
			size: 'text-base sm:text-lg md:text-xl',
			color: 'text-[#0055FF]',
		},

		// Backend (если есть опыт)
		{
			name: 'Node.js',
			level: 'intermediate',
			size: 'text-lg sm:text-xl md:text-2xl',
			color: 'text-[#339933]',
		},
		{
			name: 'Prisma',
			level: 'intermediate',
			size: 'text-base sm:text-lg md:text-xl',
			color: 'text-[#2D3748]',
		},
		// Design
		{
			name: 'Figma',
			level: 'intermediate',
			size: 'text-base sm:text-lg md:text-xl',
			color: 'text-[#F24E1E]',
		},
	]

	const getLevelLabel = (level: string) => {
		switch (level) {
			case 'expert':
				return '⭐⭐⭐'
			case 'advanced':
				return '⭐⭐'
			case 'intermediate':
				return '⭐'
			default:
				return '🌱'
		}
	}

	return (
		<section className='pt-8 pb-12 sm:pb-16 lg:pb-20 relative overflow-hidden'>
			{/* Фоновая анимация */}
			<div className='absolute inset-0 opacity-30'>
				<div className='absolute top-1/4 left-1/3 w-48 h-48 sm:w-64 sm:h-64 bg-primary/20 rounded-full blur-3xl animate-float'></div>
				<div
					className='absolute bottom-1/4 right-1/3 w-48 h-48 sm:w-64 sm:h-64 bg-accent/20 rounded-full blur-3xl animate-float'
					style={{ animationDelay: '1s' }}
				></div>
			</div>

			<div className='container mx-auto px-3 sm:px-4 relative z-10'>
				<div className='max-w-6xl mx-auto'>
					<div ref={titleRef} className='text-center mb-12 sm:mb-14 lg:mb-16'>
						<h2 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent'>
							{'<Технологии/>'}
						</h2>
						<p className='text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-6'>
							Инструменты, с которыми я работаю
						</p>

						<div className='flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm text-muted-foreground px-2'>
							<span className='whitespace-nowrap'>⭐⭐⭐ Expert</span>
							<span className='whitespace-nowrap'>⭐⭐ Advanced</span>
							<span className='whitespace-nowrap'>⭐ Intermediate</span>
							<span className='whitespace-nowrap'>🌱 Learning</span>
						</div>
					</div>

					{/* Облако технологий */}
					<div
						ref={cloudRef}
						className='relative min-h-[300px] sm:min-h-[400px] md:min-h-[500px] flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 px-2'
					>
						{technologies.map((tech, index) => (
							<div
								key={tech.name}
								className='group relative'
								style={{
									transform: `rotate(${Math.random() * 10 - 5}deg)`,
								}}
								onMouseEnter={() => setHoveredTech(tech.name)}
								onMouseLeave={() => setHoveredTech(null)}
								onTouchStart={() => setHoveredTech(tech.name)}
							>
								<div
									className={`
                  ${tech.size} font-bold
                  ${tech.color}
                  cursor-pointer
                  transition-all duration-300
                  hover:scale-125 hover:rotate-0
                  active:scale-110
                  ${hoveredTech === tech.name ? 'scale-125 rotate-0' : ''}
                  drop-shadow-lg
                  select-none
                `}
								>
									{tech.name}
								</div>

								{/* Tooltip */}
								{hoveredTech === tech.name && (
									<div className='absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 sm:px-3 py-1 bg-card border border-border rounded-lg text-xs sm:text-sm whitespace-nowrap animate-fade-in shadow-lg z-10'>
										<span className='text-foreground'>{tech.name}</span>
										<span className='ml-2'>{getLevelLabel(tech.level)}</span>
									</div>
								)}
							</div>
						))}
					</div>

					{/* Интерактивная подсказка */}
					<div className='text-center mt-8 sm:mt-10 lg:mt-12 text-muted-foreground text-xs sm:text-sm animate-pulse px-2'>
						<span className='hidden sm:inline'>
							Наведите на технологию, чтобы увидеть подробности
						</span>
						<span className='sm:hidden'>
							Нажмите на технологию для подробностей
						</span>
					</div>
				</div>
			</div>
		</section>
	)
}

export default TechCloud
