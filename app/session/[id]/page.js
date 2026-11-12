import { supabase } from '../../../lib/supabase'
import Link from 'next/link'

export default async function SessionResults({ params }) {
  const { id } = params
  
  // Fetch session date
  const { data: session } = await supabase.from('sessions').select('date').eq('id', id).single()
  
  // Fetch winning entries
  const { data: winners } = await supabase
    .from('grid_entries')
    .select('*, members(name)')
    .eq('session_id', id)
    .eq('is_winner', true)

  const getMediaUrl = (entry) => {
      // In production, this reads entry.media_image_url
      // For now, return a placeholder based on category
      const colorMap = {
          song: 'bg-blue-100 text-blue-800',
          movie: 'bg-purple-100 text-purple-800',
          activity: 'bg-green-100 text-green-800',
          sweet_treat: 'bg-pink-100 text-pink-800',
          hungry: 'bg-orange-100 text-orange-800'
      }
      return colorMap[entry.category] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="mb-6 flex items-center gap-4">
        <Link href="/" className="text-brand font-bold">← Back</Link>
        <h1 className="text-2xl font-bold">
          {session ? new Date(session.date).toLocaleDateString() : 'Results'}
        </h1>
      </div>

      <div className="space-y-4">
        {['song', 'movie', 'activity', 'sweet_treat', 'hungry'].map(cat => {
          const entry = winners?.find(w => w.category === cat)
          if (!entry) return null;

          return (
            <div key={entry.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex h-32">
              <div className={`w-32 flex-shrink-0 flex flex-col items-center justify-center p-4 text-center ${getMediaUrl(entry)}`}>
                 <span className="font-bold capitalize text-sm">{cat.replace('_', ' ')}</span>
              </div>
              <div className="p-4 flex flex-col justify-center flex-grow">
                <h3 className="font-bold text-lg leading-tight line-clamp-2">{entry.suggestion}</h3>
                <div className="text-gray-500 text-sm mt-1">{entry.members.name}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
