import { BrowserRouter, Routes, Route } from 'react-router-dom'
import StarknetProvider from './dojo/starknet-provider'
import Providers from './components/providers'
import Markets from './components/markets'
import ProfilePage from './components/profile-page'
import BottomNav from './components/bottom-nav'
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

// History page - Transaction list with Frontend color scheme
function History() {
  const transactions = [
    { type: 'received', date: '26/07/2019', amount: '+0.306', currency: 'STRK' },
    { type: 'sent', date: '26/07/2019', amount: '-0.46', currency: 'STRK' },
    { type: 'received', date: '26/07/2019', amount: '+0.426', currency: 'STRK' },
    { type: 'sent', date: '26/07/2019', amount: '-0.25', currency: 'STRK' },
    { type: 'received', date: '26/07/2019', amount: '+0.106', currency: 'STRK' },
  ]

  return (
    <PageWrapper>
      <div className="relative h-full w-full flex flex-col" style={{ backgroundColor: '#27262c' }}>
        {/* Header Spacer */}
        <div
          className="mb-4"
          style={{
            height: 'calc(1rem + env(safe-area-inset-top, 0px))',
          }}
        />

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-6 px-8">
          Activity
        </h1>

        {/* Transaction List */}
        <div className="flex-1 overflow-y-auto px-6 pb-4">
          {transactions.map((transaction, index) => (
            <div
              key={index}
              className="bg-white bg-opacity-10 rounded-3xl p-6 mb-4 flex items-center justify-between hover:bg-opacity-15 transition"
            >
              {/* Icon and Details */}
              <div className="flex items-center gap-5">
                {/* Arrow Icon */}
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    transaction.type === 'received'
                      ? 'bg-green-500 bg-opacity-20'
                      : 'bg-red-500 bg-opacity-20'
                  }`}
                >
                  {transaction.type === 'received' ? (
                    <svg
                      className="w-6 h-6 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-6 h-6 text-red-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 10l7-7m0 0l7 7m-7-7v18"
                      />
                    </svg>
                  )}
                </div>

                {/* Transaction Type and Date */}
                <div>
                  <p className="text-white font-semibold text-lg">
                    {transaction.type === 'received' ? 'Received' : 'Sent'}
                  </p>
                  <p className="text-white text-base opacity-50">
                    {transaction.date}
                  </p>
                </div>
              </div>

              {/* Amount */}
              <div className="text-right">
                <p
                  className={`font-bold text-xl ${
                    transaction.type === 'received'
                      ? 'text-yellow-400'
                      : 'text-yellow-400 opacity-60'
                  }`}
                >
                  {transaction.amount} {transaction.currency}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Navigation Spacer */}
        <div
          className="mt-auto"
          style={{
            height: 'calc(5.5rem + env(safe-area-inset-bottom, 0px))',
          }}
        />

        <BottomNav />
      </div>
    </PageWrapper>
  )
}

// AI page - matching Frontend exactly
function AI() {
  return (
    <PageWrapper>
      <div className="relative h-full w-full">
        <div className="h-full w-full flex flex-col items-center justify-center p-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-yellow-400 mb-4">
            AI Assistant
          </h1>
          <p className="text-yellow-400 opacity-75 text-lg text-center">
            Coming soon...
          </p>
        </div>
        <BottomNav />
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
            <Route path="/history" element={<History />} />
            <Route path="/ai" element={<AI />} />
          </Routes>
        </BrowserRouter>
      </Providers>
    </StarknetProvider>
  )
}

export default App
