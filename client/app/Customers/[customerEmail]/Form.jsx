"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import PayeeOptions from './PayeeOptions';

export default function Form({customerEmail}) {
  const router = useRouter()

  const [payeeEmail, setPayeeEmail] = useState('')
  const [amount, setAmount] = useState('')
  const isAmountValid = amount > 0;
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleTransfer = async (e) => {
    e.preventDefault()
    setLoading(true)

    const customer = {payeeEmail, amount}

    const response = await fetch(`http://localhost:8080/api/customer/${customerEmail}`,{
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(customer)
    })

    if (response.status === 404) {
      setLoading(false)
      toast.error('Customer Not Found!')
    }

    if (response.status === 400) {
      setLoading(false)
      toast.error('Insufficient Balance!')
    }

    if (response.status === 500 || response.status === 409 ) {
      setLoading(false)
      toast.error('Transaction Failed!')
    }

    if (response.status === 200) {
      setLoading(false)
      router.refresh()
      // router.push(`/Customers/${customerEmail}`)
      toast.success('Transaction Successful.')
      setPayeeEmail('')
      setAmount('')
    }
  }

  return (
    <form name='form' onSubmit={handleTransfer} className='form'>
      <legend>Money Transfer</legend>
        <label className='labels'>
          <input // this has to be the search bar to find the receiver
          required
          placeholder="Recipient's Email"
          type="email"
          onChange={(e) => setPayeeEmail(e.target.value)}
          value={payeeEmail}
          />
        </label>

        <label className='labels'>
          <input
          required
          placeholder="Amount"
          type="number"
          onChange={(e) => 
            {const inputValue = parseFloat(e.target.value);
              if (!isNaN(inputValue)) {
                setAmount(inputValue);
              } else {
                setError('Amount cannot be left null')
                toast.error('Invalid Amount!')
                setAmount('');
              }
            }
          }
          value={amount}
          />
        </label>
        <div className='btns'>
          <PayeeOptions customerEmail={customerEmail} />
          <div className='transfer-btn'>
            <button
            type='submit'
            className='Transfer-Amount-btn'
            disabled={!isAmountValid}
            >
              {loading && <span>Transfering</span>}
              {!loading && <span>Transfer</span>}
            </button>
          </div>
        </div>
    </form>
  )
}
