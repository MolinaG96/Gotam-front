import type IArea from '../interfaces/IArea'
import axiosInstance from './axiosInstance'

export const getAreaByName = async (area: string) => {
    try {
        const response = await axiosInstance.get(`/area/obtain/by/${area}`)

        const areaVerification: IArea = response.data

        return areaVerification
    } catch (error) {
        console.error('getAreaByName service error', error)
        throw error
    }
}
