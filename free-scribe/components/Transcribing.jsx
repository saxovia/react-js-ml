import React from 'react'

export default function Transcribing(props) {
    const {downloading} = props
  return (
    <div className='flex items-center flex-col justify-center gap-10 md:gap-14 text-center pb-24 p-4 flex-1'>
        <div className='flex flex-col gap-2 sm:gap-'></div>
        <h1 className='font-semibold md:text-6xl sm:text-5xl'><span className='text-blue-400'>Transcribing</span></h1>
        <p>{!downloading ? 'Loading...' : 'Loaded!'}</p>
        <div className='flex flex-col gap-2 sm:gap-3 max-w-[400px] mx-auto w-full'>
            {[0,1,2].map(val => {
                return(
                    <div key={val} className={'rounded-full h-2 sm:h-3 bg-slate-400 loading' + 'loading${val}'}>
                    </div>
                )
            })}
        </div>

    </div>
  )
}
