import React, { useState, useEffect } from 'react'
import axios from 'axios'
import swal from 'sweetalert'
import { Link } from 'react-router-dom'
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
    const deleteProduct = (id) => {
        swal({
            title: "Bạn có chắc chắn muốn xóa danh mục này?",
            icon: "warning",
            buttons: true,
            buttons: ["Hủy", "Xóa"],
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.post(`/api/category/delete/${id}`)
                        .then(respone => {
                            swal("Xóa danh mục thành công!", {
                                icon: "success",
                                timer: 2000
                            });
                            setCategory(respone.data)
                        }).catch(error => console.log(error))
                }
            });
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
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {category.map(({ id, name }, index) => (
                                    <tr key={index}>
                                        <td>{id}</td>
                                        <td>{name}</td>
                                        <td>
                                            <Link className="btn btn-primary mr-1" to={`/admin/category/edit/${id}`} >Edit</Link>
                                            <button className="btn btn-danger" onClick={() => deleteProduct(id)} >Delete</button>
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