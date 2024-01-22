import Swal from "sweetalert2";


type typeAlert = 'success' | 'error' | 'warning' | 'info' | 'question'


export default {
    renderAlert: (title: string, message:string, typeAlert: typeAlert) => {
        Swal.fire({
            title: title,
            icon: typeAlert,
            text: message,
            confirmButtonText: 'Ok',
            confirmButtonColor: "#568871",
          })
    },

    renderAlertPermission: () => {
        Swal.fire({
            title: 'Faltan Permisos',
            icon: 'info',
            text: 'Para acceder a esta opción es necesario tener permisos',
            confirmButtonText: 'Ok',
            confirmButtonColor: "#568871",
        })
    },

    rederAlertWithConfirm: async (title: string, message: string, typeAlert: typeAlert, onConfirmFunction: () => void) => {
        const {isConfirmed} = await Swal.fire({
            title: title,
            text: message,
            icon: typeAlert,
            confirmButtonText: 'Finalizar',
            confirmButtonColor: "#568871",
            showCancelButton: true,
            denyButtonText: `Cancelar`,
          })
          
          if(isConfirmed) onConfirmFunction()
    },

    renderAlertWithOnlyButtonConfirm: async (title: string, message: string, typeAlert: typeAlert) => {
        const {isConfirmed} = await Swal.fire({
            title: title,
            text: message,
            icon: typeAlert,
            confirmButtonText: 'Ok',
            confirmButtonColor: "#568871",
            showCancelButton: true,
          })
          
         return isConfirmed
    },

    renderAlertWithOnlyButtonConfirmAndFunction: async (title: string, message: string, typeAlert: typeAlert, onConfirmFunction: () => void) => {
        const { isConfirmed } = await Swal.fire({
            title: title,
            text: message,
            icon: typeAlert,
            confirmButtonText: 'Finalizar',
            confirmButtonColor: "#568871",
            showCancelButton: false,
            allowOutsideClick: false
        })

        if (isConfirmed) onConfirmFunction()
    }
}