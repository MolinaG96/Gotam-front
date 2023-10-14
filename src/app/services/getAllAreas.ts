import IArea from '../interfaces/IArea'
import axiosInstance from './axiosInstance'

export const getAllAreas = async (): Promise<IArea[]> => {
    try {
        const response = await axiosInstance.get('/area/all-areas')

        const areas: IArea[] = response.data

        return areas
    } catch (error) {
        console.error('getAllAreas service error', error)
        throw error
    }
}
