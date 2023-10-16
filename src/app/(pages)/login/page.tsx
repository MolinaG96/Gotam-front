'use client'
import { Button } from '@/app/commons/Button'
import '../../styles/login.css'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'
import { login } from '@/app/services/login'
import useInput from '@/app/hooks/useInput'
import { useState } from 'react'
import { Input } from '@/app/commons/Input'
import {
    AiOutlineEye,
    AiOutlineEyeInvisible,
    AiOutlineMail,
} from 'react-icons/ai'
import { HiOutlineLockClosed } from 'react-icons/hi'
import type IUser from '@/app/interfaces/IUser'
import Logo from '@/app/commons/Logo'

const Login = () => {
    const router = useRouter()
    const email = useInput('')
    const password = useInput('')
    const [showPassword, setShowPassword] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword)
    }

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const user: IUser = await login(email.value, password.value)

            if (user !== null) {
                router.push('/employees-management')
            }
        } catch (error) {
            await Swal.fire({
                text: 'Email y/o contraseña incorrectos',
                icon: 'error',
            })
            console.error('handleLogin error', error)
        }
    }

    const handleSignUp = async () => {
        try {
            router.push('/signup')
        } catch (error) {
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
            <Logo disable={true} />
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
                        <div className="mb-4">
                            <Input
                                placeholder="email:"
                                type="text"
                                iconType={
                                    <AiOutlineMail className="w-full h-full" />
                                }
                                value={email.value}
                                onChange={email.onChange}
                            />
                        </div>
                        <div className="mb-[5vw] ">
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="contraseña"
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
                            <Button
                                type={'button'}
                                className="btn-reg"
                                onClick={handleSignUp}
                            >
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
