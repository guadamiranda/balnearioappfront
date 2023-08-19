import { useState, useEffect } from 'react'
import style from './vehiculeSection.module.scss'
import AddVehicule from '@/Components/Molecules/AddVehicule/AddVehicule'
import ButtonAction from '@/Components/Atoms/ButtonAction/ButtonAction'
import Encabezado from '@/Components/Atoms/Encabezado/Encabezado'

import { VscAdd } from 'react-icons/vsc'

interface IVehiculeSection {
    amountVehicules: number,
    vehicules: Array<IVehicule>,
    setVehicules: (vehicule: any) => void,
    setAmountVehicules: (amount: any) => void
}

type IVehicule = {
    index: number,
    key: number,
    carPlate: string
}

const VehiculeSection: React.FC<IVehiculeSection> = ({
    vehicules,
    setVehicules,
    amountVehicules,
    setAmountVehicules
    }) => {

    const [vehiculeIndex, setVehiculeIndex] = useState(0)

    const addVehiculeComponent = () => {
        const newVehicule = {key:vehiculeIndex, index:vehiculeIndex, carPlate: ''}
        setVehicules([...vehicules, newVehicule])
        setVehiculeIndex(vehiculeIndex + 1)
        setAmountVehicules(amountVehicules + 1)
    }

    const deleteVehiculeComponent = (index:number) => {
        const vehiculesWithoutDeletedComponent = vehicules.filter((vehicule) => vehicule.index !== index);
        setVehicules(vehiculesWithoutDeletedComponent)
        setAmountVehicules(amountVehicules - 1)
    } 

    const handleCarPlateNumber = (index: number, carPlateNumber: string) => {
        setVehicules(
            vehicules.map((vehicule) => {
                if(vehicule.index === index){
                    return { ...vehicule, carPlate: carPlateNumber }
                }
                return vehicule;
                })
        )
    }

    return(
        <div className={style.vehiculeSection__section}>
            <Encabezado title='Datos de los Vehiculos'/>
            <ButtonAction title='Vehiculo' icon={<VscAdd/>} onClickFunction={() => addVehiculeComponent()}/>
            <div className={style.vehiculeSection__vehiculeContainer}>
                {vehicules.map((vehicule) => <AddVehicule key={vehicule.key} 
                                                          index={vehicule.index}
                                                          deleteComponent={() => deleteVehiculeComponent(vehicule.index)}
                                                          handleCarPlateNumber={handleCarPlateNumber}/>)}
            </div>
        </div>
    )
}

export default VehiculeSection