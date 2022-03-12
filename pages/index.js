import Head from 'next/head'
import Image from 'next/image'
import Login from '../components/Login'
import Header from '../components/Header'

const Home = () => {
  return (
    <>
      <Header />
      <div className="flex min-h-screen flex-col md:h-almost md:flex-row">
        <Head>
          <title>Simba Money App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className=" -mt-10 h-full flex-1 bg-gray-100 pb-8 sm:-mt-0 sm:pb-11">
          <div className="hidden h-3/4 flex-col items-center justify-center text-gray-500 lg:flex">
            <div
              style={{
                background: 'url(./img/travel.jpg)',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }}
              className="mt-28 h-full w-72 rotate-45 place-items-center border-2 border-teal-700 p-10 md:grid lg:w-96"
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
          <div className="relative -top-56 mx-auto w-3/4 rounded-md bg-black text-center font-bold tracking-widest text-white opacity-40">
            <h1 className="text-2xl lg:text-3xl">TRANSFER MONEY SEAMLESSLY</h1>
            <h2 className="text-xl lg:text-2xl">USE THE SIMBA MONEY APP</h2>
          </div>
          <div className=" mx-auto mt-0 block w-3/4 rounded-md bg-black py-6 text-center font-bold tracking-widest text-white opacity-40 md:mt-24 lg:hidden">
            <h1 className="text-2xl lg:text-3xl">TRANSFER MONEY SEAMLESSLY</h1>
            <h2 className="text-xl lg:text-2xl">USE THE SIMBA MONEY APP</h2>
          </div>
        </div>
        <div className="flex-1 bg-blue-400 py-10 md:pt-32">
          <Login />
        </div>
      </div>
    </>
  )
}

export default Home
