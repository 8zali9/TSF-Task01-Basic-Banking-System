import React from 'react'

async function fetchTransactionHistory(customerEmail) {
  const response = await fetch(`http://localhost:8080/api/customer/credits/${customerEmail}`, {
    next: {
      revalidate: 0
    }
  })

  const history = await response.json()
  return history
}

export default async function DebitHistory({ customerEmail }) {
  const history = await fetchTransactionHistory(customerEmail);

  if (!Array.isArray(history)) {
    return (
      <div className='no-history'>
        <p className='noHistory'>No Credit history available for this account.</p>
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className='no-history'>
        <p className='noHistory'>No Credit history available for this account.</p>
      </div>
    );
  }

  return (
    <ul className='history'>
      <h3 className='history-heading'>Credits to this Account</h3>
      {history.map((h) => (
        <li key={h.customerEmail}>
          <div className='customer-details'>
            <h4>Transaction ID: {h.transferID}</h4>
            <p>Sent From: {h.payerEmail}</p>
            <p>Amount: {h.amount}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

