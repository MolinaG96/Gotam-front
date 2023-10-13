'use client'
import { Input } from '@/app/commons/Input'
import useInput from '@/app/hooks/useInput'
import type IEmployee from '@/app/interfaces/IEmployee'
import { useState } from 'react'
import { RiLogoutBoxLine } from 'react-icons/ri'
import { FaUserPlus, FaGraduationCap } from 'react-icons/fa'
import { BiCreditCardFront } from 'react-icons/bi'
import { AiOutlineMail } from 'react-icons/ai'
import { MdDescription } from 'react-icons/md'

const NewEmployee = () => {
    const [newEmployee, setNewEmployee] = useState<IEmployee>()
    const name = useInput('')
    const dni = useInput(0)
    const birthday = useInput('')
    const developer = useInput('')
    const description = useInput('')
    const area = useInput('')

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
            {/* employee */}
            <div className="cont-login front">
                <div className="nav-login w-full h-[20%] flex justify-start items-center">
                    <div className="circle bg-[#76aed6]"></div>
                    <div className="circle bg-[#fda971]"></div>
                    <div className="circle bg-[#aef496]"></div>
                </div>
                <div className="w-full h-[80%]">
                    <form
                        onSubmit={() => {}}
                        className="px-8 pb-8 mb-4 w-full h-full flex flex-col align-center justify-center "
                    >
                        <div className="mb-4">
                            <Input
                                placeholder="name:"
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
                                type="text"
                                iconType={
                                    <BiCreditCardFront className="w-full h-full" />
                                }
                                value={dni.value}
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
                    </form>
                </div>
            </div>
            {/* area */}
            <div className="">
                <div className="">
                    <form
                        onSubmit={() => {}}
                        className="px-8 pb-8 mb-4 w-full h-full flex flex-col align-center justify-center "
                    >
                        <div className="mb-4">
                            <Input
                                placeholder="name:"
                                type="text"
                                iconType={
                                    <FaGraduationCap className="w-full h-full" />
                                }
                                value={name.value}
                                onChange={name.onChange}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default NewEmployee
