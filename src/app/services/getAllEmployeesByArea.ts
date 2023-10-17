import type IArea from '../interfaces/IArea'
import axiosInstance from './axiosInstance'

export const getAllEmployeesByArea = async () => {
    const response = await axiosInstance.get('/employee/all-by-area')

    const areas: IArea[] = response.data

    return areas
}
