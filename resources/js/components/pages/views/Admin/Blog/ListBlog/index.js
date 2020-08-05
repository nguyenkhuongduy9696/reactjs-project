import React, { useState, useEffect } from 'react'
import axios from 'axios'
import swal from 'sweetalert'
import { Link } from 'react-router-dom'
import usePaginate from '../../../../../paginate'
const ListBlog = () => {
    const [category, setCategory] = useState([]);
    const [blogs, setBlog] = useState([]);
    const callDataCategory = () => {
        axios.get('/api/category')
            .then(response => {
                setCategory(response.data)
            })
            .catch(error => console.log(error));
    }
    const callDataBlog = () => {
        axios.get('/api/blogs')
            .then(res => {
                setBlog(res.data)
            })
            .catch(error => console.log(error))
    }
    const page = usePaginate(blogs, 4);
    const getCategory = (cate_id) => {
        for (let i = 0; i < category.length; i++) {
            if (category[i].id === cate_id) {
                return category[i].name;
            }
        }
    }
    const deleteBlog = (id) => {
        swal({
            title: "Bạn có chắc chắn muốn xóa bài viết này?",
            icon: "warning",
            buttons: true,
            buttons: ["Hủy", "Xóa"],
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.post(`/api/blogs/delete/${id}`)
                        .then(respone => {
                            swal("Xóa bài viết thành công!", {
                                icon: "success",
                                timer: 2000
                            });
                            setBlog(respone.data)
                        }).catch(error => console.log(error))
                }
            });
    }
    useEffect(() => {
        callDataCategory(), callDataBlog()
    }, [])
    return (
        <div>
            <h1 className="h3 mb-2 text-gray-800">Danh sách bài viết</h1>
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
                                    <th>Title</th>
                                    <th>Category</th>
                                    <th>Image</th>
                                    <th>Date Created</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {page.currentData().map(({ id, title, image, cate_id, created_at }, index) => (
                                    <tr key={index}>
                                        <td>{id}</td>
                                        <td><Link to={`/admin/blogs/${id}`}>{title}</Link></td>
                                        <td>{getCategory(cate_id)}</td>
                                        <td><img src={image} alt="" width="70px" /></td>
                                        <td>{created_at}</td>
                                        <td>
                                            <Link className="btn btn-primary mr-1" to={`/admin/blogs/edit/${id}`} >Edit</Link>
                                            <button className="btn btn-danger" onClick={() => deleteBlog(id)} >Delete</button>
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
export default ListBlog