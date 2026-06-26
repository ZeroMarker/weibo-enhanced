export interface User {
  id: string
  name: string
  handle: string
  avatar: string
  bio?: string
  followers?: number
  following?: number
}

export interface WeiboPost {
  id: string
  user: User
  content: string
  images?: string[]
  video?: string
  likes: number
  comments: number
  reposts: number
  timestamp: string
  isLiked: boolean
  isReposted: boolean
  isBookmarked: boolean
}

export interface Comment {
  id: string
  user: User
  content: string
  likes: number
  timestamp: string
  replies?: Comment[]
}
