import {Badge} from '@/components/ui/badge'
import {Button} from '@/components/ui/button'
import {useScrollAnimation, useStaggerAnimation,} from '@/hooks/useGsapAnimation'
import {useTilt} from '@/hooks/useTilt'
import {Briefcase, Code2, ExternalLink, Github} from 'lucide-react'
import {useState} from 'react'
import ProjectModal from '../features/ProjectModal'
import quizImg from '@/assets/projects/quiz.png'

const ProjectCard = ({ project, index, onClick }: any) => {
	const tiltRef = useTilt({ max: 10, scale: 1.02 })

	return (
		<div
			ref={tiltRef}
			className='group bg-card/50 backdrop-blur-md rounded-2xl border border-border/50 overflow-hidden hover:border-primary/50 hover:bg-card/60 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 cursor-pointer flex flex-col relative'
			style={{
				transformStyle: 'preserve-3d',
			}}
			onClick={onClick}
		>
			<div className='relative h-52 overflow-hidden bg-secondary/20'>
				<img
					src={project.image}
					alt={project.title}
					className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700'
					loading='lazy'
					onError={e => {
						const target = e.target as HTMLImageElement
						target.src = `https://placehold.co/800x600/1e293b/64748b?text=${encodeURIComponent(
							project.title
						)}`
					}}
				/>
				<div className='absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-sm'>
					<div className='text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300'>
						<div className='inline-flex items-center gap-2 px-4 py-2 bg-primary/90 text-primary-foreground rounded-full font-semibold text-sm shadow-lg'>
							<Code2 className='w-4 h-4' />
							Подробнее
						</div>
					</div>
				</div>
			</div>

			<div className='p-6 flex flex-col flex-1'>
				<h3 className='text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-1'>
					{project.title}
				</h3>
				<p className='text-muted-foreground mb-4 text-sm leading-relaxed flex-grow line-clamp-2'>
					{project.description}
				</p>

				<div className='flex flex-wrap gap-2 mb-5'>
					{project.tags.slice(0, 3).map((tag: string, tagIndex: number) => (
						<Badge
							key={tagIndex}
							variant='secondary'
							className='text-xs px-2.5 py-1 bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors'
						>
							{tag}
						</Badge>
					))}
					{project.tags.length > 3 && (
						<Badge
							variant='secondary'
							className='text-xs px-2.5 py-1 bg-secondary text-secondary-foreground'
						>
							+{project.tags.length - 3}
						</Badge>
					)}
				</div>

				<div className='flex gap-3 mt-auto pt-4 border-t border-border/50'>
					<Button
						size='sm'
						variant='outline'
						className='flex-1 border-primary/30 hover:bg-primary/10 hover:border-primary/50 smooth-scale hover:scale-105'
						onClick={e => {
							e.stopPropagation()
							window.open(project.github, '_blank')
						}}
					>
						<Github className='w-4 h-4 mr-2' />
						Code
					</Button>
					<Button
						size='sm'
						className='flex-1 bg-gradient-primary hover:opacity-90 shadow-lg shadow-primary/20 smooth-scale hover:scale-105'
						onClick={e => {
							e.stopPropagation()
							window.open(project.demo, '_blank')
						}}
					>
						<ExternalLink className='w-4 h-4 mr-2' />
						Demo
					</Button>
				</div>
			</div>
		</div>
	)
}

const Projects = () => {
	const [selectedProject, setSelectedProject] = useState<number | null>(null)
	const [filter, setFilter] = useState<string>('All')
	const titleRef = useScrollAnimation('slideUp')
	const filterRef = useScrollAnimation('fadeIn')
	const projectsRef = useStaggerAnimation()

	const projects = [



		{
			title: 'Quiz Fullstack',
			description: 'Полноценное приложение для создания и прохождения онлайн-викторин',
			fullDescription:
				'Quiz Fullstack — это современное fullstack-приложение для создания, редактирования и прохождения викторин. Реализована регистрация пользователей, создание собственных тестов, прохождение чужих викторин, подсчет результатов и рейтинг. Используются современные технологии фронтенда и бэкенда.',
			tags: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Fullstack'],
			image:
			quizImg,
			github: 'https://github.com/CyberArt2718281/quiz-fullstack',
			demo: '',
			features: [
				'Регистрация и авторизация пользователей',
				'Создание и редактирование викторин',
				'Прохождение тестов и подсчет результатов',
				'Рейтинг пользователей',
				'Адаптивный дизайн',
			],
		}

		,
		{
			title: 'Crypto Site',
			description: 'Современный сайт для отслеживания криптовалют с графиками и поиском',
			fullDescription:
				'Crypto Site — это современное SPA-приложение на React и TypeScript для мониторинга криптовалют. Реализован поиск, подробная информация по монетам, интерактивные графики, сортировка и фильтрация. Используется CoinGecko API, реализована адаптивная верстка и тёмная тема. Проект оптимизирован для быстрой загрузки и удобства пользователя.',
			tags: ['React', 'TypeScript', 'Tailwind CSS', 'CoinGecko API', 'Chart.js', 'Vite'],
			image:
				'https://raw.githubusercontent.com/CyberArt2718281/crypto-site/main/public/preview.png',
			github: 'https://github.com/CyberArt2718281/crypto-site',
			demo: 'https://crypto-site-lilac.vercel.app/',
			features: [
				'Поиск и фильтрация криптовалют',
				'Просмотр подробной информации о монетах',
				'Интерактивные графики цен',
				'Сортировка по капитализации, цене и изменению',
				'Адаптивный дизайн',
			],
		},

		{
			title: 'Posts Platform',
			description: 'Платформа для публикации и обсуждения постов',
			fullDescription:
				'Posts Platform — это современное веб-приложение для создания, публикации и обсуждения постов. Пользователи могут регистрироваться, создавать собственные публикации, комментировать и лайкать посты других участников. Реализованы фильтрация, поиск, адаптивный дизайн и удобный интерфейс.',
			tags: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Vite'],
			image:
				'https://raw.githubusercontent.com/ArtemFrontStack/posts-platform/main/public/preview.png',
			github: 'https://github.com/ArtemFrontStack/posts-platform',
			demo: 'https://posts-platform.vercel.app/',
			features: [
				'Публикация и редактирование постов',
				'Комментарии и лайки',
				'Регистрация и авторизация',
				'Поиск и фильтрация публикаций',
				'Адаптивный дизайн',
			],
		}
	
	]

	const allTags = ['All', ...Array.from(new Set(projects.flatMap(p => p.tags)))]
	const filteredProjects =
		filter === 'All' ? projects : projects.filter(p => p.tags.includes(filter))

	return (
		<section
			id='projects'
			className='py-20 bg-gradient-subtle relative overflow-hidden'
		>
			{/* Декоративные элементы фона */}
			<div className='absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2' />
			<div className='absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2' />

			<div className='container mx-auto px-4 relative z-10'>
				<div className='max-w-6xl mx-auto'>
					<div ref={titleRef} className='text-center mb-12'>
						<h2 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent'>
							{'<Проекты/>'}
						</h2>
						<p className='text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto'>
							Коллекция проектов, демонстрирующих навыки разработки современных
							веб-приложений
						</p>

						{/* Декоративная линия */}
						<div className='flex items-center justify-center gap-3 mt-6'>
							<div className='h-px w-12 sm:w-20 bg-gradient-to-r from-transparent to-primary/50' />
							<Briefcase className='w-5 h-5 text-primary animate-pulse' />
							<div className='h-px w-12 sm:w-20 bg-gradient-to-l from-transparent to-primary/50' />
						</div>
					</div>

					{/* Filter buttons */}
					<div
						ref={filterRef}
						className='flex flex-wrap justify-center gap-2 mb-10'
					>
						{allTags.map(tag => (
							<button
								key={tag}
								onClick={() => setFilter(tag)}
								className={`px-4 py-2 rounded-full text-sm font-medium transition-all smooth-scale hover:scale-105 ${
									filter === tag
										? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
										: 'bg-secondary hover:bg-secondary/80 text-secondary-foreground'
								}`}
							>
								{tag === 'All' ? 'Все' : tag}
							</button>
						))}
					</div>

					<div
						ref={projectsRef}
						className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-8'
					>
						{filteredProjects.map((project, index) => (
							<ProjectCard
								key={index}
								project={project}
								index={index}
								onClick={() => setSelectedProject(index)}
							/>
						))}
					</div>

					{selectedProject !== null && (
						<ProjectModal
							project={projects[selectedProject]}
							isOpen={selectedProject !== null}
							onClose={() => setSelectedProject(null)}
						/>
					)}
				</div>
			</div>
		</section>
	)
}

export default Projects
