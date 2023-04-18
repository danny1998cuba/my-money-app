import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export const Button = ({
    iconLeft,
    iconRight,
    text,
    className,
    onClick = () => console.log('Nothing')
}) => {
    return (
        <button className={`btn px-3 py-2 d-flex align-items-center justify-content-center gap-2 ${className}`} onClick={() => onClick()}>
            {iconLeft && <FontAwesomeIcon icon={iconLeft} />}
            {text && text}
            {iconRight && <FontAwesomeIcon icon={iconRight} />}
        </button>
    )
}
