import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

const DetailBlog = () => {
    function Detail() {
        let { id } = useParams();
        const [blog, setBlog] = useState({});
        const [category, setCategory] = useState([]);
        const callDataBlog = () => {
            axios.get(`/api/blogs/${id}`)
                .then(respone => {
                    setBlog(respone.data)
                }).catch(error => console.log(error))
        }
        const callDataCategory = () => {
            axios.get('/api/category')
                .then(response => {
                    setCategory(response.data)
                })
                .catch(error => console.log(error));
        }
        const getCategory = (cate_id) => {
            for (let i = 0; i < category.length; i++) {
                if (category[i].id === cate_id) {
                    return category[i].name;
                }
            }
        }
        useEffect(() => {
            callDataBlog(), callDataCategory()
        }, []);
        return (
            <div>
                <h1 className="h3 mb-2 text-gray-800">Chi tiết bài viết</h1>
                <div className="card shadow mb-4">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-4">
                                <img src={blog.image} alt="" width="100%" />
                            </div>
                            <div className="col-1"></div>
                            <div className="col-6">
                                <h4 className="text-primary">Tiêu đề bài viết: {blog.title}</h4><br />
                                <p><span className="text-primary">Danh mục: </span> {getCategory(blog.cate_id)}</p>
                                <p><span className="text-primary">Ngày đăng: </span> {blog.created_at}$</p>
                                <p><span className="text-primary">Giới thiệu ngắn: </span></p>
                                <p>{blog.short_desc}</p>
                            </div>
                        </div><br />
                        <div className="row">
                            <h4 className="text-primary">Nội dung bài viết</h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-1"></div>
                        <div className="col-10">
                            <div className="text-justify figure-image" dangerouslySetInnerHTML={{ __html: blog.content }}></div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
    return (
        <Detail />
    );
}

export default DetailBlog