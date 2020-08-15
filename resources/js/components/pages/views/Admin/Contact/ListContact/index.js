import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import Pagination from 'react-js-pagination'
import Moment from 'react-moment'
const ListContact = () => {
    const [contact, setContact] = useState({});
    const [pageContact, setPageContact] = useState([]);
    useEffect(() => {
        callDataContact()
    }, [])
    const callDataContact = (pageNumber = 1) => {
        Axios.get(`/api/contact?page=${pageNumber}`)
            .then(res => {
                setContact(res.data)
                setPageContact(res.data.data)
            }).catch(error => console.log(error))
    }
    const list = pageContact.map(({ id, name, email, phone, message, created_at }, index) => {
        return (
            <tr key={index}>
                <td>{id}</td>
                <td>{name}</td>
                <td>{email}</td>
                <td>{phone}</td>
                <td><Moment format="DD/MM/YYYY hh:mm:ss">{created_at}</Moment></td>
                <td>{message}</td>
            </tr>
        );
    })
    return (
        <div>
            <h1 className="h3 mb-2 text-gray-800">Danh sách liên hệ</h1>
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
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Date received</th>
                                    <th>Message</th>
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
                activePage={contact.current_page}
                itemsCountPerPage={contact.per_page}
                totalItemsCount={contact.total}
                onChange={(pageNumber) => callDataContact(pageNumber)}
                itemClass="page-item"
                linkClass="page-link"
                firstPageText="First"
                lastPageText="Last"
            />
        </div>
    );
}

export default ListContact