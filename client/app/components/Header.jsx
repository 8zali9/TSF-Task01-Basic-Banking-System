import Link from 'next/link'
import React from 'react'
import { FaHome, FaInfoCircle, FaUsers } from 'react-icons/fa'

export default function Header() {
  return (
    <header className='header'>
        <h1 className='heading'><Link href='/'>||TransVault||</Link></h1>
        <li className='link'><Link href='/'><FaHome size={24}/></Link></li>
        <li className='link'><Link href='/About'><FaInfoCircle size={24}/></Link></li>
        <li className='link'><Link href='/Customers'><FaUsers size={24}/></Link></li>
    </header>
  )
}
