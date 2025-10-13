import {useLocation, useNavigate} from 'react-router-dom'
import {useEffect} from 'react'
import {Button} from '@/components/ui/button'
import {ArrowLeft, Frown, Home, Search} from 'lucide-react'

const NotFound = () => {
	const location = useLocation()
	const navigate = useNavigate()

	useEffect(() => {
		console.error(
			'404 Error: User attempted to access non-existent route:',
			location.pathname
		)
	}, [location.pathname])

	return (
		<div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background/95 to-background px-4 relative overflow-hidden'>
			{/* Декоративные элементы фона */}
			<div className='absolute inset-0 overflow-hidden pointer-events-none'>
				<div className='absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse' />
				<div
					className='absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse'
					style={{ animationDelay: '1s' }}
				/>
			</div>

			<div className='text-center relative z-10 max-w-2xl'>
				{/* 404 с анимацией */}
				<div className='mb-8'>
					<div className='relative inline-block'>
						<div className='absolute inset-0 bg-gradient-primary blur-3xl opacity-30 animate-pulse' />
						<h1 className='relative text-9xl sm:text-[12rem] md:text-[15rem] font-bold bg-gradient-primary bg-clip-text text-transparent leading-none'>
							404
						</h1>
					</div>
				</div>

				{/* Иконка и сообщение */}
				<div className='mb-6'>
					<div className='flex justify-center mb-4'>
						<div className='p-4 bg-primary/10 rounded-full border-2 border-primary/20'>
							<Frown className='w-12 h-12 text-primary animate-pulse' />
						</div>
					</div>
					<h2 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-3 bg-gradient-primary bg-clip-text text-transparent'>
						Страница не найдена
					</h2>
					<p className='text-base sm:text-lg text-muted-foreground mb-2 max-w-md mx-auto'>
						К сожалению, страница, которую вы ищете, не существует или была
						перемещена
					</p>
					<div className='inline-flex items-center gap-2 px-4 py-2 bg-card/50 backdrop-blur-sm rounded-full border border-border/50 text-sm text-muted-foreground mt-4'>
						<Search className='w-4 h-4' />
						<code className='font-mono'>{location.pathname}</code>
					</div>
				</div>

				{/* Кнопки навигации */}
				<div className='flex flex-col sm:flex-row gap-4 justify-center mt-8'>
					<Button
						size='lg'
						onClick={() => navigate(-1)}
						variant='outline'
						className='group border-2 border-primary/40 hover:border-primary hover:bg-primary/10 backdrop-blur-sm h-12 sm:h-14 text-base px-6 font-semibold transition-all duration-300'
					>
						<ArrowLeft className='w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform' />
						Назад
					</Button>
					<Button
						size='lg'
						onClick={() => navigate('/')}
						className='group bg-gradient-to-r from-primary via-accent to-primary bg-size-200 hover:bg-pos-100 text-white font-semibold shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/50 transition-all duration-500 h-12 sm:h-14 text-base px-6'
					>
						<Home className='w-5 h-5 mr-2 group-hover:scale-110 transition-transform' />
						На главную
					</Button>
				</div>

				{/* Полезные ссылки */}
				<div className='mt-12 mb-8 p-6 bg-gradient-card backdrop-blur-sm rounded-2xl border border-border/50'>
					<p className='text-sm text-muted-foreground mb-4 font-medium'>
						Возможно, вас заинтересует:
					</p>
					<div className='flex flex-wrap gap-3 justify-center'>
						{[
							{ label: 'О себе', path: '/about' },
							{ label: 'Навыки', path: '/skills' },
							{ label: 'Проекты', path: '/projects' },
							{ label: 'Контакты', path: '/contact' },
						].map(link => (
							<button
								key={link.path}
								onClick={() => navigate(link.path)}
								className='px-4 py-2 text-sm bg-primary/5 hover:bg-primary/15 rounded-lg border border-primary/20 hover:border-primary/40 transition-all duration-300 text-foreground/80 hover:text-primary font-medium'
							>
								{link.label}
							</button>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default NotFound
