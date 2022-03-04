import { useState } from 'react'
import FormInput from './FormInput'
import { useRouter } from 'next/router'

const Login = ({ login }) => {
  const [registerMode, setRegisterMode] = useState(false)
  const router = useRouter()
  const handleSubmit = (e) => {
    e.preventDefault()
    if (registerMode) {
      setRegisterMode(false)
    } else {
      router.push('/transactions')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto box-border flex w-2/4 flex-col items-center justify-center space-y-2 rounded-lg bg-gray-100 py-5 shadow-lg"
    >
      <h1 className="mb-2 text-2xl text-gray-600">
        {!registerMode ? 'Sign into your account' : 'Register Account'}
      </h1>
      {registerMode && <FormInput title="Username" />}
      <FormInput title="Email" type="email" />
      <FormInput title="Password" type="password" />
      {registerMode && <FormInput title="Confirm Password" type="password" />}
      <button className="rounded-md bg-teal-700 py-1 px-6 font-bold text-white">
        {!registerMode ? 'Login' : 'Sign Up'}
      </button>
      {!registerMode ? (
        <span>
          Don't have an account?
          <span
            onClick={() => setRegisterMode(true)}
            className="cursor-pointer underline"
          >
            {' '}
            Sign up
          </span>
        </span>
      ) : (
        <span>
          Already have an account?
          <span
            onClick={() => setRegisterMode(false)}
            className="cursor-pointer underline"
          >
            {' '}
            Sign in
          </span>
        </span>
      )}
    </form>
  )
}

export default Login
