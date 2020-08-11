import React, { useState, useEffect } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom';
import cart from '../../../../cart'
const Product = () => {
    function Pro() {
        let { id } = useParams();
        const [product, setProduct] = useState({});
        const [category, setCategory] = useState([]);
        const [relate, setRelate] = useState([]);
        const location = useLocation();
        const callDataProducts = () => {
            axios.get(`/api/products/${id}`)
                .then(respone => {
                    setProduct(respone.data)
                }).catch(error => console.log(error))
        }
        const callDataCategory = () => {
            axios.get('/api/category')
                .then(response => {
                    setCategory(response.data)
                })
                .catch(error => console.log(error));
        }
        const callRelate = () => {
            axios.get(`/api/relate-product/${id}`)
                .then(respone => {
                    setRelate(respone.data)
                }).catch(error => console.log(error))
        }
        const getCategory = (cate_id) => {
            for (let i = 0; i < category.length; i++) {
                if (category[i].id === cate_id) {
                    return category[i].name;
                }
            }
        }
        const c = cart();
        useEffect(() => {
            callDataProducts(), callDataCategory(), callRelate()
        }, [location]);
        return (
            <div>
                <div className="row">
                    <h2 className="title text-center">Thông tin sản phẩm</h2>
                    <div className="product-detail">
                        <div className="col-sm-4">
                            <div className="view-product">
                                <img src={product.image} alt="" />
                            </div>
                        </div>
                        <div className="col-sm-7">
                            <div className="product-information">
                                <h2>{product.name}</h2>
                                <h4><span className="text-primary"> Loại sản phẩm: </span> {getCategory(product.cate_id)}</h4>
                                <h4><span className="text-primary"> Giá sản phẩm: </span> {product.price}$</h4>
                                <h4><span className="text-primary">Mô tả sản phẩm: </span></h4>
                                <p>{product.short_desc}</p><br />
                                <button onClick={() => c.addCart(product.id)} className="btn btn-default cart-detail">
                                    <i className="fa fa-shopping-cart"></i> Thêm vào giỏ
                                </button>
                            </div>
                        </div>
                    </div>
                </div><br /><br />
                <div className="row">
                    <div className="category-tab shop-details-tab">
                        <div className="col-sm-12">
                            <ul className="nav nav-tabs">
                                <li className="active"><a href="#details" data-toggle="collapse">Thông tin sản phẩm</a></li>
                            </ul>
                        </div>
                        <div className="tab-content">
                            <div className="collapse show" id="details">
                                <div className="figure-image text-justify" dangerouslySetInnerHTML={{ __html: product.detail }}></div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <h2 className="title text-center">Sản phẩm liên quan</h2>
                {relate.map(({ id, name, image, price }, index) => (
                    <div className="col-sm-4" key={index}>
                        <div className="product-image-wrapper">
                            <div className="single-products">
                                <div className="productinfo text-center">
                                    <Link to={`/product/${id}`}><img src={image} alt="" /></Link>
                                    <h2>{price}$</h2>
                                    <Link to={`/product/${id}`}>{name}</Link>
                                    <button onClick={() => c.addCart(id)} className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Thêm vào giỏ hàng</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        );
    }
    return (
        <Pro />
    );
}

export default Product