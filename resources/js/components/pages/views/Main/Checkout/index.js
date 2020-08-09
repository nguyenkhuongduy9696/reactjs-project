import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import { Link, useLocation, useHistory } from 'react-router-dom';
import swal from 'sweetalert'
import { useForm } from 'react-hook-form'
const Checkout = () => {
    const [pro, setPro] = useState([]);
    const [total, setTotal] = useState(0);
    const history = useHistory();
    const { handleSubmit, register, errors } = useForm();
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
    const onHandleSubmit = (data) => {
        if (localStorage.length === 0) {
            swal({
                text: "Bạn vẫn chưa có sản phẩm nào trong giỏ hàng!",
                icon: "error",
                timer: 2000,
            });
        } else {
            swal({
                title: "Bạn có chắc chắn muốn đặt mua số sản phẩm này?",
                icon: "info",
                buttons: true,
                buttons: ["Hủy", "Đồng ý"]
            }).then((willAdd) => {
                if (willAdd) {
                    let item = {
                        name: data.name,
                        email: data.email,
                        address: data.address,
                        phone: data.phone,
                        total_price: total
                    }
                    axios.post('/api/orders', item)
                        .then(res => {
                            let id = res.data.id;
                            for (let i = 0; i < localStorage.length; i++) {
                                let key = localStorage.key(i);
                                let item2 = {
                                    order_id: id,
                                    product_id: key,
                                    quantity: localStorage.getItem(key)
                                }
                                axios.post('/api/order-detail', item2)
                                    .then(res => {
                                        console.log(res.data)
                                    }).catch(err => console.log(err))
                            }
                            swal("Đặt mua hàng thành công. Cảm ơn bạn đã lựa chọn E-Shopper!", {
                                icon: "success",
                                timer: 2000
                            });
                            localStorage.clear();
                            history.push('/');
                        }).catch(err => console.log(err))
                }
            });
        }
    }
    return (
        <div>
            <section id="cart_items">
                <h2 className="title text-center">Thanh toán</h2>
                <div className="row">
                    <div className="register-req">
                        <p>Nhập thông tin của bạn để hoàn tất quá trình thanh toán</p>
                    </div>
                    <div className="col-md-12">
                        <form id="main-contact-form" className="contact-form row"
                            onSubmit={handleSubmit(onHandleSubmit)}>
                            <div className="form-group col-md-6">
                                <input type="text" name="name"
                                    className="form-control"
                                    placeholder="Họ và tên"
                                    ref={register({ required: true, pattern: /^[\S][\S]/ })} />
                                <small className="form-err">
                                    {errors.name?.type === "required" && "Họ và tên không được để trống!"}
                                    {errors.name?.type === "pattern" && "Họ và tên không được để trống!"}
                                </small>
                            </div>
                            <div className="form-group col-md-6">
                                <input type="text" name="email"
                                    className="form-control"
                                    placeholder="Email"
                                    ref={register({ required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g })} />
                                <small className="form-err">
                                    {errors.email?.type === "required" && "Email không được để trống!"}
                                    {errors.email?.type === "pattern" && "Mời nhập email hợp lệ!"}
                                </small>
                            </div>
                            <div className="form-group col-md-6">
                                <input type="text" name="address"
                                    className="form-control"
                                    placeholder="Địa chỉ"
                                    ref={register({ required: true, pattern: /^[\S][\S]/ })} />
                                <small className="form-err">
                                    {errors.address?.type === "required" && "Địa chỉ không được để trống!"}
                                    {errors.address?.type === "pattern" && "Địa chỉ không được để trống!"}
                                </small>
                            </div>
                            <div className="form-group col-md-6">
                                <input type="text" name="phone"
                                    className="form-control"
                                    placeholder="Điện thoại"
                                    ref={register({ required: true, pattern: /((09|03|07|08|05)+([0-9]{8})\b)/g })} />
                                <small className="form-err">
                                    {errors.phone?.type === "required" && "Số điện thoại không được để trống!"}
                                    {errors.phone?.type === "pattern" && "Mời nhập số điện thoại hợp lệ!"}
                                </small>
                            </div>
                            <br /><br /><hr /><br />
                            <h2 className="title">Chi tiết đơn hàng</h2>
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
                            <div className="form-group col-md-12">
                                <button type="submit" className="btn btn-primary pull-right">Thanh toán</button>
                            </div>
                        </form>
                    </div>
                </div>

            </section>
        </div>
    );
}

export default Checkout