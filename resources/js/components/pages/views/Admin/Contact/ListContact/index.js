import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import usePaginate from '../../../../../paginate'
import Moment from 'react-moment'
const ListContact = () => {
    const [contact, setContact] = useState([]);
    const callDataContact = () => {
        Axios.get('/api/contact')
            .then(res => {
                setContact(res.data)
            }).catch(error => console.log(error))
    }
    const page = usePaginate(contact, 4);
    useEffect(() => {
        callDataContact()
    }, [])
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
                                {page.currentData().map(({ id, name, email, phone, message, created_at }, index) => (
                                    <tr key={index}>
                                        <td>{id}</td>
                                        <td>{name}</td>
                                        <td>{email}</td>
                                        <td>{phone}</td>
                                        <td><Moment format="DD/MM/YYYY hh:mm:ss">{created_at}</Moment></td>
                                        <td>{message}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item"><a className="page-link" href="#" onClick={() => page.jump(1)}>First</a></li>
                    <li className="page-item"><a className="page-link" href="" onClick={(e) => page.prev(e)}>Previous</a></li>
                    <li className="page-item"><p className="page-link text-success" href="#">Current Page: {page.currentPage}</p></li>
                    <li className="page-item"><a className="page-link" href="" onClick={(e) => page.next(e)}>Next</a></li>
                    <li className="page-item"><a className="page-link" href="#" onClick={() => page.jump(page.maxPage)}>Last</a></li>
                </ul>
            </nav>
        </div>
    );
}

export default ListContact