import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
    const [products, setProduct] = useState([]);
    const [blog, setBlog] = useState([]);
    const [category, setCategory] = useState([]);
    const callDataCategory = () => {
        axios.get('/api/category')
            .then(response => {
                setCategory(response.data)
            })
            .catch(error => console.log(error));
    }
    const callDataProduct = () => {
        Axios.get('/api/new-products')
            .then(respone => {
                setProduct(respone.data)
            })
            .catch(error => console.log(error))
    }
    const callDataBlog = () => {
        Axios.get('/api/new-blog')
            .then(res => {
                setBlog(res.data)
            })
            .catch(err => console.log(err))
    }
    const getCategory = (cate_id) => {
        for (let i = 0; i < category.length; i++) {
            if (category[i].id === cate_id) {
                return category[i].name;
            }
        }
    }
    useEffect(() => {
        callDataProduct(), callDataBlog(), callDataCategory()
    }, [])
    console.log(blog)
    return (
        <div>
            <div className="features_items">
                <h2 className="title text-center">Sản phẩm mới</h2>
                {products.map(({ id, name, image, price }, index) => (
                    <div className="col-sm-4" key={index}>
                        <div className="product-image-wrapper">
                            <div className="single-products">
                                <div className="productinfo text-center">
                                    <Link to={`/product/${id}`}><img src={image} alt="" /></Link>
                                    <h2>{price}$</h2>
                                    <Link to={`/product/${id}`}>{name}</Link>
                                    <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Thêm vào giỏ hàng</a>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="blog-post-area">
                <h2 className="title text-center">Bài viết mới nhất</h2>
                {blog.map(({ id, title, cate_id, image, short_desc, created_at }, index) => (
                    <div className="single-blog-post text-center" key={index}>
                        <h3><Link to={`/blog/${id}`}>{title}</Link></h3>
                        <div className="post-meta">
                            <ul>
                                <li><i className="fa fa-user" /> Admin</li>
                                <li><i className="fa fa-clock-o" /> {created_at}</li>
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
                        <Link to={`/blog/${id}`}>
                            <img src={image} alt="" width="100px" />
                        </Link>
                        <p className="text-justify">{short_desc}</p>
                        <Link className="btn btn-primary" tp={`/blog/${id}`} >Xem thêm</Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Home