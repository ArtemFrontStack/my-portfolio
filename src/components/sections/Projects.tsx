import {Badge} from '@/components/ui/badge'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {MultiSelect} from '@/components/ui/multi-select'
import {useScrollAnimation, useStaggerAnimation} from '@/hooks/useGsapAnimation'
import {useTilt} from '@/hooks/useTilt'
import {Briefcase, Code2, ExternalLink, Github, Search, X} from 'lucide-react'
import {useState} from 'react'
import ProjectModal from '../features/ProjectModal'
import {ProjectService} from "@/services/projectService"
import {Project} from "@/types/project"
import {useQuery} from '@tanstack/react-query'

// Типизация пропсов ProjectCard
interface ProjectCardProps {
	project: Project;
	onClick: () => void;
}

const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
	const tiltRef = useTilt({ max: 10, scale: 1.02 })

	// Оптимизированная загрузка изображений
	const getOptimizedImageUrl = (url: string, width = 800) => {
		if (!url) return ''

		// Для Supabase добавляем параметры оптимизации
		if (url.includes('supabase')) {
			return `${url}?width=${width}&quality=75&format=webp`
		}

		// Для других источников
		return url
	}

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
					style={{ maxWidth: '100%', maxHeight: '208px', objectFit: 'cover' }}
					src={getOptimizedImageUrl(project.image_url, 600)}
					srcSet={`
					  ${getOptimizedImageUrl(project.image_url, 400)} 400w,
					  ${getOptimizedImageUrl(project.image_url, 600)} 600w,
					  ${getOptimizedImageUrl(project.image_url, 900)} 900w
					`}
					sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
					alt={project.title}
					loading='lazy'
					className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 rounded-xl bg-muted'
					onError={e => {
						const target = e.target as HTMLImageElement
						target.src = `https://placehold.co/600x400/1e293b/64748b?text=${encodeURIComponent(
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
					{project.demo_url ? (
						<>
						<Button
							size='sm'
							variant='outline'
							className='flex-1 border-primary/30 hover:bg-primary/10 hover:border-primary/50 smooth-scale hover:scale-105'
							onClick={e => {
								e.stopPropagation()
								window.open(project.github_url, '_blank', 'noopener,noreferrer')
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
								window.open(project.demo_url, '_blank', 'noopener,noreferrer')
							}}
						>
							<ExternalLink className='w-4 h-4 mr-2' />
							Demo
						</Button>
						</>) :(<Button
						size='sm'
						variant='outline'
						className='flex-1 border-primary/30 hover:bg-primary/10 hover:border-primary/50 smooth-scale hover:scale-105'
						onClick={e => {
						e.stopPropagation()
						window.open(project.github_url, '_blank', 'noopener,noreferrer')
					}}
				>
					<Github className='w-4 h-4 mr-2' />
					Code
				</Button>)}
				</div>
			</div>
		</div>
	)
}

// Скелетон для загрузки
const ProjectCardSkeleton = () => (
	<div className='bg-card/50 rounded-2xl border border-border/50 overflow-hidden animate-pulse'>
		<div className='h-52 bg-muted' />
		<div className='p-6'>
			<div className='h-6 bg-muted rounded mb-3' />
			<div className='h-4 bg-muted rounded mb-2' />
			<div className='h-4 bg-muted rounded w-3/4 mb-4' />
			<div className='flex gap-2 mb-5'>
				<div className='h-6 bg-muted rounded w-16' />
				<div className='h-6 bg-muted rounded w-20' />
				<div className='h-6 bg-muted rounded w-12' />
			</div>
			<div className='flex gap-3'>
				<div className='h-10 bg-muted rounded flex-1' />
				<div className='h-10 bg-muted rounded flex-1' />
			</div>
		</div>
	</div>
)

const Projects = () => {
	const [selectedProject, setSelectedProject] = useState<Project | null>(null)
	const [selectedTags, setSelectedTags] = useState<string[]>([])
	const [searchQuery, setSearchQuery] = useState<string>('')
	const titleRef = useScrollAnimation('slideUp')
	const filterRef = useScrollAnimation('fadeIn')
	const projectsRef = useStaggerAnimation()

	// Оптимизированный запрос с улучшенными настройками
	const {
		data: projects = [],
		isLoading,
		error,
		isFetching
	} = useQuery<Project[], Error>({
		queryKey: ['projects'],
		queryFn: async () => {
			const data = await ProjectService.getAllProjects(100) // Увеличиваем лимит, чтобы фильтрация работала корректно на клиенте
			return data
		},
		staleTime: 10 * 60 * 1000, // 10 минут
		gcTime: 30 * 60 * 1000, // 30 минут кэш
		retry: 2,
		retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 10000),
		refetchOnWindowFocus: false,
		refetchOnMount: false
	})

	const allTags = Array.from(new Set(projects.flatMap(p => p.tags)))
	
	const filteredProjects = projects.filter(project => {
		const matchesFilter = selectedTags.length === 0 || selectedTags.some(tag => project.tags.includes(tag))
		const matchesSearch = 
			project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
			project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
			project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
		
		return matchesFilter && matchesSearch
	})

	if (error) {
		return (
			<section id='projects' className='py-20 bg-gradient-subtle relative overflow-hidden'>
				<div className='container mx-auto px-4 relative z-10'>
					<div className='text-center'>
						<h2 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent'>
							{'<Проекты/>'}
						</h2>
						<p className='text-lg text-red-500 mb-4'>Ошибка загрузки проектов</p>
						<Button
							onClick={() => window.location.reload()}
							className='mt-4'
						>
							Попробовать снова
						</Button>
					</div>
				</div>
			</section>
		)
	}

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

					{/* Панель фильтрации */}
					{!isLoading && !isFetching && (
					<div ref={filterRef} className='mb-10 space-y-6'>
						{/* Поиск */}
						<div className="relative max-w-md mx-auto">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<Search className="h-5 w-5 text-muted-foreground" />
							</div>
							<Input
								type="text"
								placeholder="Поиск проектов..."
								className="pl-10 pr-10 py-6 rounded-full bg-card/50 border-primary/20 focus:border-primary focus:ring-primary/20 transition-all text-lg"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
							{searchQuery && (
								<button 
									className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground"
									onClick={() => setSearchQuery('')}
								>
									<X className="h-5 w-5" />
								</button>
							)}
						</div>

						{/* MultiSelect для тегов */}
						<div className='max-w-md mx-auto'>
							<MultiSelect
								options={allTags}
								selected={selectedTags}
								onChange={setSelectedTags}
								placeholder="Выберите технологии..."
								className="bg-card/50 border-primary/20 hover:border-primary/40"
							/>
						</div>
					</div>)}
					{/* Projects Grid */}
					<div
						ref={projectsRef}
						className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-8'
					>
						{(isLoading || isFetching) ? (
							<div className="flex justify-center items-center mt-8 col-span-full">
								<div className="loader w-[120px] h-[120px] flex flex-col items-center justify-center">
									<svg width="100" height="100" viewBox="0 0 100 100">
										<defs>
											<mask id="clipping">
												<polygon points="0,0 100,0 100,100 0,100" fill="black"></polygon>
												<polygon points="25,25 75,25 50,75" fill="white"></polygon>
												<polygon points="50,25 75,75 25,75" fill="white"></polygon>
												<polygon points="35,35 65,35 50,65" fill="white"></polygon>
												<polygon points="35,35 65,35 50,65" fill="white"></polygon>
												<polygon points="35,35 65,35 50,65" fill="white"></polygon>
												<polygon points="35,35 65,35 50,65" fill="white"></polygon>
											</mask>
										</defs>
									</svg>
									<div className="box"></div>
								</div>
							</div>
						) : (
							filteredProjects.map((project) => (
								<ProjectCard
									key={project.id}
									project={project}
									onClick={() => setSelectedProject(project)}
								/>
							))
						)}
					</div>

					{filteredProjects.length === 0 && !isLoading && !isFetching && (
						<div className='text-center py-12'>
							<p className='text-muted-foreground text-lg'>
								Проекты не найдены для выбранного фильтра
							</p>
						</div>
					)}

					{selectedProject !== null && (
						<ProjectModal
							project={selectedProject}
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