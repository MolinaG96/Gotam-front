import axiosInstance from './axiosInstance'

export const persistence = async () => {
    try {
        const response = await axiosInstance.post('/secret')
        return response.data.user
    } catch (error) {
        console.error('Persistence service error', error)
    }
}
