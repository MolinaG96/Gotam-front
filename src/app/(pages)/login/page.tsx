'use client'
import { Button } from '@/app/commons/Button'
import '../../styles/login.css'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'
import { login } from '@/app/services/login'
import useInput from '@/app/hooks/useInput'
import { useState } from 'react'
import { Input } from '@/app/commons/Input'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { BiSolidUser } from 'react-icons/bi'
import { RiLogoutBoxLine } from 'react-icons/ri'
import { HiOutlineLockClosed } from 'react-icons/hi'
import type IUser from '@/app/interfaces/IUser'

const Login = () => {
    const router = useRouter()
    const email = useInput('')
    const password = useInput('')
    const [showPassword, setShowPassword] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword)
    }

    const handleLogin = async (e: any) => {
        e.preventDefault()
        try {
            const user: IUser = await login(email.value, password.value)

            if (user !== null) {
                router.push('/employees')
            }
        } catch (error) {
            await Swal.fire({
                text: 'Email y/o contraseña incorrectos',
                icon: 'error',
            })
            console.error('handleLogin error', error)
        }
    }

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center bg-fixed bg-no-repeat w-screen h-screen"
            style={{
                backgroundImage:
                    'url(https://res.cloudinary.com/dqf9xgsfp/image/upload/v1697137410/gotam/fondos/fondoLS_jbycrw.png)',
            }}
        >
            <img
                src="https://res.cloudinary.com/dqf9xgsfp/image/upload/v1697143559/gotam/img/gotamTittle_mkdyoe.png"
                className="absolute w-[250px] top-[1vh] left-[2vw] z-30"
            />

            <RiLogoutBoxLine className="absolute w-20 h-20 right-8 top-5 cursor-pointer" />

            <div className="cont-login back"></div>

            <div className="cont-login front">
                <div className="nav-login w-full h-[20%] flex justify-start items-center">
                    <div className="circle bg-[#76aed6]"></div>
                    <div className="circle bg-[#fda971]"></div>
                    <div className="circle bg-[#aef496]"></div>
                </div>
                <div className="w-full h-[80%]">
                    <form
                        onSubmit={handleLogin}
                        className="px-8 pb-8 mb-4 w-full h-full flex flex-col align-center justify-center "
                    >
                        <div className="mb-4 bg-white">
                            <Input
                                placeholder="email@contraseña.com"
                                type="text"
                                iconType={
                                    <BiSolidUser className="w-full h-full" />
                                }
                                value={email.value}
                                onChange={email.onChange}
                            />
                        </div>
                        <div className="mb-[5vw] ">
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                value={password.value}
                                onChange={password.onChange}
                                iconType={
                                    <HiOutlineLockClosed className="w-full h-full" />
                                }
                                iconTypeRight={
                                    showPassword ? (
                                        <AiOutlineEye className="w-full h-full cursor-pointer" />
                                    ) : (
                                        <AiOutlineEyeInvisible className="w-full h-full cursor-pointer" />
                                    )
                                }
                                togglePasswordVisibility={
                                    togglePasswordVisibility
                                }
                            />
                        </div>
                        <div className="flex justify-center">
                            <Button type={'submit'} className="btn-login">
                                Iniciar sesion
                            </Button>
                        </div>
                        <div className="flex justify-center">
                            <Button type={'submit'} className="btn-reg">
                                REGISTRATE
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
