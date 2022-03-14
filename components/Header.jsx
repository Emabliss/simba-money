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
    <div className="min-h-50 sticky top-0 z-10 box-border flex items-center justify-between bg-teal-700 py-1 px-4">
      <Link href="/transactions">
        <h2 className="cursor-pointer text-gray-100 sm:text-lg md:text-2xl">
          Simba Money Transfer
        </h2>
      </Link>
      {user && (
        <>
          <h2 className="ml-4 hidden text-gray-100 sm:ml-10 sm:block sm:text-sm md:ml-20 md:text-lg lg:ml-64">
            Welcome beautiful <span className="font-bold">{user.username}</span>
          </h2>
          <h2 className="ml-10 block text-sm text-gray-100 sm:hidden">
            <span className="font-bold">{user.username}</span>
          </h2>
        </>
      )}
      <h2
        onClick={handleLogout}
        className="ml-1 cursor-pointer text-sm text-gray-100 md:text-lg"
      >
        {user || loggedInUser ? 'Logout' : 'Login'}
      </h2>
    </div>
  )
}

export default Header
