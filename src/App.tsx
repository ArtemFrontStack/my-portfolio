import Layout from '@/components/layout/Layout'
import PageLoader from '@/components/common/PageLoader'
import ScrollToTopOnMount from '@/components/common/ScrollToTopOnMount'
import {Toaster as Sonner} from '@/components/ui/sonner'
import {Toaster} from '@/components/ui/toaster'
import {TooltipProvider} from '@/components/ui/tooltip'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {useEffect, useState} from 'react'
import {BrowserRouter, Route, Routes, useLocation} from 'react-router-dom'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import Index from './pages/Index'
import NotFound from './pages/NotFound'
import ProjectsPage from './pages/ProjectsPage'
import SkillsPage from './pages/SkillsPage'

const queryClient = new QueryClient()

const validPaths = ['/', '/about', '/skills', '/projects', '/contact']

const AppContent = () => {
	const location = useLocation()
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		if (!validPaths.includes(location.pathname)) {
			setIsLoading(false)
			return
		}
		const timer = setTimeout(() => setIsLoading(false), 2000)
		return () => clearTimeout(timer)
	}, [location.pathname])

	if (!validPaths.includes(location.pathname)) {
		return <NotFound />
	}

	if (isLoading) {
		return <PageLoader />
	}

	return (
		<>
			<ScrollToTopOnMount />
			<Layout>
				<Routes>
					<Route path='/' element={<Index />} />
					<Route path='/about' element={<AboutPage />} />
					<Route path='/skills' element={<SkillsPage />} />
					<Route path='/projects' element={<ProjectsPage />} />
					<Route path='/contact' element={<ContactPage />} />
					<Route path='*' element={<NotFound />} />
				</Routes>
			</Layout>
		</>
	)
}

const App = () => (
	<QueryClientProvider client={queryClient}>
		<TooltipProvider>
			<Toaster />
			<Sonner />
			<BrowserRouter>
				<AppContent />
			</BrowserRouter>
		</TooltipProvider>
	</QueryClientProvider>
)

export default App