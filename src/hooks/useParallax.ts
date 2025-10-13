import { useEffect, useRef, useState } from 'react'

interface ParallaxOptions {
	speed?: number
	direction?: 'up' | 'down' | 'left' | 'right'
}

export const useParallax = (options: ParallaxOptions = {}) => {
	const { speed = 0.5, direction = 'up' } = options
	const ref = useRef<HTMLDivElement>(null)
	const [offset, setOffset] = useState(0)

	useEffect(() => {
		const element = ref.current
		if (!element) return

		const handleScroll = () => {
			const rect = element.getBoundingClientRect()
			const scrollY = window.scrollY
			const elementTop = rect.top + scrollY
			const windowHeight = window.innerHeight

			// Вычисляем смещение только когда элемент виден
			if (rect.top < windowHeight && rect.bottom > 0) {
				const scrollProgress =
					(scrollY + windowHeight - elementTop) / (windowHeight + rect.height)
				const parallaxOffset = scrollProgress * 100 * speed
				setOffset(parallaxOffset)
			}
		}

		handleScroll() // Вызываем сразу для начального состояния
		window.addEventListener('scroll', handleScroll, { passive: true })

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [speed])

	const getTransform = () => {
		switch (direction) {
			case 'up':
				return `translateY(-${offset}px)`
			case 'down':
				return `translateY(${offset}px)`
			case 'left':
				return `translateX(-${offset}px)`
			case 'right':
				return `translateX(${offset}px)`
			default:
				return `translateY(-${offset}px)`
		}
	}

	return {
		ref,
		style: {
			transform: getTransform(),
			transition: 'transform 0.1s ease-out',
		},
	}
}
