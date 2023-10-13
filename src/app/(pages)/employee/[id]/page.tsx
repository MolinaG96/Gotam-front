'use client'
import type IArea from '@/app/interfaces/IArea'
import type IEmployee from '@/app/interfaces/IEmployee'
import { getEmployeeById } from '@/app/services/getEmployeeById'
import { useEffect, useState } from 'react'
import { RiLogoutBoxLine } from 'react-icons/ri'

const EmployeeId = ({ params }: { params: { id: string } }) => {
    const [employee, setEmployee] = useState<IEmployee>()
    const [area, setArea] = useState<IArea>()

    const fetchEmployee = async () => {
        try {
            const employeeById: IEmployee = await getEmployeeById(params.id)

            setEmployee(employeeById)
        } catch (error) {
            console.error('fetchEmployee error', error)
        }
    }

    useEffect(() => {
        void fetchEmployee()
    }, [])

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center bg-fixed bg-no-repeat w-screen h-screen"
            style={{
                backgroundImage:
                    'url(https://res.cloudinary.com/dqf9xgsfp/image/upload/v1697143591/gotam/fondos/editemployee_ofcwnh.png)',
            }}
        >
            <img
                src="https://res.cloudinary.com/dqf9xgsfp/image/upload/v1697143559/gotam/img/gotamTittle_mkdyoe.png"
                className="absolute w-[250px] top-[1vh] left-[2vw] z-30"
            />

            <RiLogoutBoxLine className="absolute w-20 h-20 right-8 top-5 cursor-pointer" />
        </div>
    )
}

export default EmployeeId
