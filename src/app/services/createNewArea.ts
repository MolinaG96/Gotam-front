import type INewArea from '../interfaces/INewArea'
import axiosInstance from './axiosInstance'

export const createNewArea = async (area: string): Promise<INewArea> => {
    try {
        const response = await axiosInstance.post('/area/new-area', {
            area,
        })

        const newArea: INewArea = response.data

        return newArea
    } catch (error) {
        console.error('createNewArea service error', error)
        throw error
    }
}
