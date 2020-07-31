import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

const Product = () => {
    function Pro() {
        let { id } = useParams();
        const [product, setProduct] = useState({});
        const [category, setCategory] = useState([]);
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
        };
        const getCategory = (cate_id) => {
            for (let i = 0; i < category.length; i++) {
                if (category[i].id === cate_id) {
                    return category[i].name;
                }
            }
        }
        useEffect(() => {
            callDataProducts(), callDataCategory()
        }, []);
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
                                <h3>Loại sản phẩm: {getCategory(product.cate_id)}</h3>
                                <h3>Giá: {product.price}$</h3>
                                <a href="#" className="btn btn-default cart-detail">
                                    <i class="fa fa-shopping-cart"></i>Thêm vào giỏ
                                </a>
                            </div>
                        </div>
                    </div>
                </div><br /><br />
                <div className="row">
                    <div class="category-tab shop-details-tab">
                        <div class="col-sm-12">
                            <ul class="nav nav-tabs">
                                <li class="active"><a href="#details" data-toggle="tab">Thông tin sản phẩm</a></li>
                            </ul>
                        </div>
                        <div class="tab-content">
                            <div class="tab-pane fade active in" id="details">
                                <p>{product.detail}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <Pro />
    );
}

export default Product