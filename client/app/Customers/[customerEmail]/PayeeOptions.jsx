import React, { useState } from 'react';
import { FaCaretDown, FaCopy } from 'react-icons/fa';
import { toast } from 'react-toastify';

export default function PayeeOptions({ customerEmail }) {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState([]);

  const toggleInfo = () => {
    setIsOpen(!isOpen);
  };

  const settingOptions = async (customerEmail) => {
    const response = await fetch(`http://localhost:8080/api/customer/less/${customerEmail}`, {
      next: {
        revalidate: 0
      }
    });
    const opt = await response.json();
    setOptions(opt);
  };

  const copyToClipboard = async (email) => {
    try {
      await navigator.clipboard.writeText(email);
      toast.dark('Copied')
    } catch (err) {
      toast.info('Cannot copy.')
    }
  };

  const combinedFunction = () => {
    toggleInfo();
    settingOptions(customerEmail);
  };

  

  return (
    <div className='options-div'>
      <button type='button' className='options-btn' onClick={combinedFunction}>
        Payees<FaCaretDown />
      </button>
      {isOpen && (
        <div className='options'>
          <ul className='customers-options'>
            {options.map((customer) => (
              <li className='opt-list' key={customer.customerEmail}>
                <div className='email-toCopy'>
                  <p>{customer.customerEmail}</p>
                  <p onClick={() => copyToClipboard(customer.customerEmail)}>
                    <FaCopy />
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
