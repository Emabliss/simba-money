import Head from 'next/head'
import Image from 'next/image'
import Login from '../components/Login'

const Home = () => {
  return (
    <div className="flex h-almost">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className=" h-full flex-1 bg-gray-100">
        <div className="flex h-3/4 flex-col items-center justify-center text-gray-500">
          <div
            style={{
              background: 'url(./img/travel.jpg)',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}
            className="mt-28 grid h-full w-72 rotate-45 place-items-center border-2 border-teal-700 p-10 lg:w-96"
          >
            <div
              style={{
                background: 'url(./img/lady.jpg)',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }}
              className="h-full w-full border-2 border-teal-700"
            ></div>
          </div>
        </div>
        <div className="relative -top-56 mx-auto w-500 rounded-md bg-black text-center font-bold tracking-widest text-white opacity-40">
          <h1 className="text-3xl">TRANSFER MONEY SEAMLESSLY</h1>
          <h2 className="text-2xl">USE THE SIMBA MONEY APP</h2>
        </div>
      </div>
      <div className="flex-1 bg-blue-400 pt-32">
        <Login />
      </div>
    </div>
  )
}

export default Home
