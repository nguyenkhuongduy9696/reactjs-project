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
    const up = (id) => {
        Axios.get(`/api/products/${id}`)
            .then(res => {
                let qlt = parseInt(localStorage.getItem(id));
                if (qlt < res.data.quantity) {
                    localStorage.setItem(id, qlt + 1);
                    getCart();
                }
            })
    }
    const down = (id) => {
        let qlt = parseInt(localStorage.getItem(id));
        if (qlt > 1) {
            localStorage.setItem(id, qlt - 1)
            getCart();
        } else {
            localStorage.removeItem(id);
            getCart();
        }
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
                                <td className="image">Image</td>
                                <td className="description">Product</td>
                                <td className="price">Price</td>
                                <td className="quantity">Quantity</td>
                                <td className="total">Total</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {pro.map(({ id, name, image, price }, index) => (
                                <tr key={index}>
                                    <td className="cart_product">
                                        <Link to={`/product/${id}`}><img src={image} alt="" width="60px" /></Link>
                                    </td>
                                    <td className="cart_description">
                                        <h4><Link to={`/product/${id}`}>{name}</Link></h4>
                                    </td>
                                    <td className="cart_price">
                                        <p>{price}$</p>
                                    </td>
                                    <td className="cart_quantity">
                                        <div className="cart_quantity_button">
                                            <button onClick={() => down(id)} className="btn btn-default"> - </button>
                                            <span> {localStorage.getItem(id)} </span>
                                            <button onClick={() => up(id)} className="btn btn-default"> + </button>
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
                <Link to="/checkout" className="btn btn-default check_out pull-right" >Check Out</Link>
            </section>

        </div>
    );
}

export default Cart