import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import swal from 'sweetalert'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import nopreview from '../../../../../assets/Admin/images/nopreview.png'
import { storage } from '../../../../../firebase/firebase';

const AddBlog = () => {
    const [category, setCategory] = useState([]);
    const [content, setContent] = useState(' ');
    const [errorContent, setErrorContent] = useState('');
    const [img, setImg] = useState(nopreview);
    const [imageAsFile, setImageAsFile] = useState('');
    const [progress, setProgress] = useState(0);
    const history = useHistory();
    const { handleSubmit, register, errors } = useForm();
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
            }).catch(error => console.log(error));
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
        console.log(content);
        if (pattern.test(content) === false) {
            setErrorContent('Nội dung bài viết không được để trống!')
        } else {
            setErrorContent('')
            swal({
                title: "Bạn có chắc chắn muốn thêm bài viết này?",
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
                                    let blog = {
                                        title: data.title,
                                        cate_id: data.cate_id,
                                        image: url,
                                        short_desc: data.short_desc,
                                        content: content
                                    }
                                    axios.post('/api/blogs', blog)
                                        .then(respone => {
                                            swal("Thêm bài viết thành công!", {
                                                icon: "success",
                                                timer: 2000
                                            });
                                            history.push('/admin/blogs');
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
            <h1 className="h3 mb-2 text-gray-800">Thêm bài viết</h1>
            <div className="card shadow mb-4">
                <div className="card-body">
                    <form action="" onSubmit={handleSubmit(onHandleSubmit)} >
                        <div className="row">
                            <div className="col-5">
                                <div className="form-group">
                                    <label htmlFor="name">Tiêu đề bài viết</label>
                                    <input type="text"
                                        className="form-control"
                                        name="title"
                                        ref={register({ required: true, pattern: /^[\S][\S]/ })}
                                    />
                                    <small className="text-danger">
                                        {errors.title?.type === "required" && "Tiêu đề bài viết không được để trống!"}
                                        {errors.title?.type === "pattern" && "Tiêu đề bài viết không được để trống!"}
                                    </small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cate_id">Danh mục bài viết</label>
                                    <select className="form-control" id="cate_id" name="cate_id" ref={register}>
                                        {category.map(({ id, name }, index) => (
                                            <option key={index} selected={id === 13} value={id}>{name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="image">Ảnh đại diện bài viết</label>
                                    <input type="file"
                                        className="form-control"
                                        name="image"
                                        ref={register({ required: true })}
                                        onChange={(e) => handleChange(e)}
                                    />
                                    <small className="text-danger">{errors.image && "Ảnh đại diện bài viết không được để trống!"}</small>
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
                                <div className="form-group">
                                    <label htmlFor="detail">Giới thiệu bài viết</label>
                                    <textarea className="form-control"
                                        name="short_desc"
                                        ref={register({ required: true, pattern: /[\S]/, maxLength: 400 })}
                                        rows="6">
                                    </textarea>
                                    <small className="text-danger">
                                        {errors.short_desc?.type === "required" && "Giới thiệu bài viết không được để trống!"}
                                        {errors.short_desc?.type === "pattern" && "Giới thiệu bài viết không được để trống!"}
                                        {errors.short_desc?.type === "maxLength" && "Giới thiệu bài viết không quá 400 ký tự!"}
                                    </small>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content">
                            <div className="form-group">
                                <label htmlFor="name">Nội dung bài viết</label>
                                <CKEditor
                                    editor={ClassicEditor}
                                    config={editorConfig}
                                    onChange={(event, editor) => {
                                        const content = editor.getData();
                                        setContent(content);
                                    }}
                                />
                                <small className="text-danger">{errorContent}</small>
                            </div>
                        </div>
                        <button className="btn btn-primary" type="submit">Thêm</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddBlog