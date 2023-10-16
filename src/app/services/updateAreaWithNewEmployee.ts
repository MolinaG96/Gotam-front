import type IArea from '../interfaces/IArea'
import type IEmployee from '../interfaces/IEmployee'
import axiosInstance from './axiosInstance'

export const updateAreaWithNewEmployee = async (
    _id: string,
    area: string,
    employeeData: IEmployee
): Promise<IArea> => {
    try {
        const employee: IEmployee = employeeData
        const response = await axiosInstance.put('/area/edit', {
            _id,
            area,
            employee,
        })

        const areaUpdated: IArea = response.data

        return areaUpdated
    } catch (error) {
        console.error('updateAreaWithNewEmployee service error', error)
        throw error
    }
}
