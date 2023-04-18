import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';

import { Button, Loader } from '../../../components'
import { CRUD_ROOTS, RESELL_ROUTES } from '../../../data/constants'
import { Transactions, Currencies } from '../../../data/mocks'
import { TransactionStatus } from './TransactionStatus';

export const Transaction = ({ transaction = Transactions[0] }) => {
    const [loading, setLoading] = useState(true);
    const [currency, setCurrency] = useState("CUP");
    const [openTransaction] = useState(false);
    const [deposits] = useState(1);
    const [extractions] = useState(2);

    useEffect(() => {
        setCurrency(Currencies.filter(curr => curr.id === transaction.tCurrency)[0].currIdentifier)
    }, [transaction])


    setTimeout(() => {
        setLoading(false)
    }, 0);

    return (
        <>
            {
                loading ?
                    <div className="w-100 py-4 d-flex justify-content-center align-items-center">
                        <Loader />
                    </div> :
                    <div className="mb-3 transaction">
                        {/* General Area */}
                        <div className="row">
                            <div className="col-12">
                                <h5>Transaction {transaction.id}</h5>
                                <p className='ps-2 small'>
                                    Started at: {transaction.tDate}
                                    <br />
                                    Status: <TransactionStatus isOpen={openTransaction} />
                                </p>
                            </div>
                        </div>

                        {/* Details Area */}
                        <div className="row details-area">
                            <div className="col-md-6 mb-3">
                                <h6>Deposits</h6>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <p className='ps-2 small'>
                                            Total amount: {transaction.tAmount} {currency}
                                            <br />
                                            Total spent: {transaction.tSpent} CUP
                                            <br />
                                            Number of deposits: {deposits}
                                        </p>
                                    </div>
                                    <div className="col-sm-6 pe-5">
                                        <div className="w-100 d-flex justify-content-start justify-content-sm-end">
                                            <NavLink to={`${transaction.id}/${RESELL_ROUTES.RESELL_ROOTS.deposit}`} className="text-decoration-none">
                                                <Button className="btn-sm btn-success" text="See all" />
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <h6>Extractions</h6>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <p className='ps-2 small'>
                                            Total amount: {transaction.tSpent} CUP
                                            <br />
                                            Number of extractions: {extractions}
                                        </p>
                                    </div>
                                    <div className="col-sm-6 pe-5">
                                        <div className="w-100 d-flex justify-content-start justify-content-sm-end">
                                            <NavLink to={`${transaction.id}/${RESELL_ROUTES.RESELL_ROOTS.extraction}`} className="text-decoration-none">
                                                <Button className="btn-sm btn-success" text="See all" />
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Buttons Area */}
                        <div className="row">
                            <div className="col-12">
                                <div className="d-flex align-items-center justify-content-start justify-content-md-end w-100 gap-3 flex-wrap">
                                    <NavLink to={`${CRUD_ROOTS.update}/${transaction.id}`} className='text-decoration-none'>
                                        <Button className="btn-sm btn-primary" text="Modify Transaction" iconLeft={faPencil} />
                                    </NavLink><NavLink to={`${CRUD_ROOTS.delete}/${transaction.id}`} className='text-decoration-none'>
                                        <Button className="btn-sm btn-danger" text="Delete Transaction" iconLeft={faTrash} />
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}
