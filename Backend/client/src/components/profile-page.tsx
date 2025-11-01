import { useEffect } from "react"
import { useAccount, useConnect, useDisconnect } from "@starknet-react/core"
import Profile from "./profile"
import BottomNav from "./bottom-nav"
import { useWalletInitialize } from "../hooks/useWalletInitialize"

export default function ProfilePage() {
  const { address, status } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const { isInitialized, isInitializing } = useWalletInitialize()

  // Get Cartridge connector (first one)
  const cartridgeConnector = connectors[0]

  const handleConnectWallet = () => {
    if (cartridgeConnector) {
      console.log('🎮 Connecting to Cartridge wallet...')
      connect({ connector: cartridgeConnector })
    }
  }

  const handleDisconnectWallet = () => {
    console.log('👋 Disconnecting wallet...')
    disconnect()
  }

  useEffect(() => {
    if (address) {
      console.log('📍 Wallet address:', address)
      console.log('📊 Connection status:', status)
      console.log('✅ Player initialized:', isInitialized)
      console.log('⏳ Initializing:', isInitializing)
    }
  }, [address, status, isInitialized, isInitializing])

  return (
    <div className="relative h-full w-full">
      <Profile
        onConnectWallet={handleConnectWallet}
        onDisconnectWallet={handleDisconnectWallet}
        isConnected={status === 'connected'}
        walletAddress={address || ''}
      />
      <BottomNav />
    </div>
  )
}
