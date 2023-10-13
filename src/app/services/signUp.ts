import axios from 'axios'
import type IUser from '../interfaces/IUser'

export const signUpService = async (
    name: string,
    email: string,
    password: string
): Promise<IUser> => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080'

    const response = await axios.post(
        `${apiUrl}/user/signup`,
        {
            name,
            email,
            password,
        },
        {
            withCredentials: true,
        }
    )
    const user: IUser = response.data.user
    const token = response.data.token

    if (token !== undefined) {
        localStorage.setItem('user', token)
    }

    return user
}
