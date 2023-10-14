'use client'
import '../../styles/employeeCreate.css'
import { Input } from '@/app/commons/Input'
import useInput from '@/app/hooks/useInput'
import { useEffect, useState } from 'react'
import { RiLogoutBoxLine } from 'react-icons/ri'
import { FaUserPlus, FaGraduationCap } from 'react-icons/fa'
import { BiCreditCardFront } from 'react-icons/bi'
import { AiOutlineMail } from 'react-icons/ai'
import { MdDescription } from 'react-icons/md'
import { createNewEmployee } from '@/app/services/createNewEmployee'
import { Button } from '@/app/commons/Button'
import Swal from 'sweetalert2'
import { createNewArea } from '@/app/services/createNewArea'
import IArea from '@/app/interfaces/IArea'
import { getAllAreas } from '@/app/services/getAllAreas'
import { updateAreaWithNewEmployee } from '@/app/services/updateAreaWithNewEmployee'

const NewEmployee = () => {
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
                    text: 'Su DNI tiene que contener entre 7 y 8 digitos!',
                    icon: 'error',
                })
                return
            }

            const newEmployee = await createNewEmployee({
                name: name.value,
                dni: dni.value,
                birthday: birthday.value,
                developer: developer,
                description: description.value,
            })

            if (newEmployee !== null) {
                await updateAreaWithNewEmployee(
                    selectedArea._id,
                    selectedArea.area,
                    newEmployee
                )
                await Swal.fire({
                    text: 'Empleado creado con éxito!',
                    icon: 'success',
                    confirmButtonText: 'Ok',
                })
                name.reset()
                dni.reset()
                birthday.reset()
                setDeveloper(false)
                description.reset()
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
            event.target.value = ''
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

    useEffect(() => {
        void fetchAllAreas()
    }, [])

    return (
        <div
            className=" min-h-screen flex items-center justify-center bg-cover bg-center bg-fixed bg-no-repeat w-screen h-screen"
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
            {/* employee */}
            <div className="h-full w-[50%] flex justify-end items-center">
                <div className="cont-login front mr-24">
                    <div className="nav-login w-full h-[10%] flex justify-start items-center">
                        <div className="circle bg-[#76aed6]"></div>
                        <div className="circle bg-[#fda971]"></div>
                        <div className="circle bg-[#aef496]"></div>
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
                                        <AiOutlineMail className="w-full h-full" />
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
                                <Button type={'submit'} className={'btn-login'}>
                                    CREAR EMPLEADO
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* area */}

            <div className=" h-full w-[50%] flex justify-start items-center ">
                <div className="cont-login2 front ml-24 ">
                    <div className="nav-login w-full h-[10%] flex justify-start items-center">
                        <div className="square bg-[#EAFAB0] flex justify-center items-center">
                            <div className="line line1 "></div>
                            <div className="line line2 "></div>
                        </div>
                    </div>
                    <div className=" cont-in w-full h-[90%] flex justify-center items-center">
                        <div className="cont-inin w-[95%] h-[95%]">
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
                                        className={'btn-login'}
                                    >
                                        CREAR AREA
                                    </Button>
                                </div>
                                <div>
                                    <select
                                        id="areas"
                                        className="mt-[11vh] mb-[11vh] bg-[#e2eb99] border-2 border-blue-600 p-2 placeholder-gray-600 font-disketMonoBold text-black"
                                        onChange={handleSelectArea}
                                    >
                                        <option className="s" value="">
                                            Selecciona un área
                                        </option>
                                        {Areas !== undefined &&
                                            Areas.map((area) => (
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
