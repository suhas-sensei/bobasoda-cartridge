"use client"

import Profile from "./profile"
import BottomNav from "./bottom-nav"

export default function ProfilePage() {
  return (
    <div className="relative h-full w-full">
      <Profile />
      <BottomNav />
    </div>
  )
}
