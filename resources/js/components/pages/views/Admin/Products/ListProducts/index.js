import React, { useState, useEffect } from 'react'
import axios from 'axios'
import swal from 'sweetalert'
import { Link } from 'react-router-dom';
import Pagination from 'react-js-pagination'
const ListProduct = () => {
    const [products, setProduct] = useState({});
    const [category, setCategory] = useState([]);
    const [pageProduct, setPageProduct] = useState([]);
    useEffect(() => {
        callDataProducts(), callDataCategory()
    }, []);
    const callDataProducts = (pageNumber = 1) => {
        axios.get(`/api/productPage?page=${pageNumber}`)
            .then(respone => {
                console.log(respone.data)
                setProduct(respone.data);
                setPageProduct(respone.data.data)
            }).catch(error => console.log(error))
    }
    const callDataCategory = () => {
        axios.get('/api/category')
            .then(response => {
                setCategory(response.data)
            }).catch(error => console.log(error));
    };
    const getCategory = (cate_id) => {
        for (let i = 0; i < category.length; i++) {
            if (category[i].id === cate_id) {
                return category[i].name;
            }
        }
    }
    const deleteProduct = (id) => {
        swal({
            title: "Bạn có chắc chắn muốn xóa sản phẩm này?",
            icon: "warning",
            buttons: true,
            buttons: ["Hủy", "Xóa"],
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.post(`/api/products/delete/${id}`)
                        .then(respone => {
                            swal("Xóa sản phẩm thành công!", {
                                icon: "success",
                                timer: 2000
                            });
                            setProduct(respone.data)
                        }).catch(error => console.log(error))
                }
            });
    }
    const list = pageProduct.map(({ id, name, cate_id, image, price, quantity }, index) => {
        return (
            <tr key={index}>
                <td>{id}</td>
                <td><Link to={`/admin/products/${id}`}>{name}</Link></td>
                <td>
                    {getCategory(cate_id)}
                </td>
                <td><img src={image} alt="" width={70} /></td>
                <td>{price}$</td>
                <td>{quantity}</td>
                <td>
                    <Link className="btn btn-primary mr-1" to={`/admin/products/edit/${id}`} >Edit</Link>
                    <button className="btn btn-danger" onClick={() => deleteProduct(id)} >Delete</button>
                </td>
            </tr>
        )
    })
    return (
        <div>
            <h1 className="h3 mb-2 text-gray-800">Danh sách sản phẩm</h1>
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
                                    <th>Category</th>
                                    <th>Image</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Action</th>
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
                activePage={products.current_page}
                itemsCountPerPage={products.per_page}
                totalItemsCount={products.total}
                onChange={(pageNumber) => callDataProducts(pageNumber)}
                itemClass="page-item"
                linkClass="page-link"
                firstPageText="First"
                lastPageText="Last"
            />
        </div>
    );
}
export default ListProduct