import axios from 'axios'
import IUser from '../interfaces/IUser'

export const login = async (
    email: string,
    password: string
): Promise<IUser> => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080'

    const response = await axios.post(
        `${apiUrl}/user/login`,
        {
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
