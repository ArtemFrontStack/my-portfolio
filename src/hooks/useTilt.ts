import { useEffect, useRef } from 'react'

interface TiltOptions {
	max?: number
	perspective?: number
	scale?: number
	speed?: number
	easing?: string
}

export const useTilt = (options: TiltOptions = {}) => {
	const {
		max = 15,
		perspective = 1000,
		scale = 1.05,
		speed = 400,
		easing = 'cubic-bezier(.03,.98,.52,.99)',
	} = options

	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const element = ref.current
		if (!element) return

		let rafId: number
		let isAnimating = false

		const handleMouseMove = (e: MouseEvent) => {
			if (isAnimating) return
			isAnimating = true
			const rect = element.getBoundingClientRect()
			const x = e.clientX - rect.left
			const y = e.clientY - rect.top
			const centerX = rect.width / 2
			const centerY = rect.height / 2

			const percentX = (x - centerX) / centerX
			const percentY = (y - centerY) / centerY

			const tiltX = percentY * max
			const tiltY = -percentX * max

			rafId = requestAnimationFrame(() => {
				element.style.transform = `
          perspective(${perspective}px)
          rotateX(${tiltX}deg)
          rotateY(${tiltY}deg)
          scale3d(${scale}, ${scale}, ${scale})
        `
				isAnimating = false
			})
		}

		const handleMouseLeave = () => {
			cancelAnimationFrame(rafId)
			element.style.transition = `transform ${speed}ms ${easing}`
			element.style.transform = `
        perspective(${perspective}px)
        rotateX(0deg)
        rotateY(0deg)
        scale3d(1, 1, 1)
      `
		}

		const handleMouseEnter = () => {
			element.style.transition = 'none'
		}

		element.addEventListener('mousemove', handleMouseMove)
		element.addEventListener('mouseleave', handleMouseLeave)
		element.addEventListener('mouseenter', handleMouseEnter)

		return () => {
			element.removeEventListener('mousemove', handleMouseMove)
			element.removeEventListener('mouseleave', handleMouseLeave)
			element.removeEventListener('mouseenter', handleMouseEnter)
			cancelAnimationFrame(rafId)
		}
	}, [max, perspective, scale, speed, easing])

	return ref
}
