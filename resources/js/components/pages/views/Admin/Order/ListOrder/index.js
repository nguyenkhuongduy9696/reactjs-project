import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import usePagination from '../../../../../paginate';
import Moment from 'react-moment'
import { Link } from 'react-router-dom';
const ListOrder = () => {
    const [order, setOrder] = useState([]);
    const callDataOrder = () => {
        Axios.get('/api/orders')
            .then(res => {
                setOrder(res.data)
            }).catch(err => console.log(err))
    }
    const page = usePagination(order, 4);
    useEffect(() => {
        callDataOrder()
    }, [])
    return (
        <div>
            <h1 className="h3 mb-2 text-gray-800">Danh sách đơn hàng</h1>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary"></h6>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Address</th>
                                    <th>Phone</th>
                                    <th>Date Received</th>
                                    <th>Detail</th>
                                </tr>
                            </thead>
                            <tbody>
                                {page.currentData().map(({ id, name, address, phone, created_at }, index) => (
                                    <tr key={index}>
                                        <td>{id}</td>
                                        <td>{name}</td>
                                        <td>{address}</td>
                                        <td>{phone}</td>
                                        <td><Moment format="DD/MM/YYYY hh:mm:ss">{created_at}</Moment></td>
                                        <td>
                                            <Link className="btn btn-primary mr-1" to={`/admin/orders/${id}`} >Detail</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item"><a className="page-link" href="" onClick={(e) => page.jump(1, e)}>&#8920;</a></li>
                    <li className="page-item"><a className="page-link" href="" onClick={(e) => page.prev(e)}>&laquo;</a></li>
                    <li className="page-item"><p className="page-link text-success" href="#">{page.currentPage}</p></li>
                    <li className="page-item"><a className="page-link" href="" onClick={(e) => page.next(e)}>&raquo;</a></li>
                    <li className="page-item"><a className="page-link" href="" onClick={(e) => page.jump(page.maxPage, e)}>&#8921;</a></li>
                </ul>
            </nav>
        </div>
    );
}

export default ListOrder