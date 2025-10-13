import { ReactNode } from 'react'
import Footer from './Footer'
import Navigation from './Navigation'
import ParticleBackground from '../common/ParticleBackground'
import ScrollToTop from '../common/ScrollToTop'
import ScrollToTopOnMount from '../common/ScrollToTopOnMount'

interface LayoutProps {
	children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
	return (
		<>
			<ScrollToTopOnMount />
			<div className='fixed inset-0 bg-background -z-10' />
			<ParticleBackground />
			<div className='min-h-screen relative flex flex-col'>
				<Navigation />
				<main>{children}</main>
				<ScrollToTop />
				<Footer />
			</div>
		</>
	)
}

export default Layout
