import { useRouter } from 'next/router'
import { useState } from 'react'

const Create = () => {
  const [receiver, setReceiver] = useState('Mark')
  const [amount, setAmount] = useState(null)
  const [currency, setCurrency] = useState('USD')

  let value
  if (currency === 'USD') {
    value = amount
  }
  if (currency === 'EUR') {
    value = amount * 1.4
  }
  if (currency === 'NGN') {
    value = amount / 500
  }
  if (currency === 'GBP') {
    value = amount / 1.5
  }
  const router = useRouter()
  const handleCreate = () => {
    console.log(receiver, amount, currency, value)
    router.push('/transactions')
  }
  return (
    <div className="box-border h-almost bg-blue-400 pt-20">
      <div className="mx-auto  w-sixtyplus bg-gray-100 py-8">
        <h1 className="text-center text-2xl text-gray-700">
          Now You Can Send Money to Friends and Associates
        </h1>
        <div className="mx-auto mb-8 h-1 w-72 bg-teal-700"></div>
        <div className="flex justify-around">
          <div className="text-lg text-gray-600">
            <span className="font-semibold">Send to: </span>
            <select
              onChange={(e) => setReceiver(e.target.value)}
              className="w-32 rounded-md py-1 shadow-sm outline-none"
            >
              <option disabled>Select</option>
              <option defaultValue="Mark">Mark</option>
              <option value="Lee">Lee</option>
              <option value="Luke">Luke</option>
            </select>
          </div>
          <div className="text-lg text-gray-600">
            <label htmlFor="amount" className="font-semibold">
              Amount:{' '}
            </label>
            <input
              onChange={(e) => setAmount(e.target.value)}
              type="number"
              id="amount"
              className="rounded-md px-2 py-1 shadow-sm outline-none"
            />
          </div>
          <div className="text-lg text-gray-600">
            <span className="font-semibold">Select Currency: </span>
            <select
              onChange={(e) => setCurrency(e.target.value)}
              className="w-32 rounded-md py-1 shadow-sm outline-none"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="NGN">NGN</option>
              <option value="GBP">GBP</option>
            </select>
          </div>
        </div>
        <div className="my-8 text-center text-lg text-gray-600">
          <span className="font-semibold">Amount in USD: </span>
          <input
            type="text"
            value={value}
            className="rounded-md px-2 py-1 shadow-sm outline-none"
          />
        </div>
        <button
          onClick={handleCreate}
          className="mx-auto block rounded-md bg-teal-700 py-1 px-20 text-lg tracking-wider text-white"
        >
          Create
        </button>
      </div>
    </div>
  )
}

export default Create
