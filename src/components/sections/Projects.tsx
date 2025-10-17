import {Badge} from '@/components/ui/badge'
import {Button} from '@/components/ui/button'
import {useScrollAnimation, useStaggerAnimation,} from '@/hooks/useGsapAnimation'
import {useTilt} from '@/hooks/useTilt'
import {Briefcase, Code2, ExternalLink, Github} from 'lucide-react'
import {useEffect, useState} from 'react'
import ProjectModal from '../features/ProjectModal'
import {ProjectService} from "@/services/projectService.ts";
import {Project} from "@/types/project.ts";


// Типизация пропсов ProjectCard
interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
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
					src={project.image_url}
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
							window.open(project.github_url, '_blank')
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
							window.open(project.demo_url, '_blank')
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
	const [selectedProject, setSelectedProject] = useState<Project | null>(null)
	const [filter, setFilter] = useState<string>('All')
	const titleRef = useScrollAnimation('slideUp')
	const filterRef = useScrollAnimation('fadeIn')
	const projectsRef = useStaggerAnimation()

	const [projects, setProjects] = useState<Project[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const loadProjects = async () => {
			try {
				setLoading(true)
				const projectsData = await ProjectService.getAllProjects()
				setProjects(projectsData)
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Ошибка загрузки проектов')
				console.error('Error loading projects:', err)
			} finally {
				setLoading(false)
			}
		}

		loadProjects()
	}, [])

	const allTags = ['All', ...Array.from(new Set(projects.flatMap(p => p.tags)))]
	const filteredProjects =
		filter === 'All' ? projects : projects.filter(p => p.tags.includes(filter))

	if (loading) {
		return (
			<section id='projects' className='py-20 bg-gradient-subtle relative overflow-hidden'>
				<div className='container mx-auto px-4 relative z-10'>
					<div className='text-center'>
						<h2 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent'>
							{'<Проекты/>'}
						</h2>
						<div className="flex justify-center items-center mt-8">
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
					</div>
				</div>
			</section>
		)
	}
	if (error) {
		return (
			<section id='projects' className='py-20 bg-gradient-subtle relative overflow-hidden'>
				<div className='container mx-auto px-4 relative z-10'>
					<div className='text-center'>
						<h2 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent'>
							{'<Проекты/>'}
						</h2>
						<p className='text-lg text-red-500'>Ошибка: {error}</p>
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
						{filteredProjects.map((project) => (
							<ProjectCard
								key={project.id}
								project={project}
								onClick={() => setSelectedProject(project)}
							/>
						))}
					</div>

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