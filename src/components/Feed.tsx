'use client'

import { useState } from 'react'
import { Heart, MessageCircle, Repeat2, Share2, MoreHorizontal } from 'lucide-react'

interface WeiboPost {
  id: string
  user: {
    name: string
    handle: string
    avatar: string
  }
  content: string
  images?: string[]
  likes: number
  comments: number
  reposts: number
  timestamp: string
  isLiked: boolean
}

const mockPosts: WeiboPost[] = [
  {
    id: '1',
    user: {
      name: '科技新闻',
      handle: '@tech_news',
      avatar: '/avatars/tech.jpg',
    },
    content: '【重磅】AI技术再突破！最新研究表明，大型语言模型在代码生成方面已经达到专业程序员水平。这将彻底改变软件开发行业。 #AI #科技前沿',
    likes: 1234,
    comments: 567,
    reposts: 890,
    timestamp: '2小时前',
    isLiked: false,
  },
  {
    id: '2',
    user: {
      name: '美食博主',
      handle: '@foodie',
      avatar: '/avatars/food.jpg',
    },
    content: '今天分享一道简单又美味的家常菜——红烧排骨！🍖\n\n材料：排骨500g、生姜、大葱、八角、桂皮、生抽、老抽、料酒、冰糖\n\n做法：\n1. 排骨焯水去血沫\n2. 炒糖色\n3. 加入排骨翻炒\n4. 加水炖煮40分钟\n5. 大火收汁\n\n超级下饭！😋 #美食 #家常菜',
    images: ['/images/ribs.jpg'],
    likes: 892,
    comments: 234,
    reposts: 456,
    timestamp: '3小时前',
    isLiked: true,
  },
  {
    id: '3',
    user: {
      name: '旅行日记',
      handle: '@travel',
      avatar: '/avatars/travel.jpg',
    },
    content: '终于去了心心念念的西藏！🏔️ 布达拉宫真的太壮观了，站在广场上仰望这座宫殿，内心充满了敬畏。西藏的天空蓝得让人窒息，每一帧都是壁纸级别的风景。\n\n#西藏旅行 #布达拉宫 #心灵之旅',
    images: ['/images/tibet1.jpg', '/images/tibet2.jpg', '/images/tibet3.jpg'],
    likes: 2345,
    comments: 789,
    reposts: 1234,
    timestamp: '5小时前',
    isLiked: false,
  },
]

export default function Feed() {
  const [posts, setPosts] = useState(mockPosts)

  const toggleLike = (id: string) => {
    setPosts(posts.map(post => {
      if (post.id === id) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
        }
      }
      return post
    }))
  }

  return (
    <div className="space-y-4">
      {/* Post Composer */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex gap-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0" />
          <div className="flex-1">
            <textarea
              placeholder="有什么新鲜事想分享？"
              className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:border-weibo-red focus:ring-1 focus:ring-weibo-red"
              rows={3}
            />
            <div className="flex justify-between items-center mt-3">
              <div className="flex gap-2">
                <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">
                  📷 图片
                </button>
                <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">
                  📹 视频
                </button>
                <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">
                  📊 投票
                </button>
              </div>
              <button className="px-6 py-2 bg-weibo-red text-white rounded-full hover:bg-weibo-orange transition-colors">
                发布
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Posts */}
      {posts.map((post) => (
        <article key={post.id} className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
          {/* Post Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">{post.user.name}</h3>
                <p className="text-sm text-gray-500">{post.user.handle} · {post.timestamp}</p>
              </div>
            </div>
            <button className="p-1 hover:bg-gray-100 rounded">
              <MoreHorizontal className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Post Content */}
          <div className="mb-3">
            <p className="text-gray-800 whitespace-pre-line">{post.content}</p>
          </div>

          {/* Post Images */}
          {post.images && post.images.length > 0 && (
            <div className="mb-3 grid gap-2 grid-cols-3">
              {post.images.map((img, idx) => (
                <div key={idx} className="aspect-square bg-gray-100 rounded-lg" />
              ))}
            </div>
          )}

          {/* Post Actions */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <button className="flex items-center gap-1 text-gray-500 hover:text-green-500 transition-colors">
              <Repeat2 className="w-5 h-5" />
              <span className="text-sm">{post.reposts}</span>
            </button>
            <button className="flex items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors">
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm">{post.comments}</span>
            </button>
            <button
              className={`flex items-center gap-1 transition-colors ${
                post.isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
              }`}
              onClick={() => toggleLike(post.id)}
            >
              <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
              <span className="text-sm">{post.likes}</span>
            </button>
            <button className="flex items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </article>
      ))}
    </div>
  )
}
