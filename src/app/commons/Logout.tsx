import { useRouter } from 'next/navigation'
import { RiLogoutBoxLine } from 'react-icons/ri'
import Swal from 'sweetalert2'

const Logout = () => {
    const router = useRouter()
    const handleLogout = async () => {
        const result = await Swal.fire({
            text: '¿Está seguro que desea salir?',
            icon: 'warning',
            confirmButtonText: 'Si',
            cancelButtonText: 'No',
            showCancelButton: true,
            confirmButtonColor: '#00EA77',
            cancelButtonColor: '#3D1DF3',
        })

        if (result.isConfirmed) {
            localStorage.removeItem('user')
            router.push('/login')
        }
    }

    return (
        <RiLogoutBoxLine
            className="absolute w-[6.5vw] h-[6.5vw] right-9 top-4 cursor-pointer"
            onClick={handleLogout}
        />
    )
}

export default Logout
