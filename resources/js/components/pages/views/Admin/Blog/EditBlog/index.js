import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import swal from 'sweetalert'
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { storage } from '../../../../../firebase/firebase';

const EditBlog = () => {
    function Edit() {
        let { id } = useParams();
        const [content, setContent] = useState(' ');
        const [category, setCategory] = useState([]);
        const [blog, setBlog] = useState({})
        const [errorContent, setErrorContent] = useState('');
        const [img, setImg] = useState();
        const [imageAsFile, setImageAsFile] = useState('');
        const history = useHistory();
        const [progress, setProgress] = useState(0);
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
                })
                .catch(error => console.log(error));
        };
        const callDataBlog = () => {
            axios.get(`/api/blogs/${id}`)
                .then(respone => {
                    setBlog(respone.data)
                    setImg(respone.data.image)
                    setContent(respone.data.content)
                }).catch(error => console.log(error))
        }
        const handleChange = (e) => {
            if (e.target.files[0]) {
                setImg(URL.createObjectURL(e.target.files[0]))
                const image = e.target.files[0]
                setImageAsFile(() => (image))
            } else {
                setImageAsFile('')
                setImg(blog.image)
            }
        }
        const onHandleSubmit = (data) => {
            console.log(data);
            const pattern = /^[\S][\S]/;
            if (pattern.test(content) === false) {
                setErrorContent('Chi tiết bài viết không được để trống!')
            } else {
                setErrorContent('');
                swal({
                    title: "Bạn có chắc chắn muốn cập nhật bài viết này?",
                    icon: "info",
                    buttons: true,
                    buttons: ["Hủy", "Cập nhật"]
                })
                    .then((willAdd) => {
                        if (willAdd) {
                            if (imageAsFile === '') {
                                let item = {
                                    title: data.title,
                                    cate_id: data.cate_id,
                                    content: content
                                }
                                axios.post(`/api/blogs/${id}`, item)
                                    .then(respone => {
                                        swal("Cập nhật bài viết thành công!", {
                                            icon: "success",
                                            timer: 2000
                                        });
                                        history.push('/admin/blogs');
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
                                                let item = {
                                                    title: data.title,
                                                    cate_id: data.cate_id,
                                                    content: content,
                                                    image: url
                                                }
                                                axios.post(`/api/blogs/${id}`, item)
                                                    .then(respone => {
                                                        swal("Cập nhật bài viết thành công!", {
                                                            icon: "success",
                                                            timer: 2000
                                                        });
                                                        history.push('/admin/blogs');
                                                    })
                                            })
                                    })
                            }
                        }
                    });
            }
        }
        useEffect(() => {
            callDataCategory(), callDataBlog()
        }, [])
        return (
            <div>
                <h1 className="h3 mb-2 text-gray-800">Sửa danh mục</h1>
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
                                            defaultValue={blog.title}
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
                                                <option key={index} selected={id === blog.cate_id} value={id}>{name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="image">Ảnh đại diện bài viết</label>
                                        <input type="file"
                                            className="form-control"
                                            name="image"
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
                                </div>
                            </div>
                            <div className="row justify-content">
                                <div className="form-group">
                                    <label htmlFor="name">Nội dung bài viết</label>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        config={editorConfig}
                                        onInit={editor => {
                                            editor.setData(content)
                                        }}
                                        onChange={(event, editor) => {
                                            const content = editor.getData();
                                            setContent(content);
                                        }}
                                    />
                                    <small className="text-danger">{errorContent}</small>
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
        <Edit />
    );
}

export default EditBlog