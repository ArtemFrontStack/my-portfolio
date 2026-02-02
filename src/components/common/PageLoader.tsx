import { Code, Sparkles, Zap } from 'lucide-react'
import { useEffect, useState } from 'react'

const PageLoader = () => {
	const [progress, setProgress] = useState(0)
	const [isLoading, setIsLoading] = useState(true)
	const [loadingStage, setLoadingStage] = useState(0)

	const loadingMessages = [
		{ icon: Code, text: 'Загрузка компонентов...', color: 'text-blue-500' },
		{ icon: Sparkles, text: 'Применение стилей...', color: 'text-purple-500' },
		{ icon: Zap, text: 'Финализация...', color: 'text-green-500' },
	]

	useEffect(() => {
		// Симуляция загрузки
		const interval = setInterval(() => {
			setProgress(prev => {
				if (prev >= 100) {
					clearInterval(interval)
					setTimeout(() => setIsLoading(false), 500)
					return 100
				}
				// Обновление стадии загрузки
				if (prev >= 30 && prev < 40) setLoadingStage(1)
				if (prev >= 70 && prev < 80) setLoadingStage(2)

				// Ускоряем на последних процентах
				const increment = prev > 80 ? 8 : prev > 50 ? 4 : 3
				return Math.min(prev + increment, 100)
			})
		}, 60)

		return () => clearInterval(interval)
	}, [])

	if (!isLoading) return null

	const currentMessage = loadingMessages[loadingStage]
	const Icon = currentMessage.icon

	return (
		<div
			className={`fixed inset-0 z-[99999] bg-gradient-to-br from-background via-background/95 to-background flex items-center justify-center transition-all duration-700 ${
				progress === 100 ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
			}`}
		>
			{/* Декоративные элементы фона */}
			<div className='absolute inset-0 overflow-hidden pointer-events-none'>
				<div className='absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse' />
				<div
					className='absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse'
					style={{ animationDelay: '1s' }}
				/>
				<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-primary/5 to-accent/5 rounded-full blur-3xl' />
			</div>

			<div className='max-w-lg w-full px-6 sm:px-8 relative z-10'>
				{/* Логотип */}
				<div className='text-center mb-8'>
					<div className='inline-block mb-4'>
						<div className='relative'>
							<div className='absolute inset-0 bg-gradient-primary blur-2xl opacity-50 animate-pulse' />
							<h1 className='relative text-5xl sm:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent'>
								{'</>'}
							</h1>
						</div>
					</div>
					<h2 className='text-2xl sm:text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2'>
						Артём
					</h2>
					<p className='text-sm text-muted-foreground'>Fullstack Developer</p>
				</div>

				{/* Процент загрузки */}
				<div className='text-center mb-6'>
					<div className='inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 backdrop-blur-sm rounded-2xl border border-primary/20 shadow-lg'>
						<Icon className={`w-6 h-6 ${currentMessage.color} animate-pulse`} />
						<div>
							<div className='text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent'>
								{progress}%
							</div>
							<p className='text-xs text-muted-foreground mt-1'>
								{currentMessage.text}
							</p>
						</div>
					</div>
				</div>

				{/* Прогресс-бар */}
				<div className='relative mb-6'>
					<div className='relative h-3 bg-gradient-to-r from-muted/50 via-muted/30 to-muted/50 rounded-full overflow-hidden backdrop-blur-sm border border-border/50'>
						<div
							className='absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-accent to-primary transition-all duration-300 ease-out rounded-full shadow-lg shadow-primary/50'
							style={{ width: `${progress}%` }}
						>
							{/* Анимированный блик */}
							<div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer' />
							{/* Пульсирующий край */}
							<div className='absolute right-0 inset-y-0 w-4 bg-white/30 blur-sm' />
						</div>
					</div>
					{/* Метки прогресса */}
					<div className='flex justify-between mt-2 px-1'>
						<span
							className={`text-xs transition-colors ${
								progress >= 0 ? 'text-primary' : 'text-muted-foreground'
							}`}
						>
							0%
						</span>
						<span
							className={`text-xs transition-colors ${
								progress >= 50 ? 'text-primary' : 'text-muted-foreground'
							}`}
						>
							50%
						</span>
						<span
							className={`text-xs transition-colors ${
								progress >= 100 ? 'text-primary' : 'text-muted-foreground'
							}`}
						>
							100%
						</span>
					</div>
				</div>

				{/* Анимированные индикаторы */}
				<div className='flex justify-center gap-2'>
					{[0, 1, 2, 3, 4].map(i => (
						<div
							key={i}
							className='w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent animate-pulse'
							style={{
								animationDelay: `${i * 150}ms`,
								opacity: progress >= i * 20 ? 1 : 0.3,
							}}
						/>
					))}
				</div>

				{/* Дополнительный текст */}
				{progress >= 90 && (
					<div className='mt-6 text-center animate-fade-in'>
						<p className='text-sm text-muted-foreground'>Почти готово... 🚀</p>
					</div>
				)}
			</div>
		</div>
	)
}

export default PageLoader
