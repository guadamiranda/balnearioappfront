import Swal from "sweetalert2";

type typeAlert = 'success' | 'error' | 'warning' | 'info' | 'question'


export default {
    renderAlert: (title: string, message:string, typeAlert: typeAlert) => {
        Swal.fire({
            title: title,
            icon: typeAlert,
            text: message,
            confirmButtonText: 'Ok',
          })
    },

    renderAlertPermission: () => {
        Swal.fire({
            title: 'Faltan Permisos',
            icon: 'info',
            text: 'Para acceder a esta opción es necesario tener permisos',
            confirmButtonText: 'Ok',
        })
    }
}