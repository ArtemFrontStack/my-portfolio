import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
	useScrollAnimation,
	useStaggerAnimation,
} from '@/hooks/useGsapAnimation'
import { useTilt } from '@/hooks/useTilt'
import { Briefcase, Code2, ExternalLink, Github } from 'lucide-react'
import { useState } from 'react'
import ProjectModal from '../features/ProjectModal'

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
			title: 'Portfolio Website',
			description:
				'Интерактивное портфолио с анимациями, темной темой и адаптивным дизайном',
			fullDescription:
				'Современное портфолио-сайт, построенное на React, TypeScript и Tailwind CSS. Включает плавные анимации при прокрутке, переключение темной/светлой темы, циклическую анимацию текста и полностью адаптивный дизайн. Оптимизировано для производительности с использованием Vite.',
			tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
			image:
				'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&auto=format&fit=crop&q=80',
			github: 'https://github.com/CyberArt2718281/portfolio',
			demo: '#',
			features: [
				'Циклическая анимация печатающегося текста',
				'Плавные анимации при скролле',
				'Адаптивный дизайн для всех устройств',
				'Модальные окна с деталями проектов',
				'Форма обратной связи',
			],
		},
		{
			title: 'React Todo App',
			description:
				'Многофункциональный менеджер задач с фильтрацией, поиском и темной темой',
			fullDescription:
				'Приложение для управления задачами с возможностью добавления, редактирования, удаления и отметки задач. Включает фильтрацию по статусу, поиск, сортировку и сохранение данных в Local Storage. Поддерживает темную и светлую темы.',
			tags: ['React', 'TypeScript', 'Local Storage', 'CSS Modules'],
			image:
				'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&auto=format&fit=crop&q=80',
			github: 'https://github.com/tastejs/todomvc',
			demo: 'https://todomvc.com/examples/react/',
			features: [
				'CRUD операции с задачами',
				'Фильтрация и сортировка',
				'Поиск по задачам',
				'Сохранение в Local Storage',
				'Темная/светлая тема',
			],
		},
		{
			title: 'GitHub Profile Finder',
			description:
				'Приложение для поиска пользователей GitHub с визуализацией статистики',
			fullDescription:
				'Интерактивное приложение для поиска профилей GitHub. Использует GitHub API для получения информации о пользователях, их репозиториях и статистике. Включает красивую визуализацию данных и адаптивный дизайн.',
			tags: ['React', 'GitHub API', 'Axios', 'Tailwind CSS'],
			image:
				'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&h=600&auto=format&fit=crop&q=80',
			github: 'https://github.com/bchiang7/github-user-search-app',
			demo: '#',
			features: [
				'Поиск пользователей GitHub',
				'Отображение профиля и репозиториев',
				'Статистика активности',
				'История поисков',
				'Адаптивный дизайн',
			],
		},
		{
			title: 'Weather App',
			description: 'Погодное приложение с прогнозом на 7 дней и геолокацией',
			fullDescription:
				'Современное погодное приложение с использованием OpenWeatherMap API. Показывает текущую погоду, почасовой и недельный прогноз. Поддерживает автоматическое определение местоположения и поиск по городам. Красивая визуализация данных с иконками погоды.',
			tags: ['React', 'OpenWeather API', 'Geolocation', 'Chart.js'],
			image:
				'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&h=600&auto=format&fit=crop&q=80',
			github: 'https://github.com/Ovi/DummyJSON',
			demo: 'https://openweathermap.org/',
			features: [
				'Текущая погода и прогноз',
				'Автоопределение локации',
				'Поиск по городам',
				'Интерактивные графики',
				'Сохранение избранных городов',
			],
		},
		{
			title: 'E-Commerce Store',
			description:
				'Интернет-магазин с корзиной, фильтрацией и интеграцией платежей',
			fullDescription:
				'Полнофункциональный интернет-магазин с каталогом товаров, корзиной покупок, фильтрацией и сортировкой. Использует Context API для управления состоянием, React Router для навигации. Включает интеграцию с mock API для демонстрации функционала.',
			tags: ['React', 'Context API', 'React Router', 'Stripe'],
			image:
				'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&auto=format&fit=crop&q=80',
			github: 'https://github.com/safak/youtube2022/tree/react-shop',
			demo: '#',
			features: [
				'Каталог товаров с фильтрацией',
				'Корзина покупок',
				'Избранное',
				'Адаптивный дизайн',
				'Интеграция с API',
			],
		},
		{
			title: 'Chat Application',
			description: 'Чат в реальном времени с комнатами и отправкой файлов',
			fullDescription:
				'Приложение для обмена сообщениями в реальном времени. Использует WebSocket для мгновенной доставки сообщений. Поддерживает создание комнат, отправку изображений и файлов, индикаторы набора текста и статус онлайн.',
			tags: ['React', 'Socket.io', 'Node.js', 'Express'],
			image:
				'https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=800&h=600&auto=format&fit=crop&q=80',
			github: 'https://github.com/adrianhajdin/project_chat_application',
			demo: '#',
			features: [
				'Сообщения в реальном времени',
				'Создание комнат',
				'Отправка файлов и изображений',
				'Индикатор набора текста',
				'История сообщений',
			],
		},
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
