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
    }
}