import type IArea from '../interfaces/IArea'
import axiosInstance from './axiosInstance'

export const updateAreaWithNewEmployee = async (
    _id: string,
    area: string,
    employeeId: string
) => {
    try {
        const response = await axiosInstance.put('/area/edit', {
            _id,
            area,
            employeeId,
        })

        const areaUpdated: IArea = response.data

        return areaUpdated
    } catch (error) {
        console.error('updateAreaWithNewEmployee service error', error)
        throw error
    }
}
