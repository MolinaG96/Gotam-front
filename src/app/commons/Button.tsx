import React from 'react'
import '../styles/button.css'

interface ButtonProps {
    children: string
    onClick?: () => void | Promise<void>
    disabled?: boolean
    type: string
    className?: string
}

export const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    disabled,
    type,
    className,
}) => {
    return (
        <button
            className={`absolute  border-none focus:outline-none button-generic transition motion-safe:hover:scale-110 ${
                className ?? ''
            }`}
            type={type === 'button' ? 'button' : 'submit'}
            onClick={onClick}
            disabled={disabled}
        >
            <div className="cont-img">
                <img
                    src="https://res.cloudinary.com/dqf9xgsfp/image/upload/v1697142000/gotam/img/genericbutton_mx6iyk.png"
                    alt="Button background"
                    className="btt"
                />
            </div>
            <div className="cont-p">{children}</div>
        </button>
    )
}
