'use client'

import '../../styles/employeeCreate.css'
import { Input } from '@/app/commons/Input'
import useInput from '@/app/hooks/useInput'
import { useEffect, useState } from 'react'
import { FaUserPlus, FaGraduationCap } from 'react-icons/fa'
import { BiCreditCardFront } from 'react-icons/bi'
import { MdDescription } from 'react-icons/md'
import { LiaBirthdayCakeSolid } from 'react-icons/lia'
import { createNewEmployee } from '@/app/services/createNewEmployee'
import { Button } from '@/app/commons/Button'
import Swal from 'sweetalert2'
import { createNewArea } from '@/app/services/createNewArea'
import type IArea from '@/app/interfaces/IArea'
import { getAllAreas } from '@/app/services/getAllAreas'
import { updateAreaWithNewEmployee } from '@/app/services/updateAreaWithNewEmployee'
import Logo from '@/app/commons/Logo'
import Logout from '@/app/commons/Logout'
import { persistence } from '@/app/services/persistence'
import type IUser from '@/app/interfaces/IUser'

const NewEmployee = () => {
    const [user, setUser] = useState<IUser>()
    const [developer, setDeveloper] = useState(false)
    const [Areas, setAreas] = useState<IArea[]>()
    const [selectedArea, setSelectedArea] = useState<IArea>()
    const name = useInput('')
    const dni = useInput(0)
    const birthday = useInput('')
    const description = useInput('')
    const area = useInput('')

    const handleNewEmployee = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            if (
                name.value === '' ||
                !dni.value ||
                birthday.value === '' ||
                description.value === '' ||
                parseFloat(dni.value.toString()) === 0
            ) {
                await Swal.fire({
                    text: 'Complete todos los campos para crear un empleado!',
                    icon: 'error',
                })
                return
            }

            if (selectedArea === undefined) {
                await Swal.fire({
                    text: 'Seleccione un area para crear un empleado!',
                    icon: 'error',
                })
                return
            }

            if (dni.value < 10000000 || dni.value > 100000000) {
                await Swal.fire({
                    text: 'El DNI tiene que ser mayor a 10.000.000 y menor a 100.000.000!',
                    icon: 'error',
                })
                return
            }

            const newEmployee = await createNewEmployee({
                name: name.value,
                dni: dni.value,
                birthday: birthday.value,
                developer,
                description: description.value,
            })

            if (newEmployee?._id) {
                await updateAreaWithNewEmployee(
                    selectedArea._id,
                    selectedArea.area,
                    newEmployee._id
                )
                await Swal.fire({
                    text: 'Empleado creado con éxito!',
                    icon: 'success',
                    confirmButtonText: 'Ok',
                })
                name.reset()
                dni.reset()
                birthday.reset()
                description.reset()
                setDeveloper(false)
                setSelectedArea(undefined)
            } else {
                await Swal.fire({
                    text: 'Error al crear empleado, intente nuevamente mas tarde',
                    icon: 'error',
                })
            }
        } catch (error) {
            console.error('handleNewEmployee error', error)
            await Swal.fire({
                text: 'Ya existe ese empleado!',
                icon: 'error',
            })
        }
    }

    const handleNewArea = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            if (area.value.length > 50) {
                await Swal.fire({
                    text: 'El nombre del area puede tener un maximo de 50 caracteres',
                    icon: 'error',
                })
                return
            }
            if (area.value === '') {
                await Swal.fire({
                    text: 'No se puede crear un area sin nombre',
                    icon: 'error',
                })
                return
            }

            const newArea = await createNewArea(area.value)

            if (newArea !== null) {
                await Swal.fire({
                    text: 'Area creada con éxito!',
                    icon: 'success',
                    confirmButtonText: 'Ok',
                })
                area.reset()
                await fetchAllAreas()
            }
        } catch (error) {
            console.error('handleNewArea error', error)
            await Swal.fire({
                text: 'Ya existe un area con ese nombre',
                icon: 'error',
            })
        }
    }

    const handleDeveloperChange = (event: any) => {
        setDeveloper(event.target.checked)
    }

    const handleSelectArea = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const areaId = event.target.value
        if (Areas !== undefined) {
            const selected = Areas.find((area) => area._id === areaId)
            setSelectedArea(selected)
        }
    }

    const fetchAllAreas = async () => {
        try {
            const fetchAreas = await getAllAreas()
            setAreas(fetchAreas)
        } catch (error) {
            console.error('fetchAllAreas error', error)
        }
    }

    const fetchUserByToken = async () => {
        try {
            const userByToken = await persistence()

            if (userByToken !== null) {
                setUser(userByToken)
            }
        } catch (error) {
            console.error('Error al obtener el usuario:', error)
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('user')
        if (token !== null && user === undefined) void fetchUserByToken()
        if (user !== undefined) void fetchAllAreas()
    }, [user])

    return (
        <div
            className=" min-h-screen flex items-center justify-center bg-cover bg-center bg-fixed bg-no-repeat w-screen h-screen"
            style={{
                backgroundImage:
                    'url(https://res.cloudinary.com/dqf9xgsfp/image/upload/v1697143591/gotam/fondos/editemployee_ofcwnh.png)',
            }}
        >
            <Logo disable={false} />

            <Logout />
            {/* employee */}
            <div className="h-full w-[50%] flex justify-end items-center">
                <div className="container-employee-create z-10 mr-24">
                    <div className="employee-area-create-straight-line w-full h-[10%] flex justify-start items-center">
                        <div className="create-employee-circle bg-[#76aed6]"></div>
                        <div className="create-employee-circle bg-[#fda971]"></div>
                        <div className="create-employee-circle bg-[#aef496]"></div>
                    </div>
                    <div className="w-full h-[90%]">
                        <form
                            onSubmit={handleNewEmployee}
                            className="px-8 pb-8 mb-4 w-full h-full flex flex-col align-center justify-center "
                        >
                            <div className="mb-4">
                                <Input
                                    placeholder="nombre:"
                                    type="text"
                                    iconType={
                                        <FaUserPlus className="w-full h-full" />
                                    }
                                    value={name.value}
                                    onChange={name.onChange}
                                />
                            </div>
                            <div className="mb-4">
                                <Input
                                    placeholder="dni:"
                                    type="number"
                                    iconType={
                                        <BiCreditCardFront className="w-full h-full" />
                                    }
                                    value={
                                        parseFloat(dni.value.toString()) !== 0
                                            ? dni.value
                                            : ''
                                    }
                                    onChange={dni.onChange}
                                />
                            </div>
                            <div className="mb-4">
                                <Input
                                    placeholder="nacimiento:"
                                    type="text"
                                    iconType={
                                        <LiaBirthdayCakeSolid className="w-full h-full" />
                                    }
                                    value={birthday.value}
                                    onChange={birthday.onChange}
                                />
                            </div>
                            <div className="mb-4">
                                <Input
                                    placeholder="descripcion:"
                                    type="text"
                                    iconType={
                                        <MdDescription className="w-full h-full" />
                                    }
                                    value={description.value}
                                    onChange={description.onChange}
                                />
                            </div>
                            <div className="flex justify-center items-center font-disketMonoBold">
                                <div className="mr-2 ">desarrollador?:</div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={developer}
                                        onChange={handleDeveloperChange}
                                    />
                                    <div className="group peer ring-0 bg-rose-400  rounded-full outline-none duration-300 after:duration-300 w-16 h-8  shadow-md peer-checked:bg-emerald-500  peer-focus:outline-none  after:content-['✖️']  after:rounded-full after:absolute after:bg-gray-50 after:outline-none after:h-6 after:w-6 after:top-1 after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-8 peer-checked:after:content-['✔️'] peer-hover:after:scale-95"></div>
                                </label>
                            </div>
                            <div className="flex justify-center pt-[4.5vw]">
                                <Button
                                    type={'submit'}
                                    className="text-[1.1vw] w-[16vw]"
                                >
                                    CREAR EMPLEADO
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* area */}

            <div className=" h-full w-[50%] flex justify-start items-center ">
                <div className="container-area-create z-10 ml-24 ">
                    <div className="employee-area-create-straight-line w-full h-[10%] flex justify-start items-center">
                        <div className="square-create-area bg-[#EAFAB0] flex justify-center items-center">
                            <div className="line-square-create line-square-create-line1  "></div>
                            <div className="line-square-create line-square-create-line2 "></div>
                        </div>
                    </div>
                    <div className="container-area-create-bg w-full h-[90%] flex justify-center items-center">
                        <div className="container-area-create-bg-above-bg w-[95%] h-[95%]">
                            <form
                                onSubmit={handleNewArea}
                                className="px-8  w-full h-full flex flex-col justify-center"
                            >
                                <div className="">
                                    <Input
                                        placeholder="nueva area:"
                                        type="text"
                                        iconType={
                                            <FaGraduationCap className="w-full h-full" />
                                        }
                                        value={area.value}
                                        onChange={area.onChange}
                                    />
                                </div>
                                <div className="flex justify-center pt-[4vw]">
                                    <Button
                                        type={'submit'}
                                        className="text-[1.1vw] w-[16vw]"
                                    >
                                        CREAR AREA
                                    </Button>
                                </div>
                                <div>
                                    <select
                                        id="areas"
                                        className="mt-[11vh] mb-[11vh] bg-[#e2eb99] border-2 border-blue-600 p-2 placeholder-gray-600 font-disketMonoBold text-black"
                                        onChange={handleSelectArea}
                                        value={selectedArea?._id ?? ''}
                                    >
                                        <option className="s" value="">
                                            Selecciona un área
                                        </option>
                                        {Areas?.map((area) => (
                                            <option
                                                key={area._id}
                                                value={area._id}
                                            >
                                                {area.area}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewEmployee
