import { useEffect, useRef } from 'react'

interface Particle {
	x: number
	y: number
	vx: number
	vy: number
	size: number
	opacity: number
}

const ParticleBackground = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const particlesRef = useRef<Particle[]>([])
	const animationFrameRef = useRef<number>()

	useEffect(() => {
		const canvas = canvasRef.current
		if (!canvas) return

		const ctx = canvas.getContext('2d')
		if (!ctx) return

		// Установка размеров canvas
		const resizeCanvas = () => {
			canvas.width = window.innerWidth
			canvas.height = window.innerHeight
		}
		resizeCanvas()
		window.addEventListener('resize', resizeCanvas)

		// Инициализация частиц
		const particleCount = Math.min(
			Math.floor((window.innerWidth * window.innerHeight) / 15000),
			100
		)
		particlesRef.current = Array.from({ length: particleCount }, () => ({
			x: Math.random() * canvas.width,
			y: Math.random() * canvas.height,
			vx: (Math.random() - 0.5) * 0.5,
			vy: (Math.random() - 0.5) * 0.5,
			size: Math.random() * 2 + 1,
			opacity: Math.random() * 0.5 + 0.2,
		}))

		// Анимация
		const animate = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height)

			particlesRef.current.forEach((particle, i) => {
				// Обновление позиции
				particle.x += particle.vx
				particle.y += particle.vy

				// Отражение от границ
				if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
				if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

				// Ограничение координат
				particle.x = Math.max(0, Math.min(canvas.width, particle.x))
				particle.y = Math.max(0, Math.min(canvas.height, particle.y))

				// Отрисовка частицы
				ctx.beginPath()
				ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
				ctx.fillStyle = `hsla(220, 90%, 60%, ${particle.opacity})`
				ctx.fill()

				// Соединение близких частиц линиями
				particlesRef.current.slice(i + 1).forEach(otherParticle => {
					const dx = particle.x - otherParticle.x
					const dy = particle.y - otherParticle.y
					const distance = Math.sqrt(dx * dx + dy * dy)

					if (distance < 150) {
						ctx.beginPath()
						ctx.moveTo(particle.x, particle.y)
						ctx.lineTo(otherParticle.x, otherParticle.y)
						ctx.strokeStyle = `hsla(220, 90%, 60%, ${
							0.15 * (1 - distance / 150)
						})`
						ctx.lineWidth = 1
						ctx.stroke()
					}
				})
			})

			animationFrameRef.current = requestAnimationFrame(animate)
		}

		animate()

		return () => {
			window.removeEventListener('resize', resizeCanvas)
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current)
			}
		}
	}, [])

	return (
		<canvas
			ref={canvasRef}
			className='fixed inset-0 pointer-events-none'
			style={{ opacity: 0.5, zIndex: 5 }}
		/>
	)
}

export default ParticleBackground
