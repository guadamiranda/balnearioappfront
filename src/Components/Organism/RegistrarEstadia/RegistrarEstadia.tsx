import style from './registrarEstadia.module.scss'
import BotonAgregar from '@/Components/Atoms/BotonAgregar/BotonAgregar'
import Encabezado from '@/Components/Atoms/Encabezado/Encabezado' 
import Input from '@/Components/Atoms/Input/input'
import Title from '@/Components/Atoms/Titulo/Titulo'
import { BiLeaf } from 'react-icons/bi'
import { AiOutlineCar } from 'react-icons/ai'
import { HiOutlineIdentification } from 'react-icons/hi'

const RegistrarEstadia = () => {
    return(
        <div className={style.registrarEstadiaContainer}>
            <Title icon={<BiLeaf/>} subTitle='Ingresa los datos para registrar la estadía.' title='Registrar Estadía'/>
            <div className={style.registrarEstadiaContainer__formContainer}>
                <div className={style.registrarEstadiaContainer__formContainer__section}>
                    <Encabezado title='Encargado del Grupo'/>
                    <div className={style.registrarEstadiaContainer__formContainer__section__inputs}>
                        <Input icon={<HiOutlineIdentification/>} placeholder='99999999' title='Número de Documento'/>
                        <Input icon={<AiOutlineCar/>} placeholder='AB 123 CD' title='Patente del Vehiculo'/>
                    </div>
                </div>
                <div className={style.registrarEstadiaContainer__formContainer__section}>
                    <Encabezado title='Datos del Vehiculo'/>
                    <div className={style.registrarEstadiaContainer__formContainer__section__vehiculos}>
                        <BotonAgregar title='Vehiculo'/>
                    </div>
                </div>
                <div className={style.registrarEstadiaContainer__formContainer__section}>
                    <Encabezado title='Datos de la Estadía'/>
                    <div className={style.registrarEstadiaContainer__formContainer__section__estadia}>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegistrarEstadia