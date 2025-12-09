import { useScrollAnimation } from '@/hooks/useGsapAnimation'
import { Briefcase, Calendar, GraduationCap } from 'lucide-react'

const Timeline = () => {
	const titleRef = useScrollAnimation('slideUp')
	const timelineItems = [
		{
			type: 'education',
			icon: GraduationCap,
			title: 'Бакалавр Информационных Технологий',
			organization: 'РТУ МИРЭА',
			period: '2024 - настоящее время',
			description:
				'Специализация: Разработка программного обеспечения и веб-технологии',
			color: 'border-blue-500',
			bgColor: 'bg-blue-500/10',
		},
		{
			type: 'work',
			icon: Briefcase,
			title: 'Frontend Developer',
			organization: 'Фриланс',
			period: '2023 - настоящее время',
			description:
				'Разработка современных веб-приложений с использованием React, TypeScript и современных фреймворков',
			color: 'border-purple-500',
			bgColor: 'bg-purple-500/10',
		},
		{
			type: 'education',
			icon: GraduationCap,
			title: 'Онлайн курсы по Frontend разработке',
			organization: 'Различные платформы',
			period: '2022 - 2023',
			description:
				'Изучение React, TypeScript, Next.js и современных инструментов разработки',
			color: 'border-green-500',
			bgColor: 'bg-green-500/10',
		},
	]

	return (
		<section className='py-12 sm:py-16 lg:py-20 bg-gradient-subtle'>
			<div className='container mx-auto px-3 sm:px-4'>
				<div className='max-w-4xl mx-auto'>
					<div ref={titleRef} className='text-center mb-12 sm:mb-14 lg:mb-16'>
						<h2 className='text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-primary bg-clip-text text-transparent'>
							{'<Мой путь/>'}
						</h2>
						<p className='text-base sm:text-lg md:text-xl text-muted-foreground px-2'>
							Образование и опыт работы
						</p>
					</div>

					<div className='relative'>
						{/* Вертикальная линия */}
						<div className='absolute left-4 sm:left-6 md:left-8 lg:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary'></div>

						<div className='space-y-8 sm:space-y-10 lg:space-y-12'>
							{timelineItems.map((item, index) => (
								<TimelineItem key={index} item={item} index={index} />
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

const TimelineItem = ({ item, index }: {
  item: {
    type: string;
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    organization: string;
    period: string;
    description: string;
    color: string;
    bgColor: string;
  };
  index: number;
}) => {
	const Icon = item.icon
	const isEven = index % 2 === 0
	const itemRef = useScrollAnimation(isEven ? 'slideRight' : 'slideLeft')

	return (
		<div
			ref={itemRef}
			className={`relative flex items-center ${
				isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
			}`}
		>
			{/* Точка на линии */}
			<div className='absolute left-4 sm:left-6 md:left-8 lg:left-1/2 -ml-2 sm:-ml-3 lg:-ml-4'>
				<div
					className={`w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 rounded-full border-2 sm:border-3 lg:border-4 border-background ${item.bgColor} flex items-center justify-center`}
				>
					<div
						className={`w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 rounded-full ${item.color.replace(
							'border-',
							'bg-'
						)}`}
					></div>
				</div>
			</div>

			{/* Контент */}
			<div
				className={`ml-12 sm:ml-16 md:ml-20 lg:ml-0 lg:w-5/12 ${
					isEven ? 'lg:pr-12' : 'lg:pl-12'
				}`}
			>
				<div
					className={`group bg-gradient-card p-4 sm:p-5 lg:p-6 rounded-lg sm:rounded-xl border-l-3 sm:border-l-4 ${item.color} hover:shadow-xl transition-all duration-300 hover:scale-105`}
				>
					<div className='flex items-start gap-3 sm:gap-4 mb-3'>
						<div
							className={`${item.bgColor} p-2 sm:p-3 rounded-lg group-hover:scale-110 transition-transform flex-shrink-0`}
						>
							<Icon
								className={`w-5 h-5 sm:w-6 sm:h-6 ${item.color.replace(
									'border-',
									'text-'
								)}`}
							/>
						</div>
						<div className='flex-1 min-w-0'>
							<h3 className='text-base sm:text-lg lg:text-xl font-semibold mb-1 break-words'>
								{item.title}
							</h3>
							<p className='text-sm sm:text-base text-primary font-medium break-words'>
								{item.organization}
							</p>
						</div>
					</div>

					<div className='flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mb-3'>
						<Calendar className='w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0' />
						<span>{item.period}</span>
					</div>

					<p className='text-sm sm:text-base text-foreground/80 leading-relaxed'>
						{item.description}
					</p>
				</div>
			</div>
		</div>
	)
}

export default Timeline
