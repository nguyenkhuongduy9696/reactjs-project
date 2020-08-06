import React, { useState } from 'react'
import swal from 'sweetalert'
const cart = () => {
    function addCart(id) {
        if (localStorage.getItem(id) == null) {
            localStorage.setItem(id, 1);
            swal({
                text: "Thêm sản phẩm vào giỏ hàng thành công!",
                icon: "success",
                timer: 2000,
            });
        } else {
            localStorage.setItem(id, parseInt(localStorage.getItem(id)) + 1);
            swal({
                text: "Đã tăng số lượng của sản phẩm thêm 1!",
                icon: "success",
                timer: 2000,
            });
        }
        console.log(localStorage)
    }
    return { addCart }
}

export default cart