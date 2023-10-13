'use client'
import '../../styles/employeeM.css'
import { RiLogoutBoxLine } from 'react-icons/ri'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import type IEmployee from '@/app/interfaces/IEmployee'
import { useEffect, useState } from 'react'
import EmployeeCard from '@/app/components/EmployeeCard'
import { getAllEmployees } from '@/app/services/getAllEmployees'

const EmployeesManagement = () => {
    const [employees, setEmployees] = useState<IEmployee[]>([])

    const sliderSettings = {
        arrows: false,
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesPerRow: 1,
        rows: 6,
    }

    const fetchAllEmployees = async () => {
        try {
            const allEmployees: IEmployee[] = await getAllEmployees()
            setEmployees(allEmployees)
        } catch (error) {
            console.error('fetchAllEmployees error', error)
        }
    }

    useEffect(() => {
        void fetchAllEmployees()
        setEmployees(employees)
    }, [])

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center bg-fixed bg-no-repeat w-screen h-screen"
            style={{
                backgroundImage:
                    'url(https://res.cloudinary.com/dqf9xgsfp/image/upload/v1697143587/gotam/fondos/home_jgasuo.png)',
            }}
        >
            <img
                src="https://res.cloudinary.com/dqf9xgsfp/image/upload/v1697143559/gotam/img/gotamTittle_mkdyoe.png"
                className="absolute w-[250px] top-[1vh] left-[2vw] z-30"
            />
            <RiLogoutBoxLine className="absolute w-20 h-20 right-8 top-5 cursor-pointer" />

            <div className="cont-login front overflow-hidden">
                <div className="nav-login w-full h-[10%] flex justify-start items-center">
                    <div className="circle bg-[#76aed6]"></div>
                    <div className="circle bg-[#fda971]"></div>
                    <div className="circle bg-[#aef496]"></div>
                </div>
                <div className="w-full h-[90%] bg-white">
                    <div
                        className="flex justify-between h-[5%] bg-[#3576d8] text-white px-4 text-[1.2vw] 
      font-disketMonoRegular border-b-[2px] border-black"
                    >
                        <div className="ml-[2.9vw] mr-[-9vw]">Nombre</div>
                        <div className="border-r-[2px] border-black h-[100%] mx-2"></div>
                        <div className="mx-[-10vw]">DNI</div>
                        <div className="border-r-[2px] border-black h-[100%] mx-2"></div>
                        <div className="mx-[-12vw]">nacimiento</div>
                        <div className="border-r-[2px] border-black h-[100%] mx-2"></div>
                        <div className="mx-[-13vw]">Desarrollador</div>
                        <div className="border-r-[2px] border-black h-[100%] mx-2"></div>
                        <div className="mx-[-9vw]">Area</div>
                        <div className="border-r-[2px] border-black h-[100%] mx-2"></div>
                        <div className="ml-[-7vw] mr-[5vw]">Descripción</div>
                    </div>
                    <div className="h-[95%]">
                        {employees.length > 0 ? (
                            <div className="grap-4 overflow-hidden">
                                <Slider className="mb-8" {...sliderSettings}>
                                    {employees.map((employee, index) => (
                                        <EmployeeCard
                                            employee={employee}
                                            key={index}
                                        />
                                    ))}
                                </Slider>
                            </div>
                        ) : (
                            <div>No hay empleados cargados</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeesManagement
