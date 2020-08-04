import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import swal from 'sweetalert'
import Axios from 'axios';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { storage } from '../../../../../firebase/firebase';
const EditCategory = () => {
    function EditForm() {
        const [detail, setDetail] = useState(' ');
        const [img, setImg] = useState();
        const [imageAsFile, setImageAsFile] = useState('');
        const [progress, setProgress] = useState(0);
        const [errorDetail, setErrorDetail] = useState('');
        const { handleSubmit, register, errors } = useForm();
        const history = useHistory();
        let { id } = useParams();
        const [category, setCategory] = useState({});
        const callDataCategory = () => {
            Axios.get(`/api/category/${id}`)
                .then(response => {
                    setCategory(response.data.cate)
                    setImg(response.data.cate.image)
                    setDetail(response.data.cate.detail)
                })
                .then(error => console.log(error))
        }
        const editorConfig = {
            cloudServices: {
                tokenUrl: 'https://73717.cke-cs.com/token/dev/a34370765a54fdad1639651ca88df80cebc9c72a39cffdaeb4447b1d923a',
                uploadUrl: 'https://73717.cke-cs.com/easyimage/upload/'
            }
        }
        const handleChange = (e) => {
            if (e.target.files[0]) {
                setImg(URL.createObjectURL(e.target.files[0]))
                const image = e.target.files[0]
                setImageAsFile(() => (image))
            } else {
                setImageAsFile('');
                setImg(category.image)
            }
        }
        const onHandleSubmit = (data) => {
            const pattern = /^[\S][\S]/;
            if (pattern.test(detail) === false) {
                setErrorDetail('Mô tả không được để trống!')
            } else {
                setErrorDetail('');
                swal({
                    title: "Bạn có chắc chắn muốn cập nhật danh mục này?",
                    icon: "info",
                    buttons: true,
                    buttons: ["Hủy", "Cập nhật"]
                })
                    .then((willAdd) => {
                        if (willAdd) {
                            if (imageAsFile === '') {
                                let cate = {
                                    name: data.name,
                                    detail: detail
                                }
                                axios.post(`/api/category/${id}`, cate)
                                    .then(respone => {
                                        swal("Cập nhật danh mục thành công!", {
                                            icon: "success",
                                            timer: 2000
                                        });
                                        history.push('/admin/category');
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

                                    },
                                    () => {
                                        storage
                                            .ref('images')
                                            .child(imageAsFile.name)
                                            .getDownloadURL()
                                            .then(url => {
                                                let cate = {
                                                    name: data.name,
                                                    detail: detail,
                                                    image: url
                                                }
                                                axios.post(`/api/category/${id}`, cate)
                                                    .then(respone => {
                                                        swal("Cập nhật danh mục thành công!", {
                                                            icon: "success",
                                                            timer: 2000
                                                        });
                                                        history.push('/admin/category');
                                                    })
                                            })
                                    })
                            }
                        }
                    });
            }
        }
        useEffect(() => {
            callDataCategory()
        }, [])
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
                                            ref={register({ required: true, pattern: /^[\S][\S]/ })}
                                        />
                                        <small className="text-danger">
                                            {errors.name?.type === "required" && "Tên danh mục không được để trống!"}
                                            {errors.name?.type === "pattern" && "Tên danh mục không được để trống!"}
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
                                <div className="col-1"></div>
                                <div className="col-5">
                                    <div className="row justify-content-md-center">
                                        <div className="col col-lg-5">
                                            <img src={img} alt="" width="150px" />
                                        </div>
                                    </div>
                                    <div className="row justify-content">
                                        <label htmlFor="">UploadProgress: </label>&nbsp;
                                    <progress
                                            style={{ height: "30px", width: "300px" }}
                                            value={progress}
                                            max="100" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group">
                                    <label htmlFor="name">Mô tả danh mục</label>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        config={editorConfig}
                                        onInit={editor => {
                                            editor.setData(category.detail)
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
        <EditForm />
    );
}

export default EditCategory