import {useScrollAnimation} from '@/hooks/useGsapAnimation'
import {Github, Mail, MapPin, MessageCircle, Phone} from 'lucide-react'
import ContactForm from "@/components/features/ContactForm.tsx";

const Contact = () => {
	const titleRef = useScrollAnimation('slideUp')
	const formRef = useScrollAnimation('slideLeft')
	const infoRef = useScrollAnimation('slideRight')
	const interestsRef = useScrollAnimation('fadeIn')

	const contactInfo = [
		{
			icon: Mail,
			label: 'Email',
			value: 'artem2006pax@mail.ru',
			href: 'mailto:artem2006pax@mail.ru',
			color: 'from-blue-500 to-cyan-500',
		},
		{
			icon: MessageCircle,
			label: 'Telegram',
			value: '@artoym_dev',
			href: 'https://t.me/artoym_dev',
			color: 'from-cyan-500 to-blue-400',
		},
		{
			icon: Github,
			label: 'GitHub',
			value: 'github.com/CyberArt2718281',
			href: 'https://github.com/CyberArt2718281',
			color: 'from-purple-500 to-pink-500',
		},
		{
			icon: MapPin,
			label: 'Локация',
			value: 'Москва, Россия',
			href: null,
			color: 'from-green-500 to-emerald-500',
		},
		{
			icon: Phone,
			label: 'Контактный телефон',
			value: '+7-(924)-462-03-92',
			href: null,
			color: 'from-amber-500 to-orange-500',
		},
	]

	return (
		<section className='py-12 sm:py-16 lg:py-20 bg-gradient-subtle'>
			<div className='container mx-auto px-3 sm:px-4'>
				<div className='max-w-6xl mx-auto'>
					<div ref={titleRef} className='text-center mb-10 sm:mb-12 lg:mb-16'>
						<h2 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent'>
							{'<Контакты/>'}
						</h2>
						<p className='text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto'>
							Открыт к новым возможностям и интересным проектам
						</p>

						{/* Декоративная линия */}
						<div className='flex items-center justify-center gap-3 mt-6'>
							<div className='h-px w-12 sm:w-20 bg-gradient-to-r from-transparent to-primary/50' />
							<Mail className='w-5 h-5 text-primary animate-pulse' />
							<div className='h-px w-12 sm:w-20 bg-gradient-to-l from-transparent to-primary/50' />
						</div>
					</div>

					<div className='grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8'>
						{/* Форма */}
						<div className='bg-gradient-card backdrop-blur-sm p-6 sm:p-8 rounded-2xl border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 shadow-lg hover:shadow-primary/10 flex flex-col'>
							<h3 className='text-2xl sm:text-3xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent'>
								Напишите мне
							</h3>
							<p className='text-sm text-muted-foreground mb-6'>
								Заполните форму, и я отвечу в ближайшее время
							</p>
							<div className='flex-1 flex flex-col w-full'>
								<ContactForm />
							</div>
						</div>

						{/* Контактная информация */}
						<div ref={infoRef} className='space-y-6'>
							<div className='bg-gradient-card backdrop-blur-sm p-6 sm:p-8 rounded-2xl border-2 border-primary/20 shadow-lg'>
								<h3 className='text-2xl sm:text-3xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent'>
									Контакты
								</h3>
								<div className='space-y-4'>
									{contactInfo.map((item, index) => {
										const Icon = item.icon
										const content = (
											<>
												<div
													className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
												>
													<Icon className='w-6 h-6 sm:w-7 sm:h-7 text-white' />
												</div>
												<div className='min-w-0 flex-1'>
													<h4 className='font-semibold mb-1 text-sm sm:text-base text-foreground'>
														{item.label}
													</h4>
													<p className='text-xs sm:text-sm text-muted-foreground break-words'>
														{item.value}
													</p>
												</div>
											</>
										)

										return item.href ? (
											<a
												key={index}
												href={item.href}
												target='_blank'
												rel='noopener noreferrer'
												className='group flex items-center gap-4 p-4 bg-background/50 backdrop-blur-sm rounded-xl hover:bg-primary/5 border-2 border-transparent hover:border-primary/30 transition-all duration-300 hover:shadow-md'
											>
												{content}
											</a>
										) : (
											<div
												key={index}
												className='flex items-center gap-4 p-4 bg-background/50 backdrop-blur-sm rounded-xl border-2 border-border/50'
											>
												{content}
											</div>
										)
									})}
								</div>
							</div>

							{/* Мой подход к работе */}
							<div className='bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border-2 border-primary/20 shadow-lg'>
								<h4 className='font-semibold text-lg mb-3 flex items-center gap-2'>
									<span className='w-2 h-2 bg-blue-500 rounded-full animate-pulse' />
									Мой подход к работе
								</h4>
								<ul className='text-xs sm:text-sm text-muted-foreground list-disc pl-5 space-y-1 mb-2'>
									<li>Глубоко погружаюсь в задачи и бизнес-цели проекта</li>
									<li>Пишу чистый, поддерживаемый и масштабируемый код</li>
									<li>Внимателен к деталям и пользовательскому опыту</li>
									<li>Люблю прозрачную коммуникацию и обмен знаниями</li>
									<li>
										Быстро осваиваю новые технологии и не боюсь сложных задач
									</li>
								</ul>
								<p className='text-sm sm:text-base text-foreground/80 leading-relaxed'>
									Главное — делать работу с интересом и отдачей
								</p>
							</div>
							<div className='bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border-2 border-primary/20 shadow-lg'>
								<h4 className='font-semibold text-lg mb-3 flex items-center gap-2'>
									<span className='w-2 h-2 bg-green-500 rounded-full animate-pulse' />
									Доступен для работы
								</h4>
								<p className='text-sm sm:text-base text-foreground/80 leading-relaxed'>
									Ищу возможности для роста в дружной команде. Готов к релокации и новым вызовам. Свяжитесь со мной, чтобы обсудить возможное сотрудничество!
									<br></br>
									<br></br>
									Буду рад ответить на ваши вопросы и обсудить, как могу быть полезен вашему проекту.



								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Contact
