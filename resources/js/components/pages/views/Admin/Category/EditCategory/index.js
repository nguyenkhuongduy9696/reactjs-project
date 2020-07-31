import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import swal from 'sweetalert'
import Axios from 'axios';
const EditCategory = () => {
    function EditForm() {
        const { handleSubmit, register, errors } = useForm();
        const history = useHistory();
        let { id } = useParams();
        const [category, setCategory] = useState({});
        const callDataCategory = () => {
            Axios.get(`/api/category/${id}`)
                .then(response => {
                    setCategory(response.data.cate)
                })
                .then(error => console.log(error))
        }
        useEffect(() => {
            callDataCategory()
        }, [])
        const onHandleSubmit = (data) => {
            console.log(data);
            swal({
                title: "Bạn có chắc chắn muốn cập nhật danh mục này?",
                icon: "info",
                buttons: true,
                buttons: ["Hủy", "Cập nhật"]
            })
                .then((willAdd) => {
                    if (willAdd) {
                        axios.post(`/api/category/${id}`, data)
                            .then(respone => {
                                swal("Cập nhật danh mục thành công!", {
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
                <h1 className="h3 mb-2 text-gray-800">Cập nhật danh mục</h1>
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
                                            defaultValue={category.name}
                                            ref={register({ required: true })}
                                        />
                                        <small className="text-danger">
                                            {errors.name?.type === "required" && "Tên danh mục không được để trống!"}
                                        </small>

                                    </div>
                                </div>
                            </div>
                            <button className="btn btn-primary" type="submit">Cập nhật</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <EditForm />
    );
}

export default EditCategory