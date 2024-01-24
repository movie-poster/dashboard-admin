import Swal from 'sweetalert2';

export const MessageError = async (text) => {
  await Swal.fire({
    title: "¡Algo salió mal!",
    text,
    confirmButtonColor: '#158B3D',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Cerrar',
    icon: "error",
  });
}

export const MessageInfo = async (title, text) => {
  await Swal.fire({
    title,
    text,
    icon: 'info',
  });
}

export const MessageSuccess = async (text, timer = 1200) => {
  return await Swal.fire({
    title: '¡Todo salió bien!',
    text,
    icon: 'success',
    focusConfirm: true,
    returnFocus: false,
    timer,
    timerProgressBar: true,
  })
}

export const MessageDelete = async (data) => {
  Swal.fire({
    text: data,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Eliminado correctamente!',
        '',
        'success'
      )
    }
  })
}

export const MessageVerifyCodes = async (save) => {
  await Swal.fire({
    text: "El documento no posee códigos o algunos de ellos fueron marcados como inválidos. ¿Desea guardar los cambios de todas formas?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si',
  }).then((result) => {
    if (result.isConfirmed) {
      save();
    }
  })
}

export const MessageConfirm = async (title, html) => {
  const result = await Swal.fire({
    title,
    html,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'Si',
    cancelButtonText: 'No',
    focusCancel: true,
  });
  return result.isConfirmed;
}

export const MessageLevels = async (id, goAccessOrUsers) => {
  const result = await Swal.fire({
    title: '¡No hay niveles de acceso!',
    text: `Sin accesos no es posible ${id === 0 ? 'crear' : 'editar'} el usuario, ¿Desea crear niveles de accesos? `,
    icon: 'warning',
    showDenyButton: true,
    confirmButtonColor: '#3085d6',
    denyButtonColor: '#d33',
    confirmButtonText: 'Si',
    denyButtonText: 'No'
  });
  let p = true;
  if (result.isConfirmed) {
    goAccessOrUsers(p);
  } else {
    goAccessOrUsers(!p);
  }
}

