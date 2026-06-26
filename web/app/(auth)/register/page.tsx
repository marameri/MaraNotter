import RegisterForm from '@/components/RegisterForm'

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Create Account</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Sign up to start recording and note-taking
            </p>
          </div>
          <RegisterForm />
        </div>
      </div>
    </div>
  )
}
