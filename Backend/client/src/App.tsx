import { BrowserRouter, Routes, Route } from 'react-router-dom'
import StarknetProvider from './dojo/starknet-provider'
import Providers from './components/providers'
import Markets from './components/markets'
import ProfilePage from './components/profile-page'
import { useViewportHeight } from './hooks/useViewportHeight'
import './globals.css'

// Page wrapper component matching original Frontend
function PageWrapper({ children }: { children: React.ReactNode }) {
  const viewportHeight = useViewportHeight()

  return (
    <main
      className="w-screen overflow-hidden"
      style={{
        height: viewportHeight ? `${viewportHeight}px` : '100vh',
        backgroundColor: '#27262c',
      }}
    >
      <div
        className="w-full max-w-md md:max-w-xl mx-auto relative"
        style={{
          height: '100%',
          paddingTop: 'env(safe-area-inset-top, 0px)',
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        }}
      >
        {children}
      </div>
    </main>
  )
}

// Coming Soon pages
function ComingSoon({ title }: { title: string }) {
  return (
    <PageWrapper>
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-yellow-400 mb-4">{title}</h1>
          <p className="text-yellow-400 opacity-75">Coming Soon</p>
        </div>
      </div>
    </PageWrapper>
  )
}

function App() {
  return (
    <StarknetProvider>
      <Providers>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PageWrapper><ProfilePage /></PageWrapper>} />
            <Route path="/markets" element={<PageWrapper><Markets /></PageWrapper>} />
            <Route path="/profile" element={<PageWrapper><ProfilePage /></PageWrapper>} />
            <Route path="/history" element={<ComingSoon title="History" />} />
            <Route path="/ai" element={<ComingSoon title="AI" />} />
          </Routes>
        </BrowserRouter>
      </Providers>
    </StarknetProvider>
  )
}

export default App
