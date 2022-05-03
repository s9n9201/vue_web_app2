import swal from "sweetalert2";

class customSwal {
    Toast=swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1500,
    });

    Confirm=swal.mixin({
        scrollbarPadding: false,
        background: "#FCFCFC",
        showCancelButton: true,
        focusCancel: true,
        reverseButtons: true,
        customClass: {
            confirmButton: "custom-confirmbtn custom-confirmbtn-light-danger",
            cancelButton: "custom-confirmbtn custom-confirmbtn-light-primary"
        },
    });
}

export default new customSwal();