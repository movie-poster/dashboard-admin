import Swal from "sweetalert2";

const confirmDelete = async (functionConfirm) => {
    var message = '¿Estás seguro de eliminar este registro?';
    const result = await Swal.fire({
        title: message,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        denyButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        focusCancel: true,
    });

    if (result.isConfirmed) {
        await functionConfirm();
    }
}

export default confirmDelete;