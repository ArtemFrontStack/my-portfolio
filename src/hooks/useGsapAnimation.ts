import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

export const useScrollAnimation = (
	animation:
		| 'fadeIn'
		| 'slideUp'
		| 'slideLeft'
		| 'slideRight'
		| 'scale'
		| 'reveal' = 'fadeIn'
) => {
	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const element = ref.current
		if (!element) return

		switch (animation) {
			case 'fadeIn':
				gsap.fromTo(
					element,
					{ opacity: 0 },
					{
						opacity: 1,
						duration: 1,
						scrollTrigger: {
							trigger: element,
							start: 'top 80%',
							toggleActions: 'play none none none',
						},
					}
				)
				break

			case 'slideUp':
				gsap.fromTo(
					element,
					{ y: 100, opacity: 0 },
					{
						y: 0,
						opacity: 1,
						duration: 1,
						ease: 'power3.out',
						scrollTrigger: {
							trigger: element,
							start: 'top 80%',
							toggleActions: 'play none none none',
						},
					}
				)
				break

			case 'slideLeft':
				gsap.fromTo(
					element,
					{ x: 100, opacity: 0 },
					{
						x: 0,
						opacity: 1,
						duration: 1,
						ease: 'power3.out',
						scrollTrigger: {
							trigger: element,
							start: 'top 80%',
							toggleActions: 'play none none none',
						},
					}
				)
				break

			case 'slideRight':
				gsap.fromTo(
					element,
					{ x: -100, opacity: 0 },
					{
						x: 0,
						opacity: 1,
						duration: 1,
						ease: 'power3.out',
						scrollTrigger: {
							trigger: element,
							start: 'top 80%',
							toggleActions: 'play none none none',
						},
					}
				)
				break

			case 'scale':
				gsap.fromTo(
					element,
					{ scale: 0.8, opacity: 0 },
					{
						scale: 1,
						opacity: 1,
						duration: 1,
						ease: 'back.out(1.7)',
						scrollTrigger: {
							trigger: element,
							start: 'top 80%',
							toggleActions: 'play none none none',
						},
					}
				)
				break

			case 'reveal':
				gsap.fromTo(
					element,
					{ clipPath: 'inset(0 100% 0 0)' },
					{
						clipPath: 'inset(0 0% 0 0)',
						duration: 1.2,
						ease: 'power4.out',
						scrollTrigger: {
							trigger: element,
							start: 'top 80%',
							toggleActions: 'play none none none',
						},
					}
				)
				break
		}

		return () => {
			ScrollTrigger.getAll().forEach(trigger => {
				if (trigger.trigger === element) {
					trigger.kill()
				}
			})
		}
	}, [animation])

	return ref
}

export const useStaggerAnimation = () => {
	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const element = ref.current
		if (!element) return

		const children = Array.from(element.children) as HTMLElement[]

		gsap.fromTo(
			children,
			{ y: 50, opacity: 0 },
			{
				y: 0,
				opacity: 1,
				duration: 0.8,
				stagger: 0.1,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: element,
					start: 'top 80%',
					toggleActions: 'play none none none',
				},
			}
		)

		return () => {
			ScrollTrigger.getAll().forEach(trigger => {
				if (trigger.trigger === element) {
					trigger.kill()
				}
			})
		}
	}, [])

	return ref
}
