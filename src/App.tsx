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

const App = () => {
	const location = useLocation();
	const validPaths = ['/', '/about', '/skills', '/projects', '/contact'];
	const isValidPath = validPaths.includes(location.pathname);

	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		if (!isValidPath) {
			setIsLoading(false);
			return;
		}
		// Показываем loader только при первой загрузке
		const timer = setTimeout(() => {
			setIsLoading(false)
		}, 2000)

		return () => clearTimeout(timer)
	}, [isValidPath])

	if (!isValidPath) {
		return <NotFound />;
	}

	if (isLoading) {
		return <PageLoader />
	}

	return (
		<QueryClientProvider client={queryClient}>
			<TooltipProvider>
				<Toaster />
				<Sonner />
				<BrowserRouter>
					<ScrollToTopOnMount />
					<Layout>
						<Routes>
							<Route path='/' element={<Index />} />
							<Route path='/about' element={<AboutPage />} />
							<Route path='/skills' element={<SkillsPage />} />
							<Route path='/projects' element={<ProjectsPage />} />
							<Route path='/contact' element={<ContactPage />} />
							{/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
							<Route path='*' element={<NotFound />} />
						</Routes>
					</Layout>
				</BrowserRouter>
			</TooltipProvider>
		</QueryClientProvider>
	)
}

export default App