import type IEmployee from '../interfaces/IEmployee'

import axiosInstance from './axiosInstance'

export const createNewEmployee = async (
    newEmployee: IEmployee
): Promise<IEmployee> => {
    try {
        const response = await axiosInstance.post(
            '/employee/new-employee',
            newEmployee
        )

        const employee: IEmployee = response.data

        return employee
    } catch (error) {
        console.error('createNewEmployee service error', error)
        throw error
    }
}
