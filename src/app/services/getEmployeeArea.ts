import type IArea from '../interfaces/IArea'
import axiosInstance from './axiosInstance'

export const getEmployeeArea = async (id: string) => {
    try {
        const response = await axiosInstance.get(`/area/by-employee/${id}`)

        const area: IArea = response.data

        return area
    } catch (error) {
        console.error('getEmployeeArea service error', error)
        throw error
    }
}
