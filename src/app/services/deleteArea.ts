import axiosInstance from './axiosInstance'

export const deleteArea = async (_id: string) => {
    try {
        const response = await axiosInstance.delete(`/area/delete/${_id}`)

        const deletedArea = response.data

        return deletedArea
    } catch (error) {
        console.error('deleteArea service error', error)
        throw error
    }
}
