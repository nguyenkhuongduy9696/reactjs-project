import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import Pagination from 'react-js-pagination'
import { Link } from 'react-router-dom';
import Moment from 'react-moment'
const Blogs = () => {
    const [blogs, setBlog] = useState({});
    const [category, setCategory] = useState([]);
    const [pageBlogs, setPageBlogs] = useState([]);
    useEffect(() => {
        callDataBlog(), callDataCategory()
    }, [])
    const callDataBlog = (pageNumber = 1) => {
        axios.get(`/api/blogPage?page=${pageNumber}`)
            .then(res => {
                setBlog(res.data)
                setPageBlogs(res.data.data)
            }).catch(error => console.log(error))
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
    const list = pageBlogs.map(({ id, title, cate_id, image, short_desc, created_at }, index) => {
        return (
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
        )
    })
    return (
        <div>
            <div className="blog-post-area">
                <h2 className="title text-center">Danh sách bài viết</h2>
                {list}
            </div>
            <Pagination
                activePage={blogs.current_page}
                itemsCountPerPage={blogs.per_page}
                totalItemsCount={blogs.total}
                onChange={(pageNumber) => callDataBlog(pageNumber)}
                itemClass="page-item"
                linkClass="page-link"
                firstPageText="First"
                lastPageText="Last"
            />
        </div>
    );
}

export default Blogs