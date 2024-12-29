import React from 'react'

export default function Header() {
    return (
        <header className='flex items-center 
            justified-between gap-4 p-4'>
            <h1 className=''>Free<span className='text-blue-400'>Scribe</span></h1>
            <button className='flex px-3 item-center gap-2 specialBtn rounded-lg text-sm text-blue-400'>
                <p>New</p>
                <i className="fa-solid fa-plus"></i>
            </button>
        </header>
    )
}
