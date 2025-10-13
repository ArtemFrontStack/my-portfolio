import { useRef } from 'react'

interface RippleButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode
}

const RippleButton: React.FC<RippleButtonProps> = ({
	children,
	className = '',
	...props
}) => {
	const buttonRef = useRef<HTMLButtonElement>(null)

	const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
		const button = buttonRef.current
		if (!button) return

		const rect = button.getBoundingClientRect()
		const size = Math.max(rect.width, rect.height)
		const x = event.clientX - rect.left - size / 2
		const y = event.clientY - rect.top - size / 2

		const ripple = document.createElement('span')
		ripple.style.width = ripple.style.height = `${size}px`
		ripple.style.left = `${x}px`
		ripple.style.top = `${y}px`
		ripple.classList.add('ripple')

		button.appendChild(ripple)

		setTimeout(() => {
			ripple.remove()
		}, 600)
	}

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		createRipple(event)
		props.onClick?.(event)
	}

	return (
		<button
			ref={buttonRef}
			className={`relative overflow-hidden ${className}`}
			{...props}
			onClick={handleClick}
		>
			{children}
		</button>
	)
}

export default RippleButton
