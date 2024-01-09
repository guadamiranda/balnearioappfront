'use client'

import ABMTemplate from "@/Components/templates/abmTemplate/ABMTemplate";
import Dropdown from "@/Components/Atoms/DropDown/Dropdown";
import discountServices from "@/Services/discountServices";
import { HiOutlineIdentification } from "react-icons/hi2";
import Button from "@/Components/Atoms/button/button";
import priceServices from "@/Services/priceServices";
import Input from "@/Components/Atoms/Input/input";
import AlertServices from "@/utils/AlertServices";
import style from './onlyOneDayStay.module.scss';
import GuardLogin from "@/utils/guardLogin";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { TbNumbers } from "react-icons/tb";
import reserveServices from "@/Services/stayServices";

interface IDiscount {
    name: any,
    id: any,
    percent: any
}

const OnlyOneDayStay = () => {
    const router = useRouter();

    const [discount, setDiscount] = useState<IDiscount>({} as IDiscount);
    const [allDiscounts, setAllDiscounts] = useState<IDiscount[]>([]);
    const [isLoadingButtons, setIsLoadingButtons] = useState(false);
    const [disableButton, setDisableButton] = useState(false);
    const [partnerNumber, setPartnerNumber] = useState('');
    const [dateFromUnix, setDateFromUnix] = useState(0);
    const [amountPrice, setAmountPrice] = useState(0);
    const [dateToUnix, setDateToUnix] = useState(0);
    const [dniNumber, setDniNumber] = useState('');
    const [dayPrice, setDayPrice] = useState(0);
    const prueba = true

    const buildVisitor = () => {
        return [
            {
                dni: dniNumber.toString(),
                firstName: '',
                lastName: '',
                phone: '',
                location: '',
                memberNumber: partnerNumber.toString(),
                wristbandNumber: '',
                idDiscount: Object.keys(discount).length === 0 ? '' : discount.id.toString(),
                isManager: true
            },
        ]
    }

    const buildStay = () => {
        return {
            initDate: (dateFromUnix * 1000).toString(),
            finishDate: (dateToUnix * 1000).toString(),
            amount: amountPrice,
            stayType: '2c9e4708-3f2b-4ae9-99ac-d68172d0bf0e',
            group: {
                idCampsite: '86abe192-f273-45ea-b2ac-103312791439',
                carPlate: null,
                quantityAnimals: ''
            },
            visitors: buildVisitor()
        }
    }

    async function registerReserveOneDay() {
        setIsLoadingButtons(true)
        setDisableButton(true)

        if(!dniNumber) {
            setDisableButton(false)
            setIsLoadingButtons(false)

            AlertServices.renderAlert(
                'Error',
                'Falta ingresar el DNI',
                'error',
            )
            return
        }

        const newReserve = buildStay()
        const response = await reserveServices.postStayOneDay(newReserve)
        if (response?.status === 201) {
            console.log(newReserve)
            AlertServices.renderAlertWithOnlyButtonConfirmAndFunction(
                'Completado',
                'Se creo una reserva correctamente',
                'success',
                () => window.location.reload()
            )
            return
        }

        
        if (response?.status == 500) {
            setDisableButton(false)
            AlertServices.renderAlert(
                'Error',
                'Algo salio mal, contactese con el administrador',
                'error',
            )
            return
        }
    }


    const calculatePrice = () => {
        const price = partnerNumber ? 0 : dayPrice
        const priceWithDiscount = price - (price * (discount.percent / 100))
        const priceWithoutDiscount = price
        setAmountPrice(Object.keys(discount).length === 0 ? priceWithoutDiscount : priceWithDiscount)
    }

    const calculateUnixDate = (completeDateFrom: Date, completeDateTo: Date) => {
        completeDateFrom.setHours(9)
        completeDateFrom.setMinutes(0)
        completeDateFrom.setSeconds(0)

        completeDateTo.setHours(21)
        completeDateTo.setMinutes(0)
        completeDateTo.setSeconds(0)

        const unixTimeFrom = Math.floor(completeDateFrom.getTime() / 1000);
        const unixTimeTo = Math.floor(completeDateTo.getTime() / 1000);

        return {
            unixTimeFrom,
            unixTimeTo
        }
    }

    const setActualDay = () => {
        const completeDateFrom = new Date()
        const completeDateTo = new Date()
        const calculatedUnixDays = calculateUnixDate(completeDateFrom, completeDateTo)

        setDateFromUnix(calculatedUnixDays.unixTimeFrom)
        setDateToUnix(calculatedUnixDays.unixTimeTo)
    }

    const getDiscountsFromEndPoint = async () => {
        const allDiscounts = await discountServices.getDiscounts()
        setAllDiscounts(allDiscounts.filter(discount => !discount.isDeleted))
    }

    const allPricesFromEndpoint = async () => {
        const allPrices = await priceServices.getPrices()

        for (var i = 0; i < allPrices.length; i++) {
            if (allPrices[i].name === 'Dia') setDayPrice(allPrices[i].amount)
        }
    }

    useEffect(() => {
        getDiscountsFromEndPoint()
        setActualDay()
        allPricesFromEndpoint()
        calculatePrice()
    }, [])

    useEffect(() => {
        calculatePrice()
    }, [partnerNumber, discount, dniNumber])


    return (
        <GuardLogin>
            <ABMTemplate
                title="Registrar día"
                subTitle="Formulario para registrar una persona que va a pasar un día">

                <div className={style.onlyOneDatStay__container}>
                    <div>
                        <div className={style.onlyOneDatStay__firstGroupInput}>
                            <Input
                                type="number"
                                icon={<HiOutlineIdentification />}
                                placeholder='23567998'
                                title='Número de DNI (*)'
                                value={dniNumber}
                                useStateFunction={setDniNumber} />

                            <Input
                                type="number"
                                icon={<TbNumbers />}
                                placeholder='2313'
                                title='Número de Socio'
                                value={partnerNumber}
                                useStateFunction={setPartnerNumber} />
                        </div>

                        <div>
                            <Dropdown
                                title='Ninguno'
                                options={allDiscounts}
                                titleDropdown="Seleccione un Descuento"
                                selectedValueFunction={setDiscount}
                            />
                        </div>
                    </div>

                    <div className={style.onlyOneDatStay__containerPrice}>
                        <div className={style.onlyOneDatStay__title}>Total de la Estadía</div>
                        <div className={style.onlyOneDatStay__priceContainer}>
                            <b className={style.onlyOneDatStay__price}>
                                $ {amountPrice}
                            </b>
                        </div>
                    </div>


                    <div className={style.onlyOneDatStay__buttonContainer}>
                        <Button
                            isFullWidth={true}
                            isLoading={isLoadingButtons}
                            text='Realizar Reserva'
                            onClickFunction={() => disableButton === false ? registerReserveOneDay() : null}
                            type='primary'
                        />
                    </div>

                </div>

            </ABMTemplate>
        </GuardLogin >
    )
}

export default OnlyOneDayStay