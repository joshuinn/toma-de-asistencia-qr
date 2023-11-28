import React from 'react'

function Header({title, extra}) {
  return (
    <div className='flex w-full justify-between'>
        <div><h2 className='font-bold text-xl text-white'>{title}</h2></div>
        <div><h3 className='text-white'>{extra}</h3></div>
    </div>
  )
}

export default Header