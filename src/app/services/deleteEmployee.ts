import type IArea from '../interfaces/IArea'
import axiosInstance from './axiosInstance'

export const deleteEmployee = async (_id: string, area: IArea) => {
    try {
        const response = await axiosInstance.delete(`/employee/delete/${_id}`, {
            params: {
                area,
            },
        })

        const deletedEmployee = response.data

        return deletedEmployee
    } catch (error) {
        console.error('deleteEmployee service error', error)
        throw error
    }
}
