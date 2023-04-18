import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import './style.css'

import { Button, Loader } from '../../../../components'
import { Transactions } from '../../../../data/mocks'
import { CRUD_ROOTS } from '../../../../data/constants';
import { Transaction } from '../../components/Transaction';

export const AllTransactions = () => {
    Transactions.at(0);
    const [loading, setLoading] = useState(true);
    setTimeout(() => {
        setLoading(false)
    }, 500);

    return (
        <>
            <div className="d-flex align-items-center justify-content-start justify-content-md-end  w-100">
                <NavLink to={`${CRUD_ROOTS.create}`} className='text-decoration-none'>
                    <Button className="btn-sm btn-primary" text="New Transaction" iconLeft={faPlus} />
                </NavLink>
            </div>

            {
                loading ?
                    <div className="w-100 py-4 d-flex justify-content-center align-items-center">
                        <Loader />
                    </div> :
                    <div className="mt-4 container transactions-container">
                        {
                            Transactions.map(transaction => (
                                <Transaction transaction={transaction} key={transaction.id} />
                            ))
                        }
                    </div>
            }
        </>
    )
}
