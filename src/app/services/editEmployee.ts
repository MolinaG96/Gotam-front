import type IEmployee from '../interfaces/IEmployee'

import axiosInstance from './axiosInstance'

export const editEmployee = async (
    newEmployee: IEmployee,
    _id: string,
    newArea: string,
    oldArea: string
) => {
    try {
        const response = await axiosInstance.put(
            `/employee/edit-employee/${_id}`,
            { newEmployee, newArea, oldArea }
        )

        const employee: IEmployee = response.data

        return employee
    } catch (error) {
        console.error('editEmployee service error', error)
        throw error
    }
}
