export const dynamic = 'force-dynamic'
import { supabase } from '../lib/supabase'
import Link from 'next/link'
import { Plus, Trophy, Activity, Music, Film, IceCream, Pizza } from 'lucide-react'

// Map categories to icons
const catIcons = {
  song: <Music className="w-5 h-5" />,
  movie: <Film className="w-5 h-5" />,
  activity: <Activity className="w-5 h-5" />,
  sweet_treat: <IceCream className="w-5 h-5" />,
  hungry: <Pizza className="w-5 h-5" />
}

export default async function Dashboard() {
  // Fetch leaderboards
  const { data: leaderboard } = await supabase
    .from('view_member_leaderboard')
    .select('*')
    .order('total_wins', { ascending: false })

  // Fetch recent sessions
  const { data: sessions } = await supabase
    .from('sessions')
    .select('id, date')
    .order('date', { ascending: false })
    .limit(5)

  return (
    <div className="p-4 max-w-md mx-auto">
      {/* Header */}
      <header className="flex justify-between items-center py-6">
        <h1 className="text-3xl font-extrabold text-dark tracking-tight">SMASH</h1>
        <div className="bg-brand text-white px-4 py-1 rounded-full font-bold shadow-sm">
          {sessions?.length || 0} Total
        </div>
      </header>

      {/* Leaderboard Card */}
      <section className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-6">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" /> All-Time Leaderboard
        </h2>
        <div className="space-y-3">
          {leaderboard?.map((member, i) => (
            <div key={member.member_id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-sm text-gray-600">
                  {i + 1}
                </div>
                <span className="font-medium">{member.name}</span>
              </div>
              <span className="font-bold text-brand bg-orange-50 px-3 py-1 rounded-lg">
                {member.total_wins}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Recent History */}
      <section>
        <h2 className="text-lg font-bold mb-4 px-1">Recent Sessions</h2>
        <div className="space-y-3">
          {sessions?.map(session => (
            <Link href={`/session/${session.id}`} key={session.id}>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center active:scale-95 transition-transform cursor-pointer">
                <div>
                  <div className="font-bold text-dark">
                    {new Date(session.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">Tap to view results</div>
                </div>
                <div className="text-brand font-bold">➔</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Floating Add Button */}
      <Link href="/new">
        <div className="fixed bottom-6 right-6 bg-brand text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-orange-600 transition-colors">
          <Plus className="w-6 h-6" />
        </div>
      </Link>
    </div>
  )
}
