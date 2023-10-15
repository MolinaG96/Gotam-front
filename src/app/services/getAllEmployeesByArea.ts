import type IArea from '../interfaces/IArea'
import type IEmployee from '../interfaces/IEmployee'
import axiosInstance from './axiosInstance'

export const getAllEmployeesByArea = async (): Promise<IArea[]> => {
    const response = await axiosInstance.get('/employee/all-by-area')

    const areas: IArea[] = response.data

    return areas
}
