import type IEmployee from '../interfaces/IEmployee'
import axiosInstance from './axiosInstance'

export const getEmployeeByDni = async (dni: number) => {
    try {
        const response = await axiosInstance.get(`/employee/obtain/by/${dni}`)

        const employee: IEmployee = response.data

        return employee
    } catch (error) {
        console.error('getEmployeeByDni service error', error)
        throw error
    }
}
