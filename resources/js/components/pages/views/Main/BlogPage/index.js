import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import Axios from 'axios';
import Moment from 'react-moment';
const BlogPage = () => {
    function Item() {
        const [blog, setBlog] = useState({});
        const [category, setCategory] = useState([]);
        let { id } = useParams();
        const callDataBlog = () => {
            Axios.get(`/api/blogs/${id}`)
                .then(res => {
                    setBlog(res.data)
                }).catch(err => console.log(err))
        }
        const { id_blog, title, cate_id, image, content, created_at } = blog;
        const callDataCategory = () => {
            Axios.get('/api/category')
                .then(res => {
                    setCategory(res.data)
                }).catch(err => console.log(err))
        }
        const getCategory = (cate_id) => {
            for (let i = 0; i < category.length; i++) {
                if (category[i].id === cate_id) {
                    return category[i].name;
                }
            }
        }
        useEffect(() => {
            callDataBlog(); callDataCategory()
        }, [])
        return (
            <div className="blog-post-area">
                <h2 className="title text-center">Blog</h2>
                <div className="single-blog-post text-center">
                    <h3>{title}</h3>
                    <div className="post-meta">
                        <ul>
                            <li><i className="fa fa-user" /> Admin</li>
                            <li><i className="fa fa-clock-o" /><Moment format="DD/MM/YYYY hh:mm:ss">{created_at}</Moment></li>
                            <li><i className="fa fa-list"></i>{getCategory(cate_id)}</li>
                        </ul>
                        <span>
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star-half-o" />
                        </span>
                    </div>

                    <img src={image} alt="" width="500px" /><br /><hr />

                    <div className="figure-image text-justify" dangerouslySetInnerHTML={{ __html: content }}></div>
                </div>
            </div>
        );
    }
    return (
        <Item />
    );
}

export default BlogPage