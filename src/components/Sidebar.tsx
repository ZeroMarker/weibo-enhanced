import Link from 'next/link'
import { Home, TrendingUp, Bookmark, Users, Settings } from 'lucide-react'

const menuItems = [
  { icon: Home, label: '首页', href: '/' },
  { icon: TrendingUp, label: '热门', href: '/trending' },
  { icon: Bookmark, label: '收藏', href: '/bookmarks' },
  { icon: Users, label: '好友', href: '/friends' },
  { icon: Settings, label: '设置', href: '/settings' },
]

export default function Sidebar() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sticky top-20">
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <item.icon className="w-5 h-5 text-gray-600" />
            <span className="text-gray-800">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}
