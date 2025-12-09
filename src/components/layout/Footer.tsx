import {useScrollAnimation} from '@/hooks/useGsapAnimation'
import {Github, Mail, MessageCircle} from 'lucide-react'
import {Link, useLocation} from 'react-router-dom'

const Footer = () => {
	const footerRef = useScrollAnimation('fadeIn')
	const location = useLocation()

	const navigationLinks = [
		{ to: '/', label: 'Главная' },
		{ to: '/about', label: 'О мне' },
		{ to: '/skills', label: 'Навыки' },
		{ to: '/projects', label: 'Проекты' },
		{ to: '/contact', label: 'Контакты' },
	]

	const socialLinks = [
		{
			href: 'https://vk.com/id522748848',
			icon: Mail,
			label: 'Email',
			ariaLabel: 'Написать на email',
		},
		{
			href: 'https://t.me/artem-front',
			icon: MessageCircle,
			label: 'Telegram',
			ariaLabel: 'Открыть Telegram',
			external: true,
		},
		{
			href: 'https://github.com/CyberArt2718281',
			icon: Github,
			label: 'GitHub',
			ariaLabel: 'Посмотреть GitHub профиль',
			external: true,
		},
	]

	return (
		<footer className='py-8 bg-background/98 backdrop-blur-xl border-t border-primary/10 mt-auto'>
			<div className='container mx-auto px-4'>
				<div className='max-w-6xl mx-auto'>
					{/* Основной контент */}
					<div className='flex flex-col md:flex-row justify-between items-center gap-6 mb-6'>
						{/* Лого/Имя */}
						<div className='text-center md:text-left'>
							<Link to='/' className='group'>
								<h3 className='text-xl font-bold bg-gradient-primary bg-clip-text text-transparent hover:opacity-80 transition-opacity whitespace-nowrap'>
									{'<Артём Dev />'}
								</h3>
								<p className='text-xs text-muted-foreground mt-1'>
									Frontend Developer
								</p>
							</Link>
						</div>

						{/* Навигация */}
						<nav className='flex flex-wrap justify-center gap-1'>
							{navigationLinks.map(link => (
								<Link
									key={link.to}
									to={link.to}
									className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
										location.pathname === link.to
											? 'bg-primary/10 text-primary shadow-sm shadow-primary/20'
											: 'text-foreground/70 hover:text-primary hover:bg-primary/5'
									}`}
								>
									{link.label}
									{location.pathname === link.to && (
										<span className='absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-primary rounded-full' />
									)}
								</Link>
							))}
						</nav>

						{/* Социальные сети */}
						<div className='flex items-center gap-3'>
							{socialLinks.map(social => {
								const Icon = social.icon
								return (
									<a
										key={social.href}
										href={social.href}
										aria-label={social.ariaLabel}
										{...(social.external && {
											target: '_blank',
											rel: 'noopener noreferrer',
										})}
										className='w-9 h-9 rounded-full bg-primary/5 hover:bg-primary/15 border border-primary/20 hover:border-primary/40 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm hover:shadow-primary/20'
									>
										<Icon className='w-4 h-4 text-foreground/70 hover:text-primary transition-colors' />
									</a>
								)
							})}
						</div>
					</div>

					{/* Нижняя часть */}
					<div className='border-t border-primary/20 pt-6'>
						<div className='flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-muted-foreground'>
							<p>© 2025 Артём dev. Все права защищены</p>
							<p className='flex items-center gap-1'>
								Сделано с <span className='text-primary'>❤</span> на React +
								TypeScript
							</p>
							<a
								href='/privacy.html'
								target='_blank'
								rel='noopener noreferrer'
								className='underline text-primary hover:text-accent transition-colors'
							>
								Политика конфиденциальности
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
