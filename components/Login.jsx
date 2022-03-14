import { useState, useContext, useEffect } from 'react'
import FormInput from './FormInput'
import { useRouter } from 'next/router'
import axios from 'axios'

const Login = () => {
  const [registerMode, setRegisterMode] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordAgain, setPasswordAgain] = useState('')
  const [passwordsDontMatch, setPasswordsDontMatch] = useState(false)
  const [passwordTooWeak, setPasswordTooWeak] = useState(false)
  const [registerError, setRegisterError] = useState(false)
  const [creating, setCreating] = useState(false)
  const [fetching, setFetching] = useState(false)
  const [error, setError] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setPasswordsDontMatch(false)
    setRegisterError(false)
    setPasswordTooWeak(false)
    setFetching(false)
    setError(false)
    setCreating(false)

    if (registerMode) {
      if (password !== passwordAgain) {
        setPasswordsDontMatch(true)
      }
      if (password.length < 7) {
        setPasswordTooWeak(true)
      } else {
        const user = {
          username,
          email,
          password,
        }
        try {
          setCreating(true)
          const res = await axios.post(
            'http://localhost:3000/api/auth/register',
            user
          )
          setCreating(false)
          setRegisterMode(false)
        } catch (err) {
          setRegisterError(true)
          setCreating(false)
        }
      }
    } else {
      try {
        setFetching(true)
        const res = await axios.post('http://localhost:3000/api/auth/login', {
          email,
          password,
        })
        res.status === 200 && router.push('/transactions')
        setFetching(false)
      } catch (err) {
        setError(true)
        setFetching(false)
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto box-border flex w-3/4 flex-col items-center justify-center space-y-2 rounded-lg bg-gray-100 py-5 shadow-lg lg:w-2/4"
    >
      <h1 className="mb-2 text-2xl text-gray-600">
        {!registerMode ? 'Sign into your account' : 'Register Account'}
      </h1>
      {registerMode && (
        <FormInput
          title="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
      )}
      <FormInput
        title="Email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <FormInput
        title="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      {registerMode && (
        <FormInput
          title="Confirm Password"
          type="password"
          onChange={(e) => setPasswordAgain(e.target.value)}
        />
      )}
      <button className="rounded-md bg-teal-700 py-1 px-6 font-bold text-white">
        {registerMode
          ? 'Register'
          : creating
          ? 'Creating...'
          : fetching
          ? 'Please wait...'
          : 'Login'}
      </button>
      {registerMode && passwordsDontMatch && (
        <span className="text-red-500">Passwords don't match</span>
      )}
      {registerMode && passwordTooWeak && (
        <span className="text-red-500">Password too weak</span>
      )}
      {registerMode &&
        registerError &&
        !passwordTooWeak &&
        !passwordsDontMatch && (
          <span className="text-red-500">Something went wrong</span>
        )}
      {!registerMode && error && (
        <span className="text-red-500">Unable to login</span>
      )}
      {!registerMode ? (
        <span>
          Don't have an account?
          <span
            onClick={() => {
              setRegisterMode(true)
              setRegisterError(false)
              setPasswordsDontMatch(false)
              setPasswordTooWeak(false)
              window.scrollTo({
                top: 100,
                behavior: 'smooth',
              })
            }}
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
      {creating && <span>Creating...</span>}
    </form>
  )
}

export default Login
