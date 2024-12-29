import React from 'react'

export default function Header() {
    return (
        <header className='flex items-center justify-between gap-4 p-4'>
            <a href='/'>
                <h1 className='text-medium'>Free<span className='text-blue-400'>Scribe</span></h1>
                </a>
            <a href='/' className='flex px-3 py-2 items-center gap-2 specialBtn rounded-lg text-medium text-blue-400'>
                <p>New</p>
                <i className="fa-solid fa-plus"></i>
            </a>
        </header>
    )
}
