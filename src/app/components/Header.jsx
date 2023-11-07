import React from 'react'

function Header({title, extra}) {
  return (
    <div className='flex w-full justify-between'>
        <div><h2 className='font-bold text-xl text-indigo-950'>{title}</h2></div>
        <div><h3>{extra}</h3></div>
    </div>
  )
}

export default Header