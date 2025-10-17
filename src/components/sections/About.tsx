import {useScrollAnimation, useStaggerAnimation,} from '@/hooks/useGsapAnimation'
import {
	Award,
	BookOpen,
	CheckCircle2,
	Code2,
	Coffee,
	Gamepad2,
	Globe,
	Heart,
	Lightbulb,
	Music,
	Palette,
	Rocket,
	Sparkles,
	Star,
	Target,
	Terminal,
	Users,
	Zap,
} from 'lucide-react'
import {Link} from 'react-router-dom'

const About = () => {
	const titleRef = useScrollAnimation('slideUp')
	const headerRef = useScrollAnimation('fadeIn')
	const textRef = useScrollAnimation('fadeIn')
	const cardsRef = useStaggerAnimation()
	const statsRef = useStaggerAnimation()
	const interestsRef = useScrollAnimation('fadeIn')
	const skillsRef = useStaggerAnimation()
	const valuesRef = useStaggerAnimation()

	const features = [
		{
			icon: Code2,
			title: 'Чистый код',
			description:
				'Пишу понятный и масштабируемый код, следуя best practices и SOLID принципам',
			gradient: 'from-blue-500 to-cyan-500',
		},
		{
			icon: Palette,
			title: 'UI/UX фокус',
			description:
				'Создаю интуитивные и красивые интерфейсы с вниманием к деталям',
			gradient: 'from-purple-500 to-pink-500',
		},
		{
			icon: Rocket,
			title: 'Быстрое обучение',
			description: 'Постоянно изучаю новые технологии и совершенствую навыки',
			gradient: 'from-green-500 to-emerald-500',
		},
	]

	const stats = [
		{
			icon: Coffee,
			value: '500+',
			label: 'Чашек кофе',
			gradient: 'from-amber-500 to-orange-500',
			bg: 'bg-amber-500/10',
		},
		{
			icon: Zap,
			value: '20+',
			label: 'Проектов',
			gradient: 'from-blue-500 to-cyan-500',
			bg: 'bg-blue-500/10',
		},
		{
			icon: Target,
			value: '100%',
			label: 'Мотивации',
			gradient: 'from-green-500 to-emerald-500',
			bg: 'bg-green-500/10',
		},
		{
			icon: Award,
			value: '25+',
			label: 'Технологий',
			gradient: 'from-purple-500 to-pink-500',
			bg: 'bg-purple-500/10',
		},
	]

	const interests = [
		{
			icon: BookOpen,
			label: 'Чтение технической литературы',
			gradient: 'from-blue-500 to-cyan-500',
		},
		{
			icon: Music,
			label: 'Музыка во время кодинга',
			gradient: 'from-purple-500 to-pink-500',
		},
		{
			icon: Gamepad2,
			label: 'Игры для вдохновения UI',
			gradient: 'from-green-500 to-emerald-500',
		},
		{
			icon: Heart,
			label: 'Open Source проекты',
			gradient: 'from-red-500 to-rose-500',
		},
	]

	const skills = [
		{ name: 'React & TypeScript', level: 90, icon: Terminal },
		{ name: 'Angular & TypeScript', level: 85, icon: Code2 },
		{ name: 'State Management (Redux, NgRx)', level: 85, icon: Zap },
		{ name: 'UI Libraries & Frameworks', level: 90, icon: Palette },
		{ name: 'GraphQL & REST APIs', level: 80, icon: Globe },
		{ name: 'Build Tools (Vite, Webpack)', level: 85, icon: Rocket },
	]

	const techStack = {
		react: [
			'React 19',
			'Redux Toolkit',
			'Zustand',
			'TanStack Query',
			'React Router v7',
			'Zod',
			'React Hook Form',
			'Recharts',
			'Framer Motion',
		],
		angular: [
			'Angular 19',
			'NgRx',
			'RxJS 8',
			'Angular Material',
			'Angular Signals',
			'Standalone Components',
			'Angular Universal',
		],
		styling: [
			'Tailwind CSS v4',
			'Material UI',
			'shadcn/ui',
			'CSS Modules',
			'Styled Components',
		],
		backend: [
			'Apollo GraphQL',
			'tRPC',
			'Prisma',
			'Drizzle ORM',
			'REST APIs',
			'WebSockets',
		],
		tools: [
			'Vite 6',
			'Webpack 5',
			'Turbopack',
			'ESLint 9',
			'Biome',
			'Vitest',
			'Playwright',
			'Docker',
		],
	}

	const values = [
		{
			icon: Lightbulb,
			title: 'Инновации',
			description: 'Постоянный поиск лучших решений',
		},
		{
			icon: Users,
			title: 'Командная работа',
			description: 'Сотрудничество и обмен знаниями',
		},
		{
			icon: CheckCircle2,
			title: 'Качество',
			description: 'Внимание к деталям в каждом проекте',
		},
	]

	return (
		<section className='relative py-20 bg-gradient-to-b from-background via-background to-background/95 overflow-hidden'>
			{/* Декоративные элементы фона */}
			<div className='absolute inset-0 overflow-hidden pointer-events-none'>
				<div className='absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse' />
				<div className='absolute top-1/3 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000' />
				<div className='absolute bottom-1/4 left-1/3 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse delay-2000' />
			</div>

			<div className='container mx-auto px-4 relative z-10'>
				<div className='max-w-6xl mx-auto'>
					{/* Hero секция (оригинальная из AboutPage) */}
					<div className='mb-12'>
						<div ref={headerRef} className='max-w-4xl mx-auto text-center'>
							{/* Заголовок */}
							<h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight'>
								<span className='block mb-2 bg-gradient-primary bg-clip-text text-transparent'>
									{"<Обо мне/>"}
								</span>
							</h1>

							{/* Описание */}
							<p className='text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8'>
								Frontend разработчик, специализирующийся на{' '}
								<strong>React</strong> и <strong>Angular</strong>, создаю
								красивые и функциональные веб-приложения
							</p>

							{/* Декоративная линия */}
							<div className='flex items-center justify-center gap-3 mb-8'>
								<div className='h-px w-12 sm:w-20 bg-gradient-to-r from-transparent to-primary/50' />
								<Sparkles className='w-5 h-5 text-primary animate-pulse' />
								<div className='h-px w-12 sm:w-20 bg-gradient-to-l from-transparent to-primary/50' />
							</div>

							{/* Статистика быстрого просмотра */}
							<div className='grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto'>
								{[
									{ value: '1+', label: 'Года опыта' },
									{ value: '20+', label: 'Проектов' },
									{ value: '20+', label: 'Технологий' },
									{ value: '100%', label: 'Энтузиазма' },
								].map((stat, index) => (
									<div
										key={index}
										className='smooth-scale p-4 bg-gradient-card backdrop-blur-sm rounded-xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:scale-105'
									>
										<div className='text-2xl sm:text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-1'>
											{stat.value}
										</div>
										<div className='text-xs sm:text-sm text-muted-foreground'>
											{stat.label}
										</div>
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Основная информация */}
					<div ref={textRef} className='mb-20'>
						<div className='max-w-4xl mx-auto'>
							{/* Главное описание */}
							<div className='bg-gradient-card backdrop-blur-sm p-8 sm:p-10 rounded-2xl border border-border/50 shadow-xl mb-12'>
								<div className='flex items-start gap-4 mb-6'>
									<div className='w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg'>
										<Sparkles className='w-6 h-6 sm:w-7 sm:h-7 text-white' />
									</div>
									<div className='flex-1'>
										<h3 className='text-2xl sm:text-3xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent'>
											Привет! Я Артём
										</h3>
										<p className='text-muted-foreground'>
											Junior Frontend Developer
										</p>
									</div>
								</div>
								<div className='space-y-4 text-base sm:text-lg text-foreground/80 leading-relaxed'>
									<p>
										🚀 Создаю современные веб-приложения, которые не только
										отлично работают, но и приятны в использовании. Моя
										специализация —{' '}
										<span className='text-primary font-semibold'>React</span> и{' '}
										<span className='text-primary font-semibold'>Angular</span>с
										полным стеком современных инструментов.
									</p>
									<p>
										💡 Работаю с экосистемой React (Redux Toolkit, Zustand,
										TanStack Query) и Angular (NgRx, RxJS, Angular Signals).
										Пишу типобезопасный код на
										<strong> TypeScript</strong>, использую GraphQL и REST API.
									</p>
									<p>
										🎨 Создаю красивые интерфейсы с помощью Tailwind CSS,
										Material UI, Shadcn/ui. Настраиваю современную сборку (Vite,
										Webpack) и слежу за качеством кода.
									</p>
									<p>
										✨ Стремлюсь писать чистый, понятный код и постоянно изучаю
										новые технологии. Готов к новым вызовам и росту в команде
										профессионалов!
									</p>
								</div>
							</div>

							{/* Карточки особенностей */}
							<div ref={cardsRef} className='grid sm:grid-cols-3 gap-6 mb-12'>
								{features.map((feature, index) => {
									const Icon = feature.icon
									return (
										<div
											key={index}
											className='group relative overflow-hidden bg-gradient-card backdrop-blur-sm p-6 rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:scale-[1.02]'
										>
											<div
												className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500`}
											/>
											<div className='relative z-10'>
												<div
													className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
												>
													<Icon className='w-6 h-6 text-white' />
												</div>
												<h3 className='text-xl font-semibold mb-2'>
													{feature.title}
												</h3>
												<p className='text-sm text-muted-foreground'>
													{feature.description}
												</p>
											</div>
										</div>
									)
								})}
							</div>
						</div>
					</div>

					{/* Ценности */}
					<div ref={valuesRef} className='mb-20'>
						<div className='text-center mb-12'>
							<h3 className='text-3xl sm:text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent'>
								{'<Мои ценности/>'}
							</h3>
							<p className='text-muted-foreground max-w-2xl mx-auto'>
								Принципы, которыми я руководствуюсь в работе
							</p>
						</div>
						<div className='grid md:grid-cols-3 gap-6 max-w-5xl mx-auto'>
							{values.map((value, index) => {
								const Icon = value.icon
								return (
									<div
										key={index}
										className='group bg-gradient-card backdrop-blur-sm p-8 rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl text-center'
									>
										<div className='w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300'>
											<Icon className='w-8 h-8 text-primary' />
										</div>
										<h4 className='text-xl font-semibold mb-2'>
											{value.title}
										</h4>
										<p className='text-sm text-muted-foreground'>
											{value.description}
										</p>
									</div>
								)
							})}
						</div>
					</div>

					{/* Интересы */}
					<div ref={interestsRef} className='max-w-4xl mx-auto'>
						<div className='text-center mb-12'>
							<h3 className='text-3xl sm:text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent'>
								{'<Вне кода/>'}
							</h3>
							<p className='text-muted-foreground'>
								Что вдохновляет меня помимо разработки
							</p>
						</div>
						<div className='grid sm:grid-cols-2 gap-4'>
							{interests.map((interest, index) => {
								const Icon = interest.icon
								return (
									<div
										key={index}
										className='group relative overflow-hidden bg-gradient-card backdrop-blur-sm p-6 rounded-xl border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300'
									>
										<div className='flex items-center gap-4'>
											<div
												className={`w-12 h-12 bg-gradient-to-br ${interest.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}
											>
												<Icon className='w-6 h-6 text-white' />
											</div>
											<span className='text-foreground/80 font-medium group-hover:text-primary transition-colors'>
												{interest.label}
											</span>
										</div>
										<div
											className={`absolute inset-0 bg-gradient-to-br ${interest.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
										/>
									</div>
								)
							})}
						</div>
					</div>

					{/* Призыв к действию */}
					<div className='mt-20 text-center'>
						<div className='bg-gradient-card backdrop-blur-sm p-8 sm:p-12 rounded-2xl border border-primary/20 shadow-xl max-w-3xl mx-auto'>
							<Star className='w-12 h-12 text-primary mx-auto mb-4 animate-pulse' />
							<h3 className='text-2xl sm:text-3xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent'>
								Давайте создадим что-то вместе!
							</h3>
							<p className='text-muted-foreground mb-6 max-w-xl mx-auto'>
								Я открыт для новых проектов и сотрудничества. Если у вас есть
								интересная задача или вы просто хотите поговорить о технологиях
								— свяжитесь со мной!
							</p>
							<div className='flex flex-wrap justify-center gap-4'>
								<Link
									to='/contact'
									className='flex items-center px-6 justify-center w-[220px] py-[15px] gap-2 bg-gradient-to-r from-primary via-accent to-primary bg-size-200 hover:bg-pos-100 text-white font-semibold rounded-xl transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-primary/50'
								>
									<CheckCircle2 className='w-5 h-5' />
									Связаться со мной
								</Link>
								<Link
									to='/projects'
									className='flex items-center justify-center px-6 w-[220px] py-[15px] gap-2 bg-gradient-card border border-primary/30 hover:border-primary/50 font-semibold rounded-xl transition-all duration-500 bg-size-200 hover:scale-105 hover:shadow-lg text-white'
								>
									<Rocket className='w-5 h-5 text-primary' />
									 Мои проекты
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default About
