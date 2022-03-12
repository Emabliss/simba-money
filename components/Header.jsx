import Link from 'next/link'
import jwt_decode from 'jwt-decode'
import axios from 'axios'

const Header = ({ user, loggedInUser }) => {
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3000/api/auth/logout')
      window.location.reload()
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="min-h-50 sticky top-0 z-10 box-border flex items-center justify-between bg-teal-700 px-4">
      <Link href="/">
        <h2 className="cursor-pointer text-xl text-gray-100 md:text-2xl">
          Simba Money Transfer
        </h2>
      </Link>
      {user && (
        <h2 className="ml-4 text-gray-100 sm:ml-10 md:ml-64">
          Welcome beautiful <span className="font-bold">{user.username}</span>
        </h2>
      )}
      <h2 onClick={handleLogout} className="cursor-pointer text-gray-100">
        {user || loggedInUser ? 'Logout' : 'Login'}
      </h2>
    </div>
  )
}

export const getServerSideProps = async (ctx) => {
  const cookie = ctx.req?.headers.cookie
  const greet = 'Hello'

  if (!cookie) {
    return {
      redirect: {
        destination: '/',
        parmanent: false,
      },
    }
  }
  const res = await axios.get('http://localhost:3000/api/users', {
    headers: {
      cookie: cookie,
    },
  })

  return {
    props: {
      users: res.data,
      cookie,
      greet,
    },
  }
}

export default Header
