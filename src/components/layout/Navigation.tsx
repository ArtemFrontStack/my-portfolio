import {Button} from '@/components/ui/button'
import {Briefcase, Code, Home, Mail, Menu, User, X} from 'lucide-react'
import {useEffect, useState} from 'react'
import {Link, useLocation} from 'react-router-dom'

const Navigation = () => {
	const [isScrolled, setIsScrolled] = useState(false)
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
	const location = useLocation()

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50)
		}

		// Добавляем throttle для оптимизации
		let ticking = false
		const optimizedScroll = () => {
			if (!ticking) {
				window.requestAnimationFrame(() => {
					handleScroll()
					ticking = false
				})
				ticking = true
			}
		}

		window.addEventListener('scroll', optimizedScroll, { passive: true })
		return () => window.removeEventListener('scroll', optimizedScroll)
	}, [])

	// Закрытие меню при изменении маршрута
	useEffect(() => {
		setIsMobileMenuOpen(false)
	}, [location])

	const navItems = [
		{ label: 'Главная', path: '/', icon: Home },
		{ label: 'Обо мне', path: '/about', icon: User },
		{ label: 'Навыки', path: '/skills', icon: Code },
		{ label: 'Проекты', path: '/projects', icon: Briefcase },
		{ label: 'Контакты', path: '/contact', icon: Mail },
	]

	const isHeroPage = location.pathname === '/'

	return (
		<nav
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
				isHeroPage
					? 'bg-gradient-to-b from-background/80 via-background/40 to-transparent backdrop-blur-sm'
					: (isScrolled || isMobileMenuOpen
						? 'bg-background/98 backdrop-blur-xl shadow-lg'
						: 'bg-gradient-to-b from-background/80 via-background/40 to-transparent backdrop-blur-sm')
			}`}
		>
			<div className='container mx-auto px-3 sm:px-4'>
				<div className='flex items-center justify-between h-14 sm:h-16'>
					<Link
						to='/'
						className='text-lg sm:text-xl font-bold bg-gradient-primary bg-clip-text text-transparent hover:opacity-80 transition-opacity'
						onClick={() => setIsMobileMenuOpen(false)}
					>
						{'<Артём Dev/>'}
					</Link>

					{/* Desktop Navigation */}
					<div className='hidden md:flex items-center gap-1'>
						{navItems.map(item => {
							const Icon = item.icon
							return (
								<Link
									key={item.path}
									to={item.path}
									className={`relative px-3 lg:px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 flex items-center gap-2 ${
										location.pathname === item.path
											? 'bg-gradient-to-r from-primary/15 to-accent/15 text-primary shadow-sm shadow-primary/20 scale-105'
											: 'text-foreground/70 hover:text-primary hover:bg-primary/5 hover:scale-105'
									}`}
								>
									<Icon className='w-4 h-4' />
									<span>{item.label}</span>
									{location.pathname === item.path && (
										<span className='absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-0.5 bg-gradient-primary rounded-full' />
									)}
								</Link>
							)
						})}
					</div>

					{/* Mobile Menu Button */}
					<Button
						variant='ghost'
						size='icon'
						className={`md:hidden rounded-xl transition-all duration-300 ${
							isMobileMenuOpen
								? 'bg-primary/15 text-primary rotate-90'
								: 'hover:bg-primary/10 hover:text-primary'
						}`}
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
					>
						{isMobileMenuOpen ? (
							<X className='h-5 w-5 sm:h-6 sm:w-6' />
						) : (
							<Menu className='h-5 w-5 sm:h-6 sm:w-6' />
						)}
					</Button>
				</div>

				{/* Mobile Navigation */}
				{isMobileMenuOpen && (
					<div className='md:hidden pb-4 pt-2 border-t border-primary/20 animate-fade-in'>
						<div className='flex flex-col gap-2'>
							{navItems.map(item => {
								const Icon = item.icon
								return (
									<Link
										key={item.path}
										to={item.path}
										className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
											location.pathname === item.path
												? 'bg-gradient-to-r from-primary/15 to-accent/15 text-primary font-semibold shadow-md shadow-primary/10 scale-[1.02]'
												: 'text-foreground/70 hover:text-primary hover:bg-primary/5 active:scale-95'
										}`}
									>
										<div
											className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
												location.pathname === item.path
													? 'bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/30'
													: 'bg-primary/10'
											}`}
										>
											<Icon
												className={`w-5 h-5 ${
													location.pathname === item.path
														? 'text-white'
														: 'text-primary'
												}`}
											/>
										</div>
										<div className='flex-1'>
											<span className='text-base font-medium'>
												{item.label}
											</span>
											{location.pathname === item.path && (
												<div className='w-full h-0.5 bg-gradient-primary rounded-full mt-1' />
											)}
										</div>
									</Link>
								)
							})}
						</div>
					</div>
				)}
			</div>
		</nav>
	)
}

export default Navigation
