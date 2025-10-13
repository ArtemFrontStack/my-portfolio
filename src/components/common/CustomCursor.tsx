import { useEffect, useRef, useState } from 'react'

const CustomCursor = () => {
	const cursorRef = useRef<HTMLDivElement>(null)
	const trailRef = useRef<HTMLDivElement>(null)
	const [isPointer, setIsPointer] = useState(false)

	useEffect(() => {
		const cursor = cursorRef.current
		const trail = trailRef.current
		if (!cursor || !trail) return

		let mouseX = 0
		let mouseY = 0
		let cursorX = 0
		let cursorY = 0
		let trailX = 0
		let trailY = 0

		const handleMouseMove = (e: MouseEvent) => {
			mouseX = e.clientX
			mouseY = e.clientY

			// Проверка, наведен ли курсор на интерактивный элемент
			const target = e.target as HTMLElement
			const isClickable =
				target.tagName === 'BUTTON' ||
				target.tagName === 'A' ||
				target.closest('button') ||
				target.closest('a') ||
				window.getComputedStyle(target).cursor === 'pointer'

			setIsPointer(!!isClickable)
		}

		const animate = () => {
			// Плавное следование основного курсора
			cursorX += (mouseX - cursorX) * 0.2
			cursorY += (mouseY - cursorY) * 0.2

			// Еще более плавное следование хвоста
			trailX += (mouseX - trailX) * 0.1
			trailY += (mouseY - trailY) * 0.1

			cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`
			trail.style.transform = `translate(${trailX}px, ${trailY}px)`

			requestAnimationFrame(animate)
		}

		window.addEventListener('mousemove', handleMouseMove)
		const animationId = requestAnimationFrame(animate)

		return () => {
			window.removeEventListener('mousemove', handleMouseMove)
			cancelAnimationFrame(animationId)
		}
	}, [])

	return (
		<>
			{/* Хвост курсора */}
			<div
				ref={trailRef}
				className={`fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] transition-all duration-300 ${
					isPointer ? 'w-12 h-12 bg-primary/20' : 'bg-primary/10'
				}`}
				style={{
					transform: 'translate(-50%, -50%)',
					mixBlendMode: 'difference',
				}}
			/>
			{/* Основной курсор */}
			<div
				ref={cursorRef}
				className={`fixed top-0 left-0 w-2 h-2 rounded-full bg-primary pointer-events-none z-[10000] transition-all duration-100 ${
					isPointer ? 'w-3 h-3' : ''
				}`}
				style={{
					transform: 'translate(-50%, -50%)',
				}}
			/>
		</>
	)
}

export default CustomCursor
