import {
	useScrollAnimation,
	useStaggerAnimation,
} from '@/hooks/useGsapAnimation'
import { Code2, Globe, Palette, Rocket, Terminal, Zap } from 'lucide-react'
import SkillBar from '../features/SkillBar'

const Skills = () => {
	const titleRef = useScrollAnimation('slideUp')
	const barsRef = useScrollAnimation('fadeIn')
	const cardsRef = useStaggerAnimation()
	const techStackRef = useStaggerAnimation()

	const mainSkills = [
		{ name: 'React & Next.js', level: 90 },
		{ name: 'Angular', level: 85 },
		{ name: 'TypeScript', level: 90 },
		{ name: 'State Management (Redux, NgRx, Zustand)', level: 85 },
		{ name: 'UI Libraries (Material UI, Tailwind)', level: 90 },
		{ name: 'GraphQL & REST APIs', level: 80 },
		{ name: 'Build Tools (Vite, Webpack)', level: 85 },
		{ name: 'Git & DevOps', level: 80 },
	]

	const techStack = {
		react: {
			icon: Terminal,
			title: 'React Ecosystem',
			gradient: 'from-blue-500 to-cyan-500',
			technologies: [
				'React 19',
				'Next.js 15',
				'Redux Toolkit',
				'Zustand',
				'TanStack Query',
				'React Router v7',
				'React Hook Form',
				'Zod',
				'Recharts',
				'Framer Motion',
			],
		},
		angular: {
			icon: Code2,
			title: 'Angular Ecosystem',
			gradient: 'from-red-500 to-pink-500',
			technologies: [
				'Angular 19',
				'NgRx',
				'RxJS 8',
				'Angular Material',
				'Angular Signals',
				'Standalone Components',
				'Angular SSR',
				'Angular CDK',
			],
		},
		styling: {
			icon: Palette,
			title: 'UI & Styling',
			gradient: 'from-purple-500 to-pink-500',
			technologies: [
				'Tailwind CSS v4',
				'Material UI',
				'Shadcn/ui',
				'Ant Design',
				'Angular Material',
				'CSS Modules',
				'Styled Components',
				'SCSS/SASS',
			],
		},
		backend: {
			icon: Globe,
			title: 'Backend & APIs',
			gradient: 'from-green-500 to-emerald-500',
			technologies: [
				'Apollo GraphQL',
				'REST APIs',
				'tRPC',
				'Axios',
				'Fetch API',
				'WebSockets',
				'Server Actions',
				'Prisma',
			],
		},
		tools: {
			icon: Zap,
			title: 'Build Tools & Dev',
			gradient: 'from-orange-500 to-amber-500',
			technologies: [
				'Vite 6',
				'Webpack 5',
				'Turbopack',
				'ESLint 9',
				'Prettier',
				'Biome',
				'npm/pnpm/bun',
				'TypeScript 5',
			],
		},
		other: {
			icon: Rocket,
			title: 'Testing & DevOps',
			gradient: 'from-indigo-500 to-purple-500',
			technologies: [
				'Vitest',
				'Jest',
				'Playwright',
				'Testing Library',
				'Git',
				'Docker',
				'CI/CD',
				'Vercel/Netlify',
			],
		},
	}

	return (
		<section className='relative pt-20 pb-8 bg-gradient-to-b from-background via-background to-background/95 overflow-hidden'>
			{/* Декоративные элементы фона */}
			<div className='absolute inset-0 overflow-hidden pointer-events-none'>
				<div className='absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse' />
				<div className='absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000' />
				<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/5 to-accent/5 rounded-full blur-3xl' />
			</div>

			<div className='container mx-auto px-4 relative z-10'>
				<div className='max-w-6xl mx-auto'>
					<div ref={titleRef} className='text-center mb-16'>
						<h2 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent'>
							{'<Навыки/>'}
						</h2>
						<p className='text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto'>
							Полный стек современных технологий для создания масштабируемых
							приложений
						</p>

						{/* Декоративная линия */}
						<div className='flex items-center justify-center gap-3 mt-6'>
							<div className='h-px w-12 sm:w-20 bg-gradient-to-r from-transparent to-primary/50' />
							<Zap className='w-5 h-5 text-primary animate-pulse' />
							<div className='h-px w-12 sm:w-20 bg-gradient-to-l from-transparent to-primary/50' />
						</div>
					</div>

					{/* Основные навыки с прогресс-барами */}
					<div className='mb-20 max-w-4xl mx-auto'>
						<h3
							ref={barsRef}
							className='text-2xl sm:text-3xl font-semibold mb-8 text-center bg-gradient-primary bg-clip-text text-transparent'
						>
							Ключевые компетенции
						</h3>
						<div ref={barsRef} className='space-y-6'>
							{mainSkills.map((skill, index) => (
								<SkillBar
									key={skill.name}
									skill={skill.name}
									percentage={skill.level}
									delay={index * 100}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Skills
