import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import Axios from 'axios';
import Moment from 'react-moment'
const OrderDetail = () => {
    function Order() {
        let { id } = useParams();
        const [order, setOrder] = useState({});
        const [detail, setDetail] = useState([]);
        const [pro, setPro] = useState([]);
        useEffect(() => {
            callDataDetail(), callDataOrder()
        }, [])
        const callDataOrder = () => {
            Axios.get(`/api/orders/${id}`)
                .then(res => {
                    setOrder(res.data)
                }).catch(err => console.log(err))
        }
        const callDataDetail = () => {
            Axios.get(`/api/getPro/${id}`)
                .then(res => {
                    for (let i = 0; i < res.data.length; i++) {
                        Axios.get(`/api/products/${res.data[i].product_id}`)
                            .then(response => {
                                setPro(pro => [...pro, response.data])
                            }).catch(err => console.log(err))
                    }
                    setDetail(res.data)
                }).catch(err => console.log(err))
        }
        const getQlt = (id) => {
            for (let i = 0; i < detail.length; i++) {
                if (detail[i].product_id === id) {
                    return detail[i].quantity;
                }
            }
        }
        return (
            <div>
                <h1 className="h3 mb-2 text-gray-800">Chi tiết đơn hàng</h1>
                <div className="card shadow mb-4">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-6">
                                <h4 className="text-primary">Thông tin khách hàng</h4><br />
                                <p><span className="text-primary">Họ tên khách hàng: </span> {order.name}</p>
                                <p><span className="text-primary">Email: </span> {order.email}</p>
                                <p><span className="text-primary">Địa chỉ: </span>{order.address}</p>
                                <p><span className="text-primary">Số điện thoại: </span>{order.phone}</p>
                                <p><span className="text-primary">Tổng giá trị đơn hàng: </span>{order.total_price}$</p>
                                <p><span className="text-primary">Ngày nhận đơn: </span> <Moment format="DD/MM/YYYY hh:mm:ss">{order.created_at}</Moment></p>
                            </div>
                        </div><br />
                        <div className="row">
                            <h4 className="text-primary">Chi tiết đơn hàng</h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="table-responsive">
                            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Image</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pro.map(({ id, name, image, price }, index) => (
                                        <tr key={index}>
                                            <td>{id}</td>
                                            <td><Link to={`/admin/products/${id}`}>{name}</Link></td>
                                            <td><img src={image} alt="" width={70} /></td>
                                            <td>{price}$</td>
                                            <td>{getQlt(id)}</td>
                                            <td>{getQlt(id) * price}$</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <Order />
    );
}

export default OrderDetail