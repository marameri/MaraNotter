import RecordingList from '@/components/RecordingList'

export default function RecordingsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Recordings</h1>
      <RecordingList />
    </div>
  )
}
