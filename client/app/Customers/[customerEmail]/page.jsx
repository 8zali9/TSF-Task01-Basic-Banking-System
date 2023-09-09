export const dynamicParams = true

export const metadata = {
  title: 'TransVault | Profile'
};  

import React, { Suspense } from 'react'
import {notFound} from 'next/navigation'
import { FaUser, FaEnvelope, FaCreditCard } from 'react-icons/fa'
import loading from '@/app/loading';
import Form from '@/app/Customers/[customerEmail]/Form';
import DebitHistory from './DebitHistory';
import CreditHistory from './CreditHistory';

export async function generateStaticParams() {
  const response = await fetch('http://localhost:8080/api/customers')

  const customers = await response.json()

  return customers.map((customer) => ({
    params: {customerEmail: customer.customerEmail}
  }))
}

async function fetchCustomer(customerEmail) {
  const response = await fetch(`http://localhost:8080/api/customer/${customerEmail}`, {
    next: {
      revalidate: 0
    }
  })

  if (!response.ok) {
    notFound()
  }

  const customer = await response.json()
  return customer
}

export default async function CustomerDetails({ params }) {
  const customer = await fetchCustomer(params.customerEmail)
  return (
    <div>
        <h2 className='profile'>Profile</h2>
        <Suspense fallback={<loading />}>
        <ul className='customers-details'>
          {customer.map((c) => (
            <div key={c.customerEmail}>
              <div className='customer-details'>
                  <h3><small><FaUser /></small>{c.customerName}</h3>
                  <h3><small><FaEnvelope /></small>{c.customerEmail}</h3>
                  <h3><small><FaCreditCard /></small>{c.cuurrentBalance}</h3>
              </div>
            </div>
          ))}
        </ul>
        </Suspense>
        <Form customerEmail={params.customerEmail} />
        <div className='histories'>
          <CreditHistory customerEmail={params.customerEmail} />
          <DebitHistory customerEmail={params.customerEmail} />
        </div>
    </div>
  )
}
