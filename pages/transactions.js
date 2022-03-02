import Link from 'next/link'

const Transactions = () => {
  return (
    <div className="box-border h-almost px-8">
      <div className="my-5 flex items-center justify-between">
        <h1 className="text-4xl text-gray-700">Transactions</h1>
        <Link href="/create">
          <h1 className="cursor-pointer rounded-sm bg-teal-700 py-3 px-8 text-xl text-white">
            Create Transaction
          </h1>
        </Link>
      </div>
      <table className="w-full  rounded-md text-left shadow-lg">
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
        <tbody className="border-b-2 ">
          <tr>
            <td className="py-2">2</td>
            <td>John</td>
            <td>You</td>
            <td>+500.0</td>
            <td>EUR</td>
            <td>March 2,2022 17:37</td>
            <td>March 2,2022 17:37</td>
          </tr>
        </tbody>
        <tbody className="border-b-2 ">
          <tr>
            <td className="py-2">2</td>
            <td>John</td>
            <td>You</td>
            <td>+500.0</td>
            <td>EUR</td>
            <td>March 2,2022 17:37</td>
            <td>March 2,2022 17:37</td>
          </tr>
        </tbody>
        <tbody className="border-b-2 ">
          <tr>
            <td className="py-2">2</td>
            <td>John</td>
            <td>You</td>
            <td>+500.0</td>
            <td>EUR</td>
            <td>March 2,2022 17:37</td>
            <td>March 2,2022 17:37</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Transactions
