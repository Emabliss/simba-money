import axios from 'axios'
import Link from 'next/link'
import jwt_decode from 'jwt-decode'
import Header from '../components/Header'

const Transactions = ({ transactions, cookie }) => {
  // Logged in user
  const user = jwt_decode(cookie)

  // Transactions of logged in user
  const myTransactions = transactions.filter(
    (transaction) =>
      transaction.senderName === user.username ||
      transaction.receiverName === user.username
  )

  return (
    <div
      className="min-h-screen"
      style={{
        background: 'url(./img/background.jpg)',
      }}
    >
      <Header user={user} />
      <div className="box-border px-8 pb-20">
        <div className="my-5 flex items-center justify-between">
          <h1 className="text-2xl text-gray-700 sm:text-3xl md:text-4xl">
            Transactions
          </h1>
          <Link href="/create">
            <h1 className="cursor-pointer rounded-sm bg-teal-700 py-3 px-5 text-lg text-white  sm:text-xl md:px-8">
              Create Transaction
            </h1>
          </Link>
        </div>
        {myTransactions.length === 0 ? (
          <h1 className="relative top-20 text-xl text-gray-600 md:text-3xl">{`You have ${user.dollar} USD to spend wisely`}</h1>
        ) : (
          <table className="w-full  rounded-md bg-white text-left shadow-lg">
            <tbody className="border-y-2">
              <tr>
                <th className="py-2">ID</th>
                <th>From</th>
                <th>To</th>
                <th>Value</th>
                <th>Currency</th>
                <th>Created At</th>
                <th>Updated At</th>
              </tr>
            </tbody>
            {myTransactions.map((transaction) => (
              <tbody className="border-b-2 " key={transaction._id}>
                <tr>
                  <td className="py-2">{transaction._id.slice(0, 7)}...</td>
                  <td>
                    {transaction.senderName === user.username
                      ? 'You'
                      : transaction.senderName}
                  </td>
                  <td>
                    {transaction.receiverName === user.username
                      ? 'You'
                      : transaction.receiverName}
                  </td>
                  <td>+{Math.round(transaction.convertedTo * 100) / 100}</td>
                  <td>{transaction.targetCurrency}</td>
                  <td>{new Date(transaction.createdAt).toDateString()}</td>
                  <td>{new Date(transaction.updatedAt).toDateString()}</td>
                </tr>
              </tbody>
            ))}
          </table>
        )}
        <div className="min-h-44 mt-24 ml-auto flex w-56 flex-col items-center justify-center rounded-md bg-gray-100 py-5 shadow-lg sm:mt-6 sm:w-1/4">
          <h2 className="text-xl font-bold text-gray-600 sm:text-2xl">
            Balances
          </h2>
          <h3 className="text-lg text-gray-600">
            {Math.round(user.dollar * 100) / 100 + ' USD'}
          </h3>
          <h3 className="text-lg text-gray-600">
            {Math.round(user.euro * 100) / 100 + ' EUR'}
          </h3>
          <h3 className="text-lg text-gray-600">
            {Math.round(user.naira * 100) / 100 + ' NGN'}
          </h3>
        </div>
      </div>
    </div>
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

  const res = await axios.get('http://localhost:3000/api', {
    headers: {
      cookie: cookie,
    },
  })

  return {
    props: {
      transactions: res.data,
      cookie,
    },
  }
}

export default Transactions
