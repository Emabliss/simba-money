import Link from 'next/link'

const Header = () => {
  return (
    <div className="box-border flex h-50 items-center justify-between bg-teal-700 px-4">
      <Link href="/">
        <h2 className="cursor-pointer text-2xl text-gray-100">
          Simba Money Transfer
        </h2>
      </Link>
      <h2 className="text-gray-100">Login here</h2>
    </div>
  )
}

export default Header
