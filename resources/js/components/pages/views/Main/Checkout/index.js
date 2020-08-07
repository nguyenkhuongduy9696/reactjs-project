import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import swal from 'sweetalert'

const Checkout = () => {
    const [pro, setPro] = useState([]);
    const [total, setTotal] = useState(0)
    const getCart = () => {
        setPro([]);
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            Axios.get(`/api/products/${key}`)
                .then(res => {
                    setPro(pro => [...pro, res.data])
                    setTotal(total => total + (parseInt(localStorage.getItem(key) * res.data.price)))
                }).catch(err => console.log(err))
        }
    }
    useEffect(() => {
        getCart()
    }, [])
    console.log(total)
    return (
        <div>
            <section id="cart_items">
                <h2 className="title text-center">Thanh toán</h2>
                <div className="table-responsive cart_info">
                    <table className="table table-condensed">
                        <thead>
                            <tr className="cart_menu">
                                <td className="image">Image</td>
                                <td className="description">Product</td>
                                <td className="price">Price</td>
                                <td className="quantity">Quantity</td>
                                <td className="total">Total</td>
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
                                            <p> {localStorage.getItem(id)} </p>
                                        </div>
                                    </td>
                                    <td className="cart_total">
                                        <p className="cart_total_price">{localStorage.getItem(id) * price}$</p>
                                    </td>
                                </tr>
                            ))}
                            <tr className="cart_menu">
                                <td colSpan="4"><span className="pull-right mr-3">Total price: {total}</span></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Link to="/checkout" className="btn btn-default check_out pull-right" >Check Out</Link>
            </section>
        </div>
    );
}

export default Checkout