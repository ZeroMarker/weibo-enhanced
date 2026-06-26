import type { WeiboUser } from '@/lib/weibo'
import { Users, MessageSquare, Heart } from 'lucide-react'

interface ProfileCardProps {
  user: WeiboUser
}

export default function ProfileCard({ user }: ProfileCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      {/* Cover */}
      <div className="h-32 bg-gradient-to-r from-weibo-red to-weibo-orange" />

      {/* Profile Info */}
      <div className="px-6 pb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-12">
          <img
            src={user.avatar_hd || user.avatar_large || user.profile_image_url}
            alt={user.screen_name}
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
              target.nextElementSibling?.classList.remove('hidden')
            }}
          />
          <div className="hidden w-24 h-24 rounded-full border-4 border-white shadow-lg bg-weibo-red items-center justify-center">
            <span className="text-white text-3xl font-bold">
              {user.screen_name.charAt(0)}
            </span>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-gray-900">{user.screen_name}</h1>
              {user.verified && (
                <span className="px-2 py-0.5 bg-weibo-red text-white text-xs rounded-full">
                  {user.verified_reason || '认证用户'}
                </span>
              )}
            </div>
            <p className="text-gray-500 mt-1">@{user.name}</p>
            {user.description && (
              <p className="text-gray-600 mt-2">{user.description}</p>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-6 mt-6 pt-6 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-gray-400" />
            <div>
              <p className="font-semibold text-gray-900">{formatCount(user.followers_count)}</p>
              <p className="text-xs text-gray-500">粉丝</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-gray-400" />
            <div>
              <p className="font-semibold text-gray-900">{formatCount(user.friends_count)}</p>
              <p className="text-xs text-gray-500">关注</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-gray-400" />
            <div>
              <p className="font-semibold text-gray-900">{formatCount(user.statuses_count)}</p>
              <p className="text-xs text-gray-500">微博</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function formatCount(count: number): string {
  if (count >= 10000) {
    return (count / 10000).toFixed(1) + '万'
  }
  return count.toString()
}
