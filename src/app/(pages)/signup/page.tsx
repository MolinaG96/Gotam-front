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
import { HiOutlineLockClosed } from 'react-icons/hi'
import type IUser from '@/app/interfaces/IUser'
import { signUpService } from '@/app/services/signUp'

const SignUp = () => {
    const router = useRouter()
    const email = useInput('')
    const password = useInput('')
    const confirmPassword = useInput('')
    const [showPassword, setShowPassword] = useState(false)
    const [showPassword2, setShowPassword2] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword)
    }

    const togglePasswordVisibility2 = () => {
        setShowPassword2((prevShowPassword2) => !prevShowPassword2)
    }

    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            if (!validateEmail(email.value)) {
                await Swal.fire({
                    text: 'El email debe tener formato de mail',
                    icon: 'error',
                })
                return
            }

            if (password.value !== confirmPassword.value) {
                await Swal.fire({
                    text: 'Las contraseñas deben ser iguales',
                    icon: 'error',
                })
                return
            }

            const newUser: IUser = await signUpService(
                email.value,
                password.value
            )

            if (newUser !== null) {
                await Swal.fire({
                    text: 'Usuario creado éxito!',
                    icon: 'success',
                    confirmButtonText: 'Ok',
                })
                router.push('/login')
            } else {
                await Swal.fire({
                    text: 'Error al crear el usuario, intente nuevamente mas tarde',
                    icon: 'error',
                })
            }
        } catch (error) {
            await Swal.fire({
                text: 'Email y/o contraseña incorrectos',
                icon: 'error',
            })
            console.error('handleLogin error', error)
        }
    }

    const validateEmail = (email: string) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        return regex.test(email)
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
            <div className="cont-login back"></div>
            <div className="cont-login front">
                <div className="nav-login w-full h-[20%] flex justify-start items-center">
                    <div className="circle bg-[#76aed6]"></div>
                    <div className="circle bg-[#fda971]"></div>
                    <div className="circle bg-[#aef496]"></div>
                </div>
                <div className="w-full h-[80%]">
                    <form
                        onSubmit={handleSignUp}
                        className="px-8 w-full h-full flex flex-col align-center justify-center "
                    >
                        <div className="mb-4">
                            <Input
                                placeholder="email:"
                                type="text"
                                iconType={
                                    <BiSolidUser className="w-full h-full" />
                                }
                                value={email.value}
                                onChange={email.onChange}
                            />
                        </div>
                        <div className="mb-4">
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
                        <div className="mb-[5vw]">
                            <Input
                                type={showPassword2 ? 'text' : 'password'}
                                placeholder="confirmar contraseña"
                                value={confirmPassword.value}
                                onChange={confirmPassword.onChange}
                                iconType={
                                    <HiOutlineLockClosed className="w-full h-full" />
                                }
                                iconTypeRight={
                                    showPassword2 ? (
                                        <AiOutlineEye className="w-full h-full cursor-pointer" />
                                    ) : (
                                        <AiOutlineEyeInvisible className="w-full h-full cursor-pointer" />
                                    )
                                }
                                togglePasswordVisibility={
                                    togglePasswordVisibility2
                                }
                            />
                        </div>
                        <div className="flex justify-center">
                            <Button type={'submit'} className="btn-login">
                                CREAR CUENTA
                            </Button>
                            <h1
                                className="cursor-pointer font-disketMonoRegular mt-3"
                                onClick={() => {
                                    router.push('/login')
                                }}
                            >
                                ¿ya tienes cuenta?¡ingresar!
                            </h1>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUp
