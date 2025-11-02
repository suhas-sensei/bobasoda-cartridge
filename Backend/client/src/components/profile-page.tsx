import { useEffect, useState } from "react"
import { useAccount, useConnect, useDisconnect } from "@starknet-react/core"
import Profile from "./profile"
import BottomNav from "./bottom-nav"
import { useWalletInitialize } from "../hooks/useWalletInitialize"

export default function ProfilePage() {
  const { address, status, account } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const { isInitialized, isInitializing } = useWalletInitialize()
  const [balance, setBalance] = useState("0.00")
  const [isLoadingBalance, setIsLoadingBalance] = useState(false)

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

  // Fetch STRK balance
  useEffect(() => {
    async function fetchBalance() {
      if (!address || !account) {
        setBalance("0.00")
        return
      }

      setIsLoadingBalance(true)
      try {
        const { Contract } = await import('starknet')

        // STRK token contract address (same for both mainnet and sepolia)
        const STRK_ADDRESS = '0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d'

        console.log('🔍 Fetching STRK balance for address:', address)
        console.log('🌐 Using STRK contract:', STRK_ADDRESS)
        console.log('🎮 Using Cartridge account provider')

        // ERC20 ABI for balanceOf
        const erc20Abi = [
          {
            name: 'balanceOf',
            type: 'function',
            inputs: [{ name: 'account', type: 'felt' }],
            outputs: [{ name: 'balance', type: 'Uint256' }],
            stateMutability: 'view',
          },
        ]

        // Use the account's provider (Cartridge wallet provider)
        const strkContract = new Contract(erc20Abi, STRK_ADDRESS, account.provider)
        console.log('📞 Calling balanceOf...')
        const balanceResult = await strkContract.balanceOf(address)
        console.log('📦 Raw balance result:', balanceResult)

        // Handle Uint256 response (low, high)
        let balanceInWei: bigint
        if (typeof balanceResult === 'object' && 'low' in balanceResult) {
          const low = BigInt(balanceResult.low || 0)
          const high = BigInt(balanceResult.high || 0)
          balanceInWei = low + (high << 128n)
          console.log('🔢 Uint256 low:', low.toString(), 'high:', high.toString())
        } else {
          balanceInWei = BigInt(balanceResult || 0)
        }

        const balanceInStrk = Number(balanceInWei) / 1e18
        setBalance(balanceInStrk.toFixed(4))

        console.log('💰 STRK Balance:', balanceInStrk.toFixed(4), 'STRK')
        console.log('📊 Raw balance (wei):', balanceInWei.toString())
      } catch (error) {
        console.error('❌ Failed to fetch STRK balance:', error)
        console.error('❌ Error details:', JSON.stringify(error, null, 2))
        setBalance("0.00")
      } finally {
        setIsLoadingBalance(false)
      }
    }

    fetchBalance()

    // Refresh balance every 10 seconds
    const interval = setInterval(fetchBalance, 10000)
    return () => clearInterval(interval)
  }, [address, account])

  return (
    <div className="relative h-full w-full">
      <Profile
        onConnectWallet={handleConnectWallet}
        onDisconnectWallet={handleDisconnectWallet}
        isConnected={status === 'connected'}
        walletAddress={address || ''}
        balance={balance}
        isLoadingBalance={isLoadingBalance}
      />
      <BottomNav />
    </div>
  )
}
