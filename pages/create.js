import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'
import jwt_decode from 'jwt-decode'
import Header from '../components/Header'

const Create = ({ users, cookie }) => {
  const [receiverName, setReceiverName] = useState(null)
  const [amount, setAmount] = useState(null)
  const [currency, setCurrency] = useState('USD')
  const [amountError, setAmountError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [failure, setFailure] = useState('')

  // Logged in user
  const loggedInUser = jwt_decode(cookie)

  const otherUsers = users.filter((user) => user._id !== loggedInUser.sub)

  let converted
  if (currency === 'USD') {
    converted = amount
  }
  if (currency === 'EUR') {
    converted = amount * 0.71
  }
  if (currency === 'NGN') {
    converted = amount * 418.49
  }

  const router = useRouter()

  const handleCreate = async () => {
    setFailure(false)
    setAmountError(false)
    setLoading(false)
    const newTransaction = {
      senderName: loggedInUser.username,
      receiverName,
      convertedTo: converted,
      value: amount,
      targetCurrency: currency,
    }
    if (amount > 0) {
      try {
        setLoading(true)
        const res = await axios.post(
          'http://localhost:3000/api',
          newTransaction
        )
        res.status === 201 && router.push('/transactions')
        setLoading(false)
      } catch (err) {
        setFailure(true)
        setLoading(false)
      }
    } else {
      setAmountError(true)
    }
  }
  return (
    <>
      <Header loggedInUser={loggedInUser} />
      <div className="box-border h-almost bg-blue-400 pt-20">
        <div className="mx-auto  w-3/4 bg-gray-100 py-8 lg:w-sixtyplus">
          <h1 className="text-center text-xl text-gray-700 md:text-2xl">
            Now You Can Send Money to Friends and Associates
          </h1>
          <div className="mx-auto mb-8 h-1 w-40 bg-teal-700 sm:w-72"></div>
          <div className="flex-col space-y-5 pl-5 md:flex md:flex-row md:justify-around md:space-y-0 md:pl-3">
            <div className="text-sm text-gray-600 sm:text-lg">
              <span className="font-semibold">Send to: </span>
              <select
                onChange={(e) => setReceiverName(e.target.value)}
                className="w-32 rounded-md py-1 shadow-sm outline-none"
              >
                <option defaultChecked>Select</option>
                {otherUsers.map((user) => (
                  <option key={user._id} value={user.username}>
                    {user.username}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-sm text-gray-600 sm:text-lg">
              <label htmlFor="amount" className="font-semibold">
                Amount:{' '}
              </label>
              <input
                onChange={(e) => setAmount(e.target.value)}
                type="number"
                id="amount"
                className="rounded-md px-2 py-1 shadow-sm outline-none"
                required
              />
            </div>
            <div className="text-sm text-gray-600 sm:text-lg">
              <span className="font-semibold">Select Currency: </span>
              <select
                onChange={(e) => {
                  setCurrency(e.target.value)
                }}
                className="w-32 rounded-md py-1 shadow-sm outline-none"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="NGN">NGN</option>
              </select>
            </div>
          </div>
          <div className="my-8 text-center text-sm text-gray-600 sm:text-lg">
            <span className="font-semibold">Converted Amount: </span>
            <input
              type="text"
              value={converted}
              className="rounded-md px-2 py-1 shadow-sm outline-none"
            />
          </div>
          <button
            onClick={handleCreate}
            className="mx-auto block rounded-md bg-teal-700 py-1 px-20 text-lg tracking-wider text-white"
          >
            {loading ? 'Creating...' : 'Create'}
          </button>
          {!amountError && failure && (
            <span className="mt-2 block text-center text-red-500">
              Unable to perform transaction
            </span>
          )}
          {amountError && (
            <span className="mt-2 block text-center text-red-500">
              Can't send a negative value
            </span>
          )}
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = async (ctx) => {
  const cookie = ctx.req?.headers.cookie

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
    },
  }
}

export default Create
