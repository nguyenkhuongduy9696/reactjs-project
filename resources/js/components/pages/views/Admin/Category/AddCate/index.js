import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import swal from 'sweetalert'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
const AddCate = () => {
    const [category, setCategory] = useState();
    const history = useHistory();
    const { handleSubmit, register, errors } = useForm();
    const onHandleSubmit = (data) => {
        console.log(data);
        swal({
            title: "Bạn có chắc chắn muốn thêm danh mục này?",
            icon: "info",
            buttons: true,
            buttons: ["Hủy", "Thêm"]
        })
            .then((willAdd) => {
                if (willAdd) {
                    axios.post('/api/category', data)
                        .then(respone => {
                            swal("Thêm danh mục thành công!", {
                                icon: "success",
                                timer: 2000
                            });
                            history.push('/admin/category');
                        })
                }
            });
    }
    return (
        <div>
            <h1 className="h3 mb-2 text-gray-800">Thêm danh mục</h1>
            <div className="card shadow mb-4">
                <div className="card-body">
                    <form action="" onSubmit={handleSubmit(onHandleSubmit)} >
                        <div className="row">
                            <div className="col-5">
                                <div className="form-group">
                                    <label htmlFor="name">Tên danh mục</label>
                                    <input type="text"
                                        className="form-control"
                                        name="name"
                                        ref={register({ required: true })}
                                    />
                                    <small className="text-danger">
                                        {errors.name?.type === "required" && "Tên danh mục không được để trống!"}
                                    </small>

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
export default AddCate