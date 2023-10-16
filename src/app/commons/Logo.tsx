import { useRouter } from 'next/navigation'
import type ILogoProps from '../interfaces/props/ILogoProps'

const Logo: React.FC<ILogoProps> = ({ disable }) => {
    const router = useRouter()
    return (
        <img
            src="https://res.cloudinary.com/dqf9xgsfp/image/upload/v1697143559/gotam/img/gotamTittle_mkdyoe.png"
            className="absolute w-[17vw] top-[1vh] left-[2vw] z-30 cursor-pointer"
            alt="Gotam-logo"
            onClick={() => {
                !disable && router.push('/employees-management')
            }}
        />
    )
}

export default Logo
