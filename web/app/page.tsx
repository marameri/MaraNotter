import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-3xl">
            <svg
              className="w-10 h-10 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4"
              />
            </svg>
          </div>
          <h1 className="text-5xl font-bold">MaraNotter</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            AI-Powered Audio Recording & Note Taking
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400">
            Record, transcribe, and summarize your notes with AI
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/auth/login"
              className="px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition"
            >
              Login
            </Link>
            <Link
              href="/auth/register"
              className="px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition"
            >
              Sign Up
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl">
          <FeatureCard
            icon="🎙️"
            title="Record"
            description="One-tap recording with real-time waveform"
          />
          <FeatureCard
            icon="✨"
            title="Transcribe"
            description="AI-powered speech-to-text with speaker identification"
          />
          <FeatureCard
            icon="📝"
            title="Summarize"
            description="Automatic summaries and action items"
          />
        </div>
      </div>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string
  title: string
  description: string
}) {
  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  )
}
