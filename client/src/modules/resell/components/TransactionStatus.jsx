import React from 'react'
import './transactionStatus.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

export const TransactionStatus = ({ isOpen = true }) => {
    return (
        <span className={`transactionStatus ms-2 ${isOpen ? 'open' : 'closed'}`}>
            <FontAwesomeIcon icon={isOpen ? faTimes : faCheck} />
            {isOpen ? "Open" : "Closed"}
        </span>
    )
}
