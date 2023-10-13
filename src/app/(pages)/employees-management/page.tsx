'use client'
import '../../styles/employeeM.css'
import { RiLogoutBoxLine } from 'react-icons/ri'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import type IEmployee from '@/app/interfaces/IEmployee'
import { useEffect, useState } from 'react'
import EmployeeCard from '@/app/components/EmployeeCard'

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

    // const fetchAllPackages = async () => {
    //     try {
    //         const allPackages = await getAllPackages()
    //         setCurrentPackages(allPackages)
    //     } catch (error) {
    //         console.error('fetchAllPackages error', error)
    //     }
    // }

    // const fetchAllInProgress = async () => {
    //     try {
    //         const allPackages = await getAllInProgress()
    //         setCurrentPackages(allPackages)
    //     } catch (error) {
    //         console.error('fetchAllInProgress error', error)
    //     }
    // }

    // const fetchAllDelivered = async () => {
    //     try {
    //         const allPackages = await getAllDelivered()
    //         setCurrentPackages(allPackages)
    //     } catch (error) {
    //         console.error('fetchAllDelivered error', error)
    //     }
    // }

    // const fetchAllPending = async () => {
    //     try {
    //         const allPackages = await getAllPending()
    //         setCurrentPackages(allPackages)
    //     } catch (error) {
    //         console.error('fetchAllPending error', error)
    //     }
    // }

    // const handleDelete = async (packageId: string) => {
    //     try {
    //         const result = await Swal.fire({
    //             text: '¿Está seguro que deseas eliminar este paquete?',
    //             icon: 'warning',
    //             confirmButtonText: 'Si',
    //             cancelButtonText: 'No',
    //             showCancelButton: true,
    //             confirmButtonColor: '#00EA77',
    //             cancelButtonColor: '#3D1DF3',
    //         })

    //         if (result.isConfirmed) {
    //             await deletePackage(packageId)
    //             const packagesFiltered = currentPackages.filter(
    //                 (packageToRemove) => packageToRemove._id !== packageId
    //             )
    //             setCurrentPackages(packagesFiltered)
    //             await Swal.fire({
    //                 text: 'Paquete eliminado correctamente!',
    //                 icon: 'success',
    //                 confirmButtonText: 'Ok',
    //             })
    //         }
    //     } catch (error) {
    //         console.error('handleDelete error', error)
    //     }
    // }

    const employeesArr = [
        {
            _id: '1',
            name: 'John Doe',
            dni: 123456789,
            birthday: '1990-05-15',
            developer: true,
            area: 'cocina',
            description: 'Experienced web developer',
        },
        {
            _id: '2',
            name: 'Alice Smith',
            dni: 987654321,
            birthday: '1985-08-22',
            developer: false,
            area: 'marketing',
            description: 'Graphic designer and illustrator',
        },
        {
            _id: '3',
            name: 'Eva Johnson',
            dni: 654321987,
            birthday: '1992-11-10',
            developer: true,
            area: 'recursos humanos',
            description: 'Frontend developer with a passion for UX',
        },
        {
            _id: '4',
            name: 'Michael Brown',
            dni: 456789123,
            birthday: '1987-03-28',
            developer: false,
            area: 'frontend',
            description: 'Backend developer specializing in databases',
        },
        {
            _id: '4',
            name: 'Michael Brown',
            dni: 456789123,
            birthday: '1987-03-28',
            developer: false,
            area: 'frontend',
            description: 'Backend developer specializing in databases',
        },
        {
            _id: '5',
            name: 'micaela alabardina',
            dni: 234567890,
            birthday: '1994-06-05',
            developer: true,
            area: 'backend',
            description: 'Full-stack developer and tech enthusiast',
        },
        {
            _id: '1',
            name: 'John Doe',
            dni: 123456789,
            birthday: '1990-05-15',
            developer: true,
            area: 'cocina',
            description: 'Experienced web developer',
        },
        {
            _id: '2',
            name: 'Alice Smith',
            dni: 987654321,
            birthday: '1985-08-22',
            developer: false,
            area: 'marketing',
            description: 'Graphic designer and illustrator',
        },
        {
            _id: '3',
            name: 'Eva Johnson',
            dni: 654321987,
            birthday: '1992-11-10',
            developer: true,
            area: 'recursos humanos',
            description: 'Frontend developer with a passion for UX',
        },
        {
            _id: '4',
            name: 'Michael Brown',
            dni: 456789123,
            birthday: '1987-03-28',
            developer: false,
            area: 'frontend',
            description: 'Backend developer specializing in databases',
        },
        {
            _id: '4',
            name: 'Michael Brown',
            dni: 456789123,
            birthday: '1987-03-28',
            developer: false,
            area: 'frontend',
            description: 'Backend developer specializing in databases',
        },
        {
            _id: '5',
            name: 'micaela alabardina',
            dni: 234567890,
            birthday: '1994-06-05',
            developer: true,
            area: 'backend',
            description: 'Full-stack developer and tech enthusiast',
        },
        {
            _id: '5',
            name: 'micaela alabardina',
            dni: 234567890,
            birthday: '1994-06-05',
            developer: true,
            area: 'backend',
            description: 'Full-stack developer and tech enthusiast',
        },
    ]

    useEffect(() => {
        // void fetchAllPackages()
        setEmployees(employeesArr)
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
