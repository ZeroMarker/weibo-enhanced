import { requireAuth } from '@/lib/auth'
import { getWeiboUser } from '@/lib/weibo'
import ProfileCard from '@/components/ProfileCard'

export default async function ProfilePage() {
  const session = await requireAuth()

  let userData = session.user
  try {
    userData = await getWeiboUser(session.token, session.user.idstr)
  } catch (error) {
    console.error('Failed to refresh user data:', error)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <ProfileCard user={userData} />
      </div>
    </div>
  )
}
