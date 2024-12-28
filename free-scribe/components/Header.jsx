import React from 'react'

export default function Header() {
    return (
        <header className='flex items-center 
            justified-between gap-4 p-4'>
            <h1 className=''>Free<span className='text-blue-400'>Scribe</span></h1>
            <button className='flex item-center gap-2'>
                <p>New</p>
                <i className="fa-solid fa-plus"></i>
            </button>
        </header>
    )
}
