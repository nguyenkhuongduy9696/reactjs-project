import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import Pagination from 'react-js-pagination'
import Moment from 'react-moment'
import { Link } from 'react-router-dom';
const ListOrder = () => {
    const [order, setOrder] = useState({});
    const [pageOrder, setPageOrder] = useState([]);
    useEffect(() => {
        callDataOrder()
    }, [])
    const callDataOrder = (pageNumber = 1) => {
        Axios.get(`/api/orders?page=${pageNumber}`)
            .then(res => {
                setOrder(res.data)
                setPageOrder(res.data.data)
            }).catch(err => console.log(err))
    }
    const list = pageOrder.map(({ id, name, address, phone, created_at }, index) => {
        return (
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
        )
    })
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
                                {list}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Pagination
                activePage={order.current_page}
                itemsCountPerPage={order.per_page}
                totalItemsCount={order.total}
                onChange={(pageNumber) => callDataOrder(pageNumber)}
                itemClass="page-item"
                linkClass="page-link"
                firstPageText="First"
                lastPageText="Last"
            />
        </div>
    );
}

export default ListOrder