'use client'

import useSWR from 'swr'
import { useEffect, useState } from 'react'
import { formatDistance } from 'date-fns'
import { tr } from 'date-fns/locale'

interface Recording {
  id: string
  title: string
  description: string
  duration: number
  created_at: string
  audio_url: string
}

const fetcher = (url: string) =>
  fetch(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
    },
  }).then((res) => res.json())

export default function RecordingList() {
  const [isMounted, setIsMounted] = useState(false)
  const { data: recordings, isLoading } = useSWR<Recording[]>(
    isMounted ? `${process.env.NEXT_PUBLIC_API_URL}/recordings` : null,
    fetcher
  )

  useEffect(() => {
    setIsMounted(true)
  }, []);

  if (!isMounted || isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!recordings || recordings.length === 0) {
    return (
      <div className="text-center py-12">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
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
        <p className="mt-4 text-gray-600 dark:text-gray-400">No recordings yet</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {recordings.map((recording) => (
        <div
          key={recording.id}
          className="p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:shadow-lg transition cursor-pointer"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{recording.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                {recording.description}
              </p>
              <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                <span>⏱️ {recording.duration}s</span>
                <span>
                  📅{' '}
                  {formatDistance(new Date(recording.created_at), new Date(), {
                    addSuffix: true,
                    locale: tr,
                  })}
                </span>
              </div>
            </div>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition">
              <svg
                className="w-6 h-6 text-primary"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
