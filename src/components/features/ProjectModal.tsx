import {Badge} from '@/components/ui/badge'
import {Button} from '@/components/ui/button'
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,} from '@/components/ui/dialog'
import {CheckCircle2, ExternalLink, Github, Sparkles} from 'lucide-react'
import {Project} from "@/types/project.ts";

interface ProjectModalProps {
	project: Project
	isOpen: boolean
	onClose: () => void
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className='w-[98vw] max-w-xl md:max-w-4xl max-h-[80vh] md:max-h-[95vh] overflow-hidden bg-card border-border p-0 flex flex-col rounded-2xl'>
				<div className='flex flex-col h-full max-h-[80vh] md:max-h-[95vh]'>
					<DialogHeader className='p-6 pb-4 shrink-0 relative'>
						{/* Decorative gradient */}
						<div className='absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl' />

						<div className='relative'>


							<DialogTitle className='text-2xl md:text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2'>
								{project.title}
							</DialogTitle>

							<DialogDescription className='text-sm md:text-base text-muted-foreground'>
								{project.description}
							</DialogDescription>
						</div>
					</DialogHeader>

					<div className='flex-1 overflow-y-auto px-6 grey-custom-scrollbar'>
						<div className='space-y-6 md:space-y-8 pb-4'>
							{/* Enhanced image with overlay */}
							<div className='relative h-40 md:h-56 lg:h-80 rounded-xl overflow-hidden group'>
								<img
									src={project.image_url}
									alt={project.title}
									className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
								/>
								<div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
							</div>

							{/* About section with better styling */}
							<div className='bg-secondary/30 rounded-xl p-5 md:p-6 border border-border/50'>
								<div className='flex items-center gap-2 mb-3'>
									<div className='w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center'>
										<Sparkles className='w-4 h-4 text-primary' />
									</div>
									<h3 className='text-lg md:text-xl font-semibold'>
										О проекте
									</h3>
								</div>
								<p className='text-sm md:text-base text-muted-foreground leading-relaxed'>
									{project.full_description}
								</p>
							</div>

							{/* Features with icons */}
							<div>
								<h3 className='text-lg md:text-xl font-semibold mb-4 flex items-center gap-2'>
									<CheckCircle2 className='w-5 h-5 text-primary' />
									Основные функции
								</h3>
								<div className='grid sm:grid-cols-2 gap-3'>
									{project.features.map((feature, index) => (
										<div
											key={index}
											className='flex items-start gap-3 p-3 rounded-lg bg-secondary/20 hover:bg-secondary/40 transition-colors border border-border/30'
										>
											<CheckCircle2 className='w-4 h-4 text-primary mt-0.5 shrink-0' />
											<span className='text-sm md:text-base text-muted-foreground'>
												{feature}
											</span>
										</div>
									))}
								</div>
							</div>

							{/* Technologies with better badges */}
							<div>
								<h3 className='text-lg md:text-xl font-semibold mb-4'>
									Технологии
								</h3>
								<div className='flex flex-wrap gap-2'>
									{project.tags.map((tag, index) => (
										<Badge
											key={index}
											variant='secondary'
											className='px-3 md:px-4 py-1.5 md:py-2 bg-primary/10 hover:bg-primary/20 text-primary text-xs md:text-sm rounded-full border border-primary/20 transition-colors smooth-scale hover:scale-105'
										>
											{tag}
										</Badge>
									))}
								</div>
							</div>
						</div>
					</div>

					{/* Enhanced footer */}
					<div className='p-6 pt-4 border-t border-border/50 shrink-0 mt-auto bg-secondary/20'>
						<div className='flex flex-col sm:flex-row gap-3'>
							{project.demo_url ? (
								<>
									<Button
										className='flex-1 bg-gradient-primary hover:opacity-90 text-sm md:text-base shadow-lg shadow-primary/25 smooth-scale hover:scale-105'
										asChild
									>
										<a
											href={project.demo_url}
											target='_blank'
											rel='noopener noreferrer'
										>
											<ExternalLink className='w-4 h-4 mr-2' />
											Посмотреть демо
										</a>
									</Button>
									<Button
										variant='outline'
										className='flex-1 border-primary/30 hover:bg-primary/10 hover:border-primary/50 text-sm md:text-base smooth-scale hover:scale-105'
										asChild
									>
										<a
											href={project.github_url}
											target='_blank'
											rel='noopener noreferrer'
										>
											<Github className='w-4 h-4 mr-2' />
											Исходный код
										</a>
									</Button>

								</>
								): (

									<Button
										variant='outline'
										className='flex-1 border-primary/30 hover:bg-primary/10 hover:border-primary/50 text-sm md:text-base smooth-scale hover:scale-105'
										asChild
									>
										<a
											href={project.github_url}
											target='_blank'
											rel='noopener noreferrer'
										>
											<Github className='w-4 h-4 mr-2' />
											Исходный код
										</a>
									</Button>
								)}

						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default ProjectModal