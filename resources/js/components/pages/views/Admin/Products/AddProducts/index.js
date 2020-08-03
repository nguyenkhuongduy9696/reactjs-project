import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import swal from 'sweetalert'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import nopreview from '../../../../../assets/Admin/images/nopreview.png'
import { storage } from '../../../../../firebase/firebase';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
const AddProduct = () => {
    const [category, setCategory] = useState([]);
    const [errorDetail, setErrorDetail] = useState('');
    const [detail, setDetail] = useState(' ');
    const [img, setImg] = useState(nopreview);
    const [imageAsFile, setImageAsFile] = useState('');
    const [progress, setProgress] = useState(0);
    const history = useHistory();
    const { handleSubmit, register, errors } = useForm();
    const callDataCategory = () => {
        axios.get('/api/category')
            .then(response => {
                setCategory(response.data)
            })
            .catch(error => console.log(error));
    };
    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImg(URL.createObjectURL(e.target.files[0]))
            const image = e.target.files[0]
            setImageAsFile(() => (image))
        } else {
            setImg(nopreview)
        }
    }
    const onHandleSubmit = (data) => {
        const pattern = /^[\S][\S]/;
        console.log(data, detail);
        if (pattern.test(detail) === false) {
            setErrorDetail('Mô tả không được để trống!')
        } else {
            setErrorDetail('');
            swal({
                title: "Bạn có chắc chắn muốn thêm sản phẩm này?",
                icon: "info",
                buttons: true,
                buttons: ["Hủy", "Thêm"]
            }).then((willAdd) => {
                if (willAdd) {
                    const uploadTask = storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile);
                    uploadTask.on('state_changed',
                        snapshot => {
                            const progress = Math.round(
                                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                            );
                            setProgress(progress);
                        },
                        error => {
                            console.log(error)
                        },
                        () => {
                            storage
                                .ref('images')
                                .child(imageAsFile.name)
                                .getDownloadURL()
                                .then(url => {
                                    let pro = {
                                        name: data.name,
                                        cate_id: data.cate_id,
                                        price: data.price,
                                        quantity: data.quantity,
                                        image: url,
                                        short_desc: data.short_desc,
                                        detail: detail
                                    }
                                    axios.post('/api/products', pro)
                                        .then(respone => {
                                            swal("Thêm sản phẩm thành công!", {
                                                icon: "success",
                                                timer: 2000
                                            });
                                            history.push('/admin/products');
                                        })
                                })
                        })
                }
            });
        }

    }
    useEffect(() => {
        callDataCategory()
    }, [])
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
                                        ref={register({ required: true, minLength: 5, pattern: /^[\S][\S]/ })}
                                    />
                                    <small className="text-danger">
                                        {errors.name?.type === "required" && "Tên sản phẩm không được để trống!"}
                                        {errors.name?.type === "minLength" && "Tên sản phẩm ít nhất 5 ký tự!"}
                                        {errors.name?.type === "pattern" && "Tên sản phẩm không thể chỉ là khoảng trắng!"}
                                    </small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cate_id">Danh mục</label>
                                    <select className="form-control" id="cate_id" name="cate_id" ref={register}>
                                        {category.map(({ id, name }, index) => (
                                            <option key={index} selected={id === 13} value={id}>{name}</option>
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
                                <div className="form-group">
                                    <label htmlFor="price">Số lượng</label>
                                    <input type="number"
                                        className="form-control"
                                        name="quantity"
                                        ref={register({ required: true, min: 1 })}
                                    />
                                    <small className="text-danger">
                                        {errors.quantity?.type === "required" && "Số lượng sản phẩm không được để trống!"}
                                        {errors.quantity?.type === "min" && "Số lượng sản phẩm ít nhất bằng 1!"}
                                    </small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="detail">Mô tả ngắn</label>
                                    <textarea className="form-control"
                                        name="short_desc"
                                        ref={register({ required: true, pattern: /[\S]/, maxLength: 155 })}
                                        rows="7">
                                    </textarea>
                                    <small className="text-danger">
                                        {errors.short_desc?.type === "required" && "Mô tả ngắn không được để trống!"}
                                        {errors.short_desc?.type === "pattern" && "Mô tả ngắn không được để trống!"}
                                        {errors.short_desc?.type === "maxLength" && "Mô tả ngắn không quá 155 ký tự!"}
                                    </small>
                                </div>
                            </div>
                            <div className="col-7">
                                <div className="row justify-content-md-center">
                                    <div className="col col-lg-5">
                                        <img src={img} alt="" width="150px" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">UploadProgress: </label>&nbsp;<br />
                                    <progress
                                        style={{ height: "30px", width: "300px" }}
                                        value={progress}
                                        max="100" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="image">Ảnh sản phẩm</label>
                                    <input type="file"
                                        className="form-control"
                                        name="image"
                                        ref={register({ required: true })}
                                        onChange={(e) => handleChange(e)}
                                    />
                                    <small className="text-danger">{errors.image && "Ảnh sản phẩm không được để trống!"}</small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="detail">Chi tiết sản phẩm</label>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            setDetail(data);
                                        }}
                                    />
                                    <small className="text-danger">{errorDetail}</small>
                                </div>
                            </div>
                        </div>
                        <button className="btn btn-primary" type="submit">Thêm</button>
                    </form>
                </div>
            </div>
        </div >
    );
}
export default AddProduct