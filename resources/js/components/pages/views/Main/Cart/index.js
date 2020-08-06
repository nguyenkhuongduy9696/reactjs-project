import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import swal from 'sweetalert'
const Cart = () => {
    const [pro, setPro] = useState([]);
    const getCart = () => {
        setPro([]);
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            Axios.get(`/api/products/${key}`)
                .then(res => {
                    setPro(pro => [...pro, res.data])
                }).catch(err => console.log(err))
        }
    }
    const delItem = (id) => {
        swal({
            title: "Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?",
            icon: "warning",
            buttons: true,
            buttons: ["Hủy", "Xóa"],
        })
            .then((willDelete) => {
                if (willDelete) {
                    localStorage.removeItem(id);
                    swal("Đã xóa sản phẩm khỏi giỏ hàng!", {
                        icon: "success",
                        timer: 2000
                    });
                    getCart();
                }
            });
    }
    useEffect(() => {
        getCart()
    }, [])
    return (
        <div>
            <section id="cart_items">
                <h2 className="title text-center">Giỏ hàng</h2>
                <div className="table-responsive cart_info">
                    <table className="table table-condensed">
                        <thead>
                            <tr className="cart_menu">
                                <td className="image">Item</td>
                                <td className="description" />
                                <td className="price">Price</td>
                                <td className="quantity">Quantity</td>
                                <td className="total">Total</td>
                                <td />
                            </tr>
                        </thead>
                        <tbody>
                            {pro.map(({ id, name, image, price }, index) => (
                                <tr key={index}>
                                    <td className="cart_product">
                                        <a href="#"><img src={image} alt="" width="60px" /></a>
                                    </td>
                                    <td className="cart_description">
                                        <h4><a href="#">{name}</a></h4>
                                    </td>
                                    <td className="cart_price">
                                        <p>{price}$</p>
                                    </td>
                                    <td className="cart_quantity">
                                        <div className="cart_quantity_button">
                                            <button className="btn btn-default"> + </button>
                                            <span> {localStorage.getItem(id)} </span>
                                            <button className="btn btn-default"> - </button>
                                        </div>
                                    </td>
                                    <td className="cart_total">
                                        <p className="cart_total_price">{localStorage.getItem(id) * price}$</p>
                                    </td>
                                    <td className="cart_delete">
                                        <button onClick={() => delItem(id)} className="btn btn-default" ><i className="fa fa-times"></i></button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

        </div>
    );
}

export default Cart