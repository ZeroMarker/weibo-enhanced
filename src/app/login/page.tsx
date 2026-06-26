'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = () => {
    setIsLoading(true)
    window.location.href = '/api/auth/login'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-weibo-red rounded-full mb-4">
              <span className="text-3xl font-bold text-white">微</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">微博增强版</h1>
            <p className="text-gray-500 mt-2">使用微博账号登录</p>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 bg-weibo-red hover:bg-weibo-orange text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                跳转中...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10.098 20c-4.612 0-8.348-2.397-8.348-5.353 0-1.553.845-3.352 2.296-5.064 1.965-2.31 4.246-3.513 5.098-2.697.36.343.376.925.047 1.765-.124.315.167.207.167.207 1.565-.67 2.952-.727 3.466.006.267.38.223.89-.112 1.525-.142.268-.062.31.165.185.78-.427 1.487-.527 1.96-.285.972.495.743 2.504-.493 4.465-1.36 2.15-3.48 3.53-5.507 3.53h-.343zm-1.583-3.37c-.437.715-1.293 1.082-1.928.822-.624-.255-.862-.998-.535-1.67.332-.683 1.164-1.055 1.855-.83.66.216 1.013.96.608 1.678zm1.37-1.188c-.15.242-.472.36-.718.265-.24-.092-.32-.365-.18-.6.142-.238.456-.352.698-.256.248.098.338.372.2.59zm.375-2.638c-1.678-.44-3.574.422-4.33 1.944-.772 1.556.047 3.292 1.804 3.88 1.83.612 3.93-.32 4.62-2.073.68-1.72-.264-3.308-2.094-3.75z" />
                  <path d="M19.586 4.443c-1.092-1.215-2.59-1.87-4.125-1.87-.552 0-1.005.453-1.005 1.005s.453 1.005 1.005 1.005c1.06 0 2.09.456 2.842 1.293.752.837 1.16 1.943 1.16 3.087 0 .552.453 1.005 1.005 1.005s1.005-.453 1.005-1.005c0-1.52-.543-2.99-1.533-4.095l-.359-.43z" />
                  <path d="M17.06 7.44c-.413-.55-.99-.888-1.606-.888-.276 0-.5.224-.5.5s.224.5.5.5c.315 0 .62.18.834.478.214.298.31.665.31 1.042 0 .276.224.5.5.5s.5-.224.5-.5c0-.57-.143-1.132-.438-1.632h-.6z" />
                </svg>
                使用微博账号登录
              </>
            )}
          </button>

          {/* Features */}
          <div className="mt-8 space-y-4">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">功能特色</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-600">
                <span className="text-weibo-red">✦</span>
                更流畅的浏览体验
              </li>
              <li className="flex items-center gap-3 text-gray-600">
                <span className="text-weibo-red">✦</span>
                深色模式支持
              </li>
              <li className="flex items-center gap-3 text-gray-600">
                <span className="text-weibo-red">✦</span>
                无广告干扰
              </li>
              <li className="flex items-center gap-3 text-gray-600">
                <span className="text-weibo-red">✦</span>
                增强的搜索和过滤
              </li>
            </ul>
          </div>

          {/* Footer */}
          <p className="mt-8 text-center text-xs text-gray-400">
            登录即表示你同意我们的服务条款和隐私政策
          </p>
        </div>
      </div>
    </div>
  )
}
