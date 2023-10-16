'use client'
import '../../../styles/employeeAndAreaEdit.css'
import { Input } from '@/app/commons/Input'
import useInput from '@/app/hooks/useInput'
import { useEffect, useState } from 'react'
import { RiLogoutBoxLine } from 'react-icons/ri'
import { FaUserPlus, FaGraduationCap } from 'react-icons/fa'
import { LiaBirthdayCakeSolid } from 'react-icons/lia'
import { BiCreditCardFront } from 'react-icons/bi'
import { MdDescription } from 'react-icons/md'
import { Button } from '@/app/commons/Button'
import Swal from 'sweetalert2'
import type IArea from '@/app/interfaces/IArea'
import { getAllAreas } from '@/app/services/getAllAreas'
import { getEmployeeById } from '@/app/services/getEmployeeById'
import { editEmployee } from '@/app/services/editEmployee'
import { editAreaName } from '@/app/services/editAreaName'
import { getEmployeeArea } from '@/app/services/getEmployeeArea'
import { deleteEmployee } from '@/app/services/deleteEmployee'
import { deleteArea } from '@/app/services/deleteArea'

const EditEmployeeAndArea = ({ params }: { params: { id: string } }) => {
    const [Areas, setAreas] = useState<IArea[]>()
    const [selectedArea, setSelectedArea] = useState<IArea>()
    const area = useInput('')
    const [developer, setDeveloper] = useState(false)
    const name = useInput('')
    const dni = useInput(0)
    const birthday = useInput('')
    const description = useInput('')
    const [enableEdit, setEnableEdit] = useState(false)
    const [areaOfEmployeeToDelete, setAreaOfEmployeeToDelete] =
        useState<IArea>()

    const handleEditEmployee = async () => {
        try {
            if (
                name.value === '' ||
                !dni.value ||
                birthday.value === '' ||
                description.value === '' ||
                parseFloat(dni.value.toString()) === 0
            ) {
                await Swal.fire({
                    text: 'No puede haber campos vacios para editar un empleado!',
                    icon: 'error',
                })
                return
            }

            if (selectedArea === undefined) {
                await Swal.fire({
                    text: 'Seleccione un area para editar un empleado!',
                    icon: 'error',
                })
                return
            }

            if (dni.value < 10000000 || dni.value > 100000000) {
                await Swal.fire({
                    text: 'El DNI tiene que contener entre 7 y 8 digitos!',
                    icon: 'error',
                })
                return
            }

            if (
                name.value !== undefined &&
                birthday.value !== undefined &&
                developer !== undefined &&
                description.value !== undefined &&
                areaOfEmployeeToDelete !== undefined
            ) {
                const editedEmployee = await editEmployee(
                    {
                        name: name.value,
                        dni: dni.value,
                        birthday: birthday.value,
                        developer,
                        description: description.value,
                    },
                    params.id,
                    selectedArea.area,
                    areaOfEmployeeToDelete.area
                )

                if (editedEmployee !== null) {
                    await Swal.fire({
                        text: 'Empleado editado con éxito!',
                        icon: 'success',
                        confirmButtonText: 'Ok',
                    })
                    await fetchEmployee()
                } else {
                    await Swal.fire({
                        text: 'Error al editar el empleado, intente nuevamente mas tarde',
                        icon: 'error',
                    })
                }
            }
        } catch (error) {
            console.error('handleNewEmployee error', error)
            await Swal.fire({
                text: 'Error al editar el empleado!',
                icon: 'error',
            })
        }
    }

    const handleEditAreaName = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            if (area.value.length > 50) {
                await Swal.fire({
                    text: 'El nombre del area puede tener un maximo de 50 caracteres',
                    icon: 'error',
                })
                return
            }

            if (area.value === selectedArea?.area) {
                await Swal.fire({
                    text: 'Cambie el nombre del area para editarla',
                    icon: 'error',
                })
                return
            }
            if (area.value === '') {
                await Swal.fire({
                    text: 'No se puede editar un area sin caracteres',
                    icon: 'error',
                })
                return
            }

            if (selectedArea !== undefined) {
                const areaNameEdited = await editAreaName(
                    selectedArea._id,
                    area.value
                )
                if (areaNameEdited !== null) {
                    await Swal.fire({
                        text: 'Area editada con éxito!',
                        icon: 'success',
                        confirmButtonText: 'Ok',
                    })
                    setAreaOfEmployeeToDelete(areaNameEdited)
                    await fetchAllAreas()
                }
            }
        } catch (error) {
            console.error('handleEditAreaName error', error)
            await Swal.fire({
                text: 'Error al editar el nombre del area, intente mas tarde',
                icon: 'error',
            })
        }
    }

    const handleDeleteEmployee = async () => {
        try {
            const result = await Swal.fire({
                text: '¿Está seguro que desea eliminar este empleado?',
                icon: 'warning',
                confirmButtonText: 'Si',
                cancelButtonText: 'No',
                showCancelButton: true,
                confirmButtonColor: '#00EA77',
                cancelButtonColor: '#3D1DF3',
            })
            if (result.isConfirmed) {
                if (areaOfEmployeeToDelete !== undefined) {
                    const deletedEmployee = await deleteEmployee(
                        params.id,
                        areaOfEmployeeToDelete
                    )

                    if (deletedEmployee === '') {
                        await Swal.fire({
                            text: 'Empleado eliminado con éxito!',
                            icon: 'success',
                            confirmButtonText: 'Ok',
                        })
                        name.reset()
                        dni.reset()
                        birthday.reset()
                        description.reset()
                        setDeveloper(false)
                        setEnableEdit(false)
                        area.reset()
                    }
                }
            }
        } catch (error) {
            console.error('handleDeleteEmployee error', error)
            await Swal.fire({
                text: 'Error al eliminar el empleado, intente mas tarde',
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
            area.setValue(selected !== undefined ? selected.area : '')
        }
    }

    const handleDeleteArea = async () => {
        try {
            const result = await Swal.fire({
                text: '¿Está seguro que desea eliminar este area?',
                icon: 'warning',
                confirmButtonText: 'Si',
                cancelButtonText: 'No',
                showCancelButton: true,
                confirmButtonColor: '#00EA77',
                cancelButtonColor: '#3D1DF3',
            })
            if (result.isConfirmed) {
                if (selectedArea) {
                    const deletedArea = await deleteArea(selectedArea._id)
                    if (deletedArea === '') {
                        await Swal.fire({
                            text: 'Area eliminada con éxito!',
                            icon: 'success',
                            confirmButtonText: 'Ok',
                        })
                        area.reset()
                        setSelectedArea(undefined)
                        await fetchAllAreas()
                    } else {
                        if (deletedArea) {
                            await Swal.fire({
                                text: String(deletedArea),
                                icon: 'error',
                            })
                        }
                    }
                }
            }
        } catch (error) {
            console.error('handleDeleteArea error', error)
            await Swal.fire({
                text: 'Error al eliminar el area, intente mas tarde',
                icon: 'error',
            })
        }
    }

    const handleEnableEdit = () => {
        setEnableEdit(!enableEdit)
    }

    const fetchEmployee = async () => {
        try {
            const fetchedEmployee = await getEmployeeById(params.id)

            name.setValue(fetchedEmployee.name)
            dni.setValue(fetchedEmployee.dni)
            birthday.setValue(fetchedEmployee.birthday)
            description.setValue(fetchedEmployee.description)
            setDeveloper(fetchedEmployee.developer)
        } catch (error) {
            console.error('fetchEmployee error', error)
        }
    }

    const fetchEmployeeArea = async () => {
        try {
            const fetchedArea = await getEmployeeArea(params.id)
            area.setValue(fetchedArea.area)
            setSelectedArea(fetchedArea)
            setAreaOfEmployeeToDelete(fetchedArea)
        } catch (error) {
            console.error('fetchEmployeeArea error', error)
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
        void fetchEmployee()
        void fetchEmployeeArea()
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
                alt="Gotam-logo"
            />

            <RiLogoutBoxLine className="absolute w-20 h-20 right-8 top-5 cursor-pointer" />
            {/* employee */}
            <div className="h-full w-[50%] flex justify-end items-center">
                <div className="cont-login front mr-24">
                    <div className="nav-login w-full h-[10%] flex justify-between items-center">
                        <div className="flex justify-start items-center">
                            <div className="circle bg-[#76aed6]"></div>
                            <div className="circle bg-[#fda971]"></div>
                            <div className="circle bg-[#aef496]"></div>
                        </div>
                        <div className="mr-2">
                            <img
                                className="img-trash"
                                src="https://res.cloudinary.com/dqf9xgsfp/image/upload/v1697427941/gotam/img/cubo-de-basura_aruwah.png"
                                alt="trash"
                                onClick={handleDeleteEmployee}
                            />
                        </div>
                    </div>
                    <div className="w-full h-[90%]">
                        <div className="px-8 pb-8 mb-4 w-full h-full flex flex-col align-center justify-center ">
                            <div className="mb-4">
                                <Input
                                    placeholder="nombre:"
                                    type="text"
                                    iconType={
                                        <FaUserPlus className="w-full h-full" />
                                    }
                                    value={name.value}
                                    onChange={name.onChange}
                                    disable={!enableEdit}
                                />
                            </div>
                            <div className="mb-4">
                                <Input
                                    placeholder="dni:"
                                    type="number"
                                    iconType={
                                        <BiCreditCardFront className="w-full h-full" />
                                    }
                                    value={dni.value}
                                    onChange={dni.onChange}
                                    disable={!enableEdit}
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
                                    disable={!enableEdit}
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
                                    disable={!enableEdit}
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
                                        disabled={!enableEdit}
                                    />
                                    <div className="group peer ring-0 bg-rose-400  rounded-full outline-none duration-300 after:duration-300 w-16 h-8  shadow-md peer-checked:bg-emerald-500  peer-focus:outline-none  after:content-['✖️']  after:rounded-full after:absolute after:bg-gray-50 after:outline-none after:h-6 after:w-6 after:top-1 after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-8 peer-checked:after:content-['✔️'] peer-hover:after:scale-95"></div>
                                </label>
                            </div>
                            <div className="flex justify-center pt-[4.5vw]">
                                {enableEdit ? (
                                    <Button
                                        type={'submit'}
                                        className={'btn-login'}
                                        onClick={handleEditEmployee}
                                    >
                                        GUARDAR
                                    </Button>
                                ) : (
                                    <Button
                                        type={'button'}
                                        className={'btn-login'}
                                        onClick={handleEnableEdit}
                                    >
                                        EDITAR EMPLEADO
                                    </Button>
                                )}
                            </div>
                        </div>
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
                                onSubmit={handleEditAreaName}
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
                                        iconTypeRight={
                                            <img
                                                className="img-trash"
                                                src="https://res.cloudinary.com/dqf9xgsfp/image/upload/v1697427941/gotam/img/cubo-de-basura_aruwah.png"
                                                alt="trash"
                                                onClick={handleDeleteArea}
                                            />
                                        }
                                    />
                                </div>
                                <div className="flex justify-center pt-[4vw]">
                                    <Button
                                        type={'submit'}
                                        className={'btn-login'}
                                    >
                                        EDITAR AREA
                                    </Button>
                                </div>
                                <div>
                                    <select
                                        id="areas"
                                        className="mt-[11vh] mb-[11vh] bg-[#e2eb99] border-2 border-blue-600 p-2 placeholder-gray-600 font-disketMonoBold text-black"
                                        onChange={handleSelectArea}
                                        value={selectedArea?._id ?? ''}
                                    >
                                        <option className="" value="">
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

export default EditEmployeeAndArea
