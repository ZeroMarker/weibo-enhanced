'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, Bell, MessageCircle, User, LogOut } from 'lucide-react'
import type { WeiboUser } from '@/lib/weibo'

export default function Header() {
  const [user, setUser] = useState<WeiboUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showMenu, setShowMenu] = useState(false)

  useEffect(() => {
    fetch('/api/auth/user')
      .then(res => res.ok ? res.json() : null)
      .then(data => setUser(data?.user || null))
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false))
  }, [])

  const handleLogout = async () => {
    await fetch('/api/auth/user', { method: 'DELETE' })
    setUser(null)
    window.location.href = '/login'
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-weibo-red">微博</span>
          <span className="text-sm text-gray-500">Enhanced</span>
        </Link>

        <div className="flex-1 max-w-xl mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="搜索微博内容、用户..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:border-weibo-red focus:ring-1 focus:ring-weibo-red"
            />
          </div>
        </div>

        <nav className="flex items-center gap-4">
          {isLoading ? (
            <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
          ) : user ? (
            <>
              <button className="relative p-2 hover:bg-gray-100 rounded-full">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <button className="relative p-2 hover:bg-gray-100 rounded-full">
                <MessageCircle className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="flex items-center gap-2 p-1 hover:bg-gray-100 rounded-full"
                >
                  <img
                    src={user.avatar_large || user.profile_image_url}
                    alt={user.screen_name}
                    className="w-8 h-8 rounded-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                      target.nextElementSibling?.classList.remove('hidden')
                    }}
                  />
                  <div className="hidden w-8 h-8 bg-weibo-red rounded-full items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {user.screen_name.charAt(0)}
                    </span>
                  </div>
                </button>

                {showMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="font-semibold text-gray-900">{user.screen_name}</p>
                      <p className="text-xs text-gray-500">粉丝: {user.followers_count}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="w-4 h-4" />
                      退出登录
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 px-4 py-2 bg-weibo-red text-white rounded-lg hover:bg-weibo-orange transition-colors"
            >
              <User className="w-4 h-4" />
              登录
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}
