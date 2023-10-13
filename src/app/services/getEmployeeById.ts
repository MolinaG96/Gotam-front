import type IEmployee from '../interfaces/IEmployee'
import axiosInstance from './axiosInstance'

export const getEmployeeById = async (id: string): Promise<IEmployee> => {
    const response = await axiosInstance.get(`/${id}`)

    const employee: IEmployee = response.data

    return employee
}
