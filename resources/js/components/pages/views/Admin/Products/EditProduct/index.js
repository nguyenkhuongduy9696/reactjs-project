import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import axios from 'axios';
import swal from 'sweetalert'
import { storage } from '../../../../../firebase/firebase';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
const EditProduct = () => {
    function EditForm() {
        const { handleSubmit, register, errors } = useForm();
        const [errorDetail, setErrorDetail] = useState('');
        const [detail, setDetail] = useState(' ');
        const [img, setImg] = useState();
        const [imageAsFile, setImageAsFile] = useState('');
        const [progress, setProgress] = useState(0);
        const history = useHistory();
        let { id } = useParams();
        const [category, setCategory] = useState([]);
        const [product, setProduct] = useState({});
        const editorConfig = {
            cloudServices: {
                tokenUrl: 'https://73717.cke-cs.com/token/dev/a34370765a54fdad1639651ca88df80cebc9c72a39cffdaeb4447b1d923a',
                uploadUrl: 'https://73717.cke-cs.com/easyimage/upload/'
            }
        }
        const callDataCategory = () => {
            axios.get('/api/category')
                .then(response => {
                    setCategory(response.data)
                })
                .catch(error => console.log(error));
        };
        const callDataProducts = () => {
            axios.get(`/api/products/${id}`)
                .then(respone => {
                    setProduct(respone.data)
                    setImg(respone.data.image)
                    setDetail(respone.data.detail)
                }).catch(error => console.log(error))
        }
        const handleChange = (e) => {
            if (e.target.files[0]) {
                setImg(URL.createObjectURL(e.target.files[0]))
                const image = e.target.files[0]
                setImageAsFile(() => (image))
            } else {
                setImageAsFile('');
                setImg(product.image)
            }
        }
        console.log(imageAsFile)
        const onHandleSubmit = (data) => {
            console.log(data);
            const pattern = /^[\S][\S]/;
            if (pattern.test(detail) === false) {
                setErrorDetail('Mô tả không được để trống!')
            } else {
                setErrorDetail('');
                swal({
                    title: "Bạn có chắc chắn muốn cập nhật sản phẩm này?",
                    icon: "info",
                    buttons: true,
                    buttons: ["Hủy", "Cập nhật"]
                })
                    .then((willAdd) => {
                        if (willAdd) {
                            if (imageAsFile === '') {
                                let pro = {
                                    name: data.name,
                                    cate_id: data.cate_id,
                                    price: data.price,
                                    quantity: data.quantity,
                                    short_desc: data.short_desc,
                                    detail: detail
                                }
                                axios.post(`/api/products/${id}`, pro)
                                    .then(respone => {
                                        swal("Cập nhật sản phẩm thành công!", {
                                            icon: "success",
                                            timer: 2000
                                        });
                                        history.push('/admin/products');
                                    })
                            } else {
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
                                                    detail: data.detail
                                                }
                                                axios.post(`/api/products/${id}`, pro)
                                                    .then(respone => {
                                                        swal("Cập nhật sản phẩm thành công!", {
                                                            icon: "success",
                                                            timer: 2000
                                                        });
                                                        history.push('/admin/products');
                                                    })
                                            })
                                    })
                            }
                        }
                    });
            }
        }
        useEffect(() => {
            callDataProducts(), callDataCategory()
        }, []);
        return (
            <div>
                <h1 className="h3 mb-2 text-gray-800">Sửa sản phẩm</h1>
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
                                            defaultValue={product.name}
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
                                                <option key={index} selected={id === product.cate_id} value={id}>{name}</option>
                                            ))}
                                        </select>

                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="price">Giá sản phẩm</label>
                                        <input type="number"
                                            className="form-control"
                                            name="price"
                                            defaultValue={product.price}
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
                                            defaultValue={product.quantity}
                                            ref={register({ required: true, min: 1 })}
                                        />
                                        <small className="text-danger">
                                            {errors.quantity?.type === "required" && "Số lượng sản phẩm không được để trống!"}
                                            {errors.quantity?.type === "min" && "Số lượng sản phẩm ít nhất bằng 1!"}
                                        </small>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="image">Ảnh sản phẩm</label>
                                        <input type="file"
                                            className="form-control"
                                            name="image"

                                            onChange={(e) => handleChange(e)}
                                        />
                                        <small className="text-danger">{errors.image && "Ảnh sản phẩm không được để trống!"}</small>
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
                                        <label htmlFor="detail">Mô tả ngắn</label>
                                        <textarea className="form-control"
                                            defaultValue={product.short_desc}
                                            name="short_desc"
                                            ref={register({ required: true, pattern: /[\S]/, maxLength: 155 })}
                                            rows="6">
                                        </textarea>
                                        <small className="text-danger">
                                            {errors.short_desc?.type === "required" && "Mô tả ngắn không được để trống!"}
                                            {errors.short_desc?.type === "pattern" && "Mô tả ngắn không được để trống!"}
                                            {errors.short_desc?.type === "maxLength" && "Mô tả ngắn không quá 155 ký tự!"}
                                        </small>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group">
                                    <label htmlFor="detail">Chi tiết sản phẩm</label>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        config={editorConfig}
                                        onInit={editor => {
                                            editor.setData(product.detail)
                                        }}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            setDetail(data);
                                        }}
                                    />
                                    <small className="text-danger">{errorDetail}</small>
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
        <div>
            <EditForm />
        </div>
    );
}
export default EditProduct