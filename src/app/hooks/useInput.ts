import { useState } from 'react'

export default function useInput<T>(initialValue: T) {
    const [value, setValue] = useState<T>(initialValue)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value as unknown as T)
    }

    const reset = () => {
        setValue(initialValue)
    }

    return { value, onChange: handleChange, reset }
}
