import type IUser from '../interfaces/IUser'
import axiosInstance from './axiosInstance'

export const persistence = async () => {
    try {
        const response = await axiosInstance.post('/user/secret')

        const user: IUser = response.data.user

        return user
    } catch (error) {
        console.error('Persistence service error', error)
    }
}
