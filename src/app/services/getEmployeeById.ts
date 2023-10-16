import type IEmployee from '../interfaces/IEmployee'
import axiosInstance from './axiosInstance'

export const getEmployeeById = async (id: string): Promise<IEmployee> => {
    try {
        const response = await axiosInstance.get(`/employee/by/${id}`)

        const employee: IEmployee = response.data

        return employee
    } catch (error) {
        console.error('getEmployeeById service error', error)
        throw error
    }
}
