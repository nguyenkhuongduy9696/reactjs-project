import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import usePaginate from '../../../../paginate'
import { Link } from 'react-router-dom';
import Moment from 'react-moment'
const Blogs = () => {
    const [blogs, setBlog] = useState([]);
    const [category, setCategory] = useState([]);
    const callDataBlog = () => {
        Axios.get('/api/blogs')
            .then(res => {
                setBlog(res.data)
            }).catch(err => console.log(err))
    }
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
    const page = usePaginate(blogs, 3)
    useEffect(() => {
        callDataBlog(), callDataCategory()
    }, [])
    return (
        <div>
            <div className="blog-post-area">
                <h2 className="title text-center">Danh sách bài viết</h2>
                {page.currentData().map(({ id, title, cate_id, image, short_desc, created_at }, index) => (
                    <div className="single-blog-post text-center" key={index}>
                        <h3><Link to={`/blogs/${id}`}>{title}</Link></h3>
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
                        <Link to={`/blogs/${id}`}>
                            <img src={image} alt="" width="100px" />
                        </Link>
                        <p>{short_desc}</p>

                    </div>
                ))}
            </div>
            <ul className="pagination">
                <li><a href="" onClick={(e) => page.jump(1, e)}>First</a></li>
                <li><a href="" onClick={(e) => page.prev(e)}>&laquo;</a></li>
                <li className="active"><a href="#">{page.currentPage}</a></li>
                <li><a href="" onClick={(e) => page.next(e)}>&raquo;</a></li>
                <li><a href="" onClick={(e) => page.jump(page.maxPage, e)}>Last</a></li>
            </ul>
        </div>
    );
}

export default Blogs