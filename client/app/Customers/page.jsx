"use client"

import React, { Suspense, useState } from 'react'
import Link from 'next/link'
import { FaUser, FaEnvelope } from 'react-icons/fa';
import loading from '../loading';

async function fetchCustomers() {
  const response = await fetch('http://localhost:8080/api/customers', {
    next: {
      revalidate: 120
    }
  })
  
  const customers = await response.json()
  return customers
}

export default async function CustomersPage() {
  const customers = await fetchCustomers()
  return (
    <div>
      <div className='customers-head'>
        <h2 className='registered-heading'>Registered Customers</h2>
      </div>
        <Suspense fallback={<loading />}>
          <ul className='customers-list'>
            {customers.map((customer) => (
              <li key={customer.customerEmail}>
                <div className='customers-info'>
                    <p>
                      <small><FaUser /></small>
                      {customer.customerName} | {customer.customerEmail}
                    </p>
                  </div>
                <Link href={`Customers/${customer.customerEmail}`}>
                  <button className='view-btn'>View</button>
                </Link>
              </li>
            ))}
          </ul>
        </Suspense>
    </div>
  )
}
