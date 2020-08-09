import React, { useState, useEffect } from 'react'
import axios from 'axios'
import swal from 'sweetalert'
import { Link } from 'react-router-dom'
import usePaginate from '../../../../../paginate'
const ListCate = () => {
    const [category, setCategory] = useState([]);
    const [product, setProduct] = useState([]);
    const callDataCategory = () => {
        axios.get('/api/category')
            .then(response => {
                setCategory(response.data)
            })
            .catch(error => console.log(error));
    }
    const callDataProduct = () => {
        axios.get('/api/products')
            .then(response => {
                setProduct(response.data)

            })
            .catch(error => console.log(error));
    }
    useEffect(() => {
        callDataCategory(), callDataProduct();
    }, []);
    const getProduct = (id) => {
        let count = 0;
        for (let i = 0; i < product.length; i++) {
            if (product[i].cate_id === id) {
                count++;
            }
        }
        return count;
    }
    const page = usePaginate(category, 4)
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
                                    <th>Image</th>
                                    <th>Detail</th>
                                    <th>Products</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {page.currentData().map(({ id, name, image, detail }, index) => (
                                    <tr key={index}>
                                        <td>{id}</td>
                                        <td>{name}</td>
                                        <td><img src={image} alt="" width="70px" /></td>
                                        <td>
                                            <div dangerouslySetInnerHTML={{ __html: detail }}></div>
                                        </td>
                                        <td>{getProduct(id)}</td>
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
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item"><a className="page-link" href="" onClick={(e) => page.jump(1, e)}>First</a></li>
                    <li className="page-item"><a className="page-link" href="" onClick={(e) => page.prev(e)}>Previous</a></li>
                    <li className="page-item"><p className="page-link text-success" href="#">Current Page: {page.currentPage}</p></li>
                    <li className="page-item"><a className="page-link" href="" onClick={(e) => page.next(e)}>Next</a></li>
                    <li className="page-item"><a className="page-link" href="" onClick={(e) => page.jump(page.maxPage, e)}>Last</a></li>
                </ul>
            </nav>
        </div>
    );
}
export default ListCate