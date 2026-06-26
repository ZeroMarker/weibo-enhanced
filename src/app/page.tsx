import Feed from '@/components/Feed'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-6 flex gap-6">
        <aside className="w-64 flex-shrink-0">
          <Sidebar />
        </aside>
        <div className="flex-1">
          <Feed />
        </div>
      </main>
    </div>
  )
}
