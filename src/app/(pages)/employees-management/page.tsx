'use client'
import '@/app/styles/employeesManagement.css'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useEffect, useState } from 'react'
import { getAllEmployeesByArea } from '@/app/services/getAllEmployeesByArea'
import type IArea from '@/app/interfaces/IArea'
import EmployeeCard from '@/app/components/EmployeeCard'
import Logo from '@/app/commons/Logo'
import { FaUserPlus } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import Logout from '@/app/commons/Logout'

const EmployeesManagement = () => {
    const router = useRouter()
    const [areas, setAreas] = useState<IArea[]>([])

    const sliderSettings = {
        arrows: false,
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesPerRow: 1,
        rows: 6,
    }

    const fetchAllEmployeesByArea = async () => {
        try {
            const allAreas: IArea[] = await getAllEmployeesByArea()
            setAreas(allAreas)
        } catch (error) {
            console.error('fetchAllEmployeesByArea error', error)
        }
    }

    useEffect(() => {
        void fetchAllEmployeesByArea()
    }, [])

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center bg-fixed bg-no-repeat w-screen h-screen"
            style={{
                backgroundImage:
                    'url(https://res.cloudinary.com/dqf9xgsfp/image/upload/v1697143587/gotam/fondos/home_jgasuo.png)',
            }}
        >
            <Logo disable={true} />

            <Logout />

            <div className="cont-employees overflow-hidden">
                <div className="nav-employees w-full h-[10%] flex justify-between items-center">
                    <div className="flex justify-start items-center">
                        <div className="circle-employees bg-[#76aed6]"></div>
                        <div className="circle-employees bg-[#fda971]"></div>
                        <div className="circle-employees bg-[#aef496]"></div>
                    </div>
                    <FaUserPlus
                        className="mr-2 w-[3vw] h-[3vw] transition motion-safe:hover:scale-110 cursor-pointer"
                        onClick={() => {
                            router.push('/new-employee')
                        }}
                    />
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
                        {areas.length > 0 ? (
                            <div className="grap-4 overflow-hidden">
                                <Slider className="mb-8" {...sliderSettings}>
                                    {areas.map((area) =>
                                        area.employees.map((employee) => (
                                            <EmployeeCard
                                                employee={employee}
                                                area={area.area}
                                                key={employee._id}
                                            />
                                        ))
                                    )}
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
