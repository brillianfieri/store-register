import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  
  return(
    <div className='min-h-screen pb-5 bg-white dark:bg-slate-950'>
    <Component {...pageProps} />
  </div>
  )
}
