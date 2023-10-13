import type IEmployee from '../interfaces/IEmployee'
import axiosInstance from './axiosInstance'

export const getAllEmployees = async (): Promise<IEmployee[]> => {
    const response = await axiosInstance.get('/all-employees')

    const employee: IEmployee[] = response.data

    return employee
}
