import type IArea from '../interfaces/IArea'
import axiosInstance from './axiosInstance'

export const editAreaName = async (_id: string, area: string) => {
    try {
        const response = await axiosInstance.put('/area/edit-area-name', {
            _id,
            area,
        })

        const newArea: IArea = response.data

        return newArea
    } catch (error) {
        console.error('createNewArea service error', error)
        throw error
    }
}
