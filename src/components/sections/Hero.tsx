import heroBg from '@/assets/hero-bg.jpg'
import {Button} from '@/components/ui/button'
import {useScrollAnimation} from '@/hooks/useGsapAnimation'
import {useParallax} from '@/hooks/useParallax'
import {useTypingEffect} from '@/hooks/useTypingEffect'
import {Github, Mail, MessageCircle, Sparkles} from 'lucide-react'
import {useNavigate} from 'react-router-dom'

const Hero = () => {
	const navigate = useNavigate()
	const { displayedText, isComplete } = useTypingEffect(
		[
			'создаю крутые сайты',
			'воплощаю идеи в код',
			'делаю веб красивым',
			'решаю ваши задачи',
		],
		100,
		500,
		50,
		2000
	)

	const contentParallax = useParallax({ speed: 0.3, direction: 'down' })
	const titleRef = useScrollAnimation('fadeIn')
	const buttonsRef = useScrollAnimation('slideUp')
	const socialRef = useScrollAnimation('scale')

	const scrollToContent = () => {
		window.scrollTo({
			top: window.innerHeight,
			behavior: 'smooth',
		})
	}

	return (

		<section
			className='relative min-h-screen h-screen flex items-center justify-center overflow-hidden'
			style={{
				backgroundImage: `linear-gradient(135deg, rgba(22, 27, 34, 0.97) 0%, rgba(30, 35, 45, 0.95) 50%, rgba(22, 27, 34, 0.97) 100%), url(${heroBg})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundAttachment: 'fixed',
			}}
		>
			{/* Декоративные элементы */}
			<div className='absolute inset-0 overflow-hidden pointer-events-none'>
				<div className='absolute top-10 sm:top-20 left-5 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-primary/10 rounded-full blur-3xl animate-pulse' />
				<div className='absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000' />
				<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-gradient-to-r from-primary/5 to-accent/5 rounded-full blur-3xl' />
			</div>

			<div
				className='w-full z-10 px-4 sm:px-6 lg:px-8 py-8 sm:py-0'
				ref={contentParallax.ref}
				style={contentParallax.style}
			>
				<div className='max-w-5xl mx-auto text-center'>
					<div ref={titleRef}>
						{/* Бейдж */}

						<h1 className='text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 leading-tight'>
							<span className='block mb-1 sm:mb-2 bg-gradient-to-r from-foreground via-foreground/90 to-foreground bg-clip-text text-transparent'>
								Привет! Я
							</span>
							<span className='block mb-3 sm:mb-4 bg-gradient-primary bg-clip-text text-transparent drop-shadow-2xl'>
								Артём
							</span>
							{/* Контейнер с фиксированной высотой */}
							<div className='relative w-full'>
								{/* Невидимая строка для резервирования высоты */}
								<span
									className='invisible block text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold'
									aria-hidden='true'
								>
									создаю крутые сайты
								</span>
								{/* Видимый текст с абсолютным позиционированием */}
								<span className='absolute inset-0 flex items-center justify-center text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold bg-gradient-to-r from-primary/80 via-accent/80 to-primary/80 bg-clip-text text-transparent'>
									{displayedText}
									{!isComplete && (
										<span className='inline-block w-0.5 sm:w-1 h-6 xs:h-7 sm:h-8 md:h-10 lg:h-12 ml-1 bg-gradient-primary animate-pulse align-middle' />
									)}
								</span>
							</div>
						</h1>

						<p className='text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-6 sm:mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed px-2'>
							<span className='font-semibold text-foreground/90'>
								Frontend разработчик
							</span>
							, специализируюсь на{' '}
							<span className='text-primary font-bold'>React</span> и{' '}
							<span className='text-primary font-bold'>Angular</span>, превращаю
							идеи в современные и красивые веб-приложения
						</p>
					</div>

					<div
						ref={buttonsRef}
						className='flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 md:mb-16 px-4'
					>
						<Button
							size='lg'
							className='group relative overflow-hidden bg-gradient-to-r from-primary via-accent to-primary bg-size-200 hover:bg-pos-100 text-white font-semibold shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/50 transition-all duration-500 h-11 sm:h-12 md:h-14 text-sm sm:text-base md:text-lg px-6 sm:px-8 w-full sm:w-auto'
							onClick={() => navigate('/projects')}
						>
							<span className='relative z-10 flex items-center justify-center gap-2'>
								Посмотреть проекты
								<Sparkles className='w-4 h-4 group-hover:rotate-12 transition-transform' />
							</span>
						</Button>
						<Button
							size='lg'
							variant='outline'
							className='group border-2 border-primary/40 hover:border-primary hover:bg-primary/10 backdrop-blur-sm h-11 sm:h-12 md:h-14 text-sm sm:text-base md:text-lg px-6 sm:px-8 font-semibold transition-all duration-300 w-full sm:w-auto'
							onClick={() => navigate('/contact')}
						>
							<span className='flex items-center justify-center gap-2'>
								Связаться со мной
								<MessageCircle className='w-4 h-4 group-hover:scale-110 transition-transform' />
							</span>
						</Button>
					</div>

					<div
						ref={socialRef}
						className='flex gap-3 sm:gap-4 justify-center mb-6 sm:mb-8'
					>
						<a
							href='https://github.com/CyberArt2718281'
							target='_blank'
							rel='noopener noreferrer'
							className='smooth-scale group p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-card/80 to-card/50 backdrop-blur-sm border-2 border-border hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20'
							aria-label='GitHub'
						>
							<Github className='w-5 h-5 sm:w-6 sm:h-6 group-hover:text-primary transition-colors' />
						</a>
						<a
							href='https://t.me/artem-front'
							target='_blank'
							rel='noopener noreferrer'
							className='smooth-scale group p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-card/80 to-card/50 backdrop-blur-sm border-2 border-border hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20'
							aria-label='Telegram'
						>
							<MessageCircle className='w-5 h-5 sm:w-6 sm:h-6 group-hover:text-primary transition-colors' />
						</a>
						<a
							href='mailto:artem2006pax@mail.ru'
							className='smooth-scale group p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-card/80 to-card/50 backdrop-blur-sm border-2 border-border hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20'
							aria-label='Email'
						>
							<Mail className='w-5 h-5 sm:w-6 sm:h-6 group-hover:text-primary transition-colors' />
						</a>
					</div>
				</div>
			</div>

		</section>
	)
}

export default Hero
