import React, { useState, useEffect } from 'react'
import axios from 'axios'
const ListCate = () => {
    const [category, setCategory] = useState([]);
    const callDataCategory = () => {
        axios.get('/api/category')
            .then(response => {
                setCategory(response.data)
            })
            .catch(error => console.log(error));
    }
    useEffect(() => {
        callDataCategory();
    }, []);
    const deleteCategory = (id) => {

    }
    return (
        <div>
            <h1 className="h3 mb-2 text-gray-800">Danh sách danh mục</h1>
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
                                    <th>Date Created</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {category.map(({ id, name, created_at }, index) => (
                                    <tr key={index}>
                                        <td>{id}</td>
                                        <td>{name}</td>
                                        <td>{created_at}</td>
                                        <td>
                                            <button className="btn btn-danger" >Delete</button>
                                        </td>
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
export default ListCate