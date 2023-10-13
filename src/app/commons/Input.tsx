import React from 'react'

interface InputProps {
    customStyle?: string
    placeholder: string
    type: string
    iconType: React.ReactNode
    iconTypeRight?: React.ReactNode
    togglePasswordVisibility?: () => void
    showPassword?: boolean
    value: any
    onChange?: (data: any) => void
    required?: boolean
}

export const Input: React.FC<InputProps> = ({
    customStyle = '',
    placeholder,
    type,
    iconType,
    iconTypeRight,
    togglePasswordVisibility,
    value,
    onChange,
    required,
}) => {
    return (
        <div className="relative ">
            <input
                className={`border-2 border-blue-600 p-2 pl-10 w-full placeholder-gray-600 ${customStyle} font-disketMonoBold text-black`}
                type={type}
                style={{
                    maxWidth: '100%',
                }}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
            />
            <span className="absolute top-1/2 left-0 w-6 h-6 ml-3 transform -translate-y-1/2 z-50">
                {iconType}
            </span>
            {iconTypeRight && (
                <span
                    className="absolute top-1/2 right-3 w-6 h-6 transform -translate-y-1/2"
                    onClick={togglePasswordVisibility}
                >
                    {iconTypeRight}
                </span>
            )}
        </div>
    )
}
