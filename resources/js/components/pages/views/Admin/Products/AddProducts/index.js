import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import swal from 'sweetalert'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
const AddProduct = () => {
    const [category, setCategory] = useState([]);
    const callDataCategory = () => {
        axios.get('/api/category')
            .then(response => {
                setCategory(response.data)
            })
            .catch(error => console.log(error));
    };
    useEffect(() => {
        callDataCategory()
    }, [])
    const history = useHistory();
    const { handleSubmit, register, errors } = useForm();
    const onHandleSubmit = (data) => {
        console.log(data);
        swal({
            title: "Bạn có chắc chắn muốn thêm sản phẩm này?",
            icon: "info",
            buttons: true,
            buttons: ["Hủy", "Thêm"]
        })
            .then((willAdd) => {
                if (willAdd) {
                    axios.post('/api/products', data)
                        .then(respone => {
                            swal("Thêm sản phẩm thành công!", {
                                icon: "success",
                                timer: 2000
                            });
                            history.push('/admin/products');
                        })
                }
            });
    }
    return (
        <div>
            <h1 className="h3 mb-2 text-gray-800">Thêm sản phẩm</h1>
            <div className="card shadow mb-4">
                <div className="card-body">
                    <form action="" onSubmit={handleSubmit(onHandleSubmit)} >
                        <div className="row">
                            <div className="col-5">
                                <div className="form-group">
                                    <label htmlFor="name">Tên sản phẩm</label>
                                    <input type="text"
                                        className="form-control"
                                        name="name"
                                        ref={register({ required: true, minLength: 5 })}
                                    />
                                    <small className="text-danger">
                                        {errors.name?.type === "required" && "Tên sản phẩm không được để trống!"}
                                        {errors.name?.type === "minLength" && "Tên sản phẩm ít nhất 5 ký tự!"}
                                    </small>

                                </div>
                                <div className="form-group">
                                    <label htmlFor="cate_id">Danh mục</label>
                                    <select className="form-control" id="cate_id" name="cate_id" ref={register}>

                                        {category.map(({ id, name }, index) => (
                                            <option key={index} value={id}>{name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="price">Giá sản phẩm</label>
                                    <input type="number"
                                        className="form-control"
                                        name="price"
                                        ref={register({ required: true, min: 1 })}
                                    />
                                    <small className="text-danger">
                                        {errors.price?.type === "required" && "Giá sản phẩm không được để trống!"}
                                        {errors.price?.type === "min" && "Giá sản phẩm ít nhất bằng 1!"}
                                    </small>

                                </div>
                            </div>
                            <div className="col-1"></div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label htmlFor="image">Ảnh sản phẩm</label>
                                    <input type="text"
                                        className="form-control"
                                        name="image"
                                        ref={register({ required: true })}
                                    />
                                    <small className="text-danger">{errors.image && "Ảnh sản phẩm không được để trống!"}</small>

                                </div>
                                <div className="form-group">
                                    <label htmlFor="detail">Mô tả sản phẩm</label>
                                    <textarea className="form-control"
                                        name="detail"
                                        ref={register({ required: true })}
                                        rows="3">
                                    </textarea>
                                    <small className="text-danger">{errors.detail && "Mô tả sản phẩm không được để trống!"}</small>

                                </div>

                            </div>
                        </div>
                        <button className="btn btn-primary" type="submit">Thêm</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default AddProduct