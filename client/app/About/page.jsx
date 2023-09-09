export const metadata = {
  title: 'TransVault | About'
};

import React from 'react'
import Link from 'next/link'
import { FaLinkedin } from 'react-icons/fa'

export default function Aboutpage() {
  return (
    <main className='about'>
      <h2 className='about-heading'>About This Website</h2>
      <div className='about-content'>
        <p>TransVault, a Basic Banking System developed for Task #01 of the TSF Internship,</p>
        <p>is designed with a server built on the Express app.</p>
        <p>The client-side is powered by Next.js, providing a user-friendly interface for banking transactions.</p>
        <div className='connection'>
          <strong>Connect with Developer</strong>
          <div className='linkedin'>
            <p>Zulfiqar</p>
            <p>|</p>
            <p className='linkedin-link'><Link href='https://www.linkedin.com/in/zulfiqar-ali-3bb08024b/'><FaLinkedin /></Link></p>
          </div>
        </div>
      </div>
    </main>
  )
}
