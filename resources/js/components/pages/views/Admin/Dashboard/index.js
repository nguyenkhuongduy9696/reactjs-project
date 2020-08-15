import React, { useState, useEffect } from 'react'
import Axios from 'axios';

const Dashboard = () => {
    const [product, setProduct] = useState([]);
    const [blog, setBlog] = useState([]);
    const [contact, setContact] = useState([]);
    const [order, setOrder] = useState([]);
    const callDataProduct = () => {
        Axios.get('/api/products')
            .then(res => {
                setProduct(res.data)
            }).catch(err => console.log(err))
    }
    const callDataBlog = () => {
        Axios.get('/api/blogs')
            .then(res => {
                setBlog(res.data)
            }).catch(err => console.log(err))
    }
    const callDataContact = () => {
        Axios.get('/api/contact?page=1')
            .then(res => {
                setContact(res.data.total)
            }).catch(err => console.log(err))
    }
    const callDataOrder = () => {
        Axios.get('/api/orders?page=1')
            .then(res => {
                setOrder(res.data.total)
            }).catch(err => console.log(err))
    }
    useEffect(() => {
        callDataProduct(), callDataBlog(), callDataContact(), callDataOrder()
    }, [])
    return (
        <div>
            <div className="row">
                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-primary shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Tổng số sản phẩm</div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{product.length}</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fab fa-product-hunt fa-2x text-primary" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-success shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Tổng số bài viết</div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{blog.length}</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fab fa-blogger fa-2x text-success" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-warning shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Phản hồi của khách hàng</div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{contact}</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-envelope fa-2x text-warning" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-info shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Tổng số đơn hàng</div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{order}</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-shopping-cart fa-2x text-primary" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Dashboard