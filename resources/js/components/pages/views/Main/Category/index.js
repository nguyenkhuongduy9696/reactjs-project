import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import { Link } from 'react-router-dom'
const Category = () => {
    function Cate() {
        const [products, setProduct] = useState([]);
        const [cate, setCate] = useState();
        let { id } = useParams();
        const callDataProduct = () => {
            Axios.get(`/api/category/${id}`)
                .then(response => {
                    setProduct(response.data.pro);
                    setCate(response.data.cate.name)
                })
                .catch(error => console.log(error))
        }
        useEffect(() => {
            callDataProduct()
        }, [])
        return (
            <div>
                <div className="features_items">
                    <h2 className="title text-center">Các sản phẩm {cate}</h2>
                    {products.map(({ id, name, image, price }, index) => (
                        <div className="col-sm-3" key={index}>
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
            </div>
        );
    }
    return (
        <Cate />
    );
}

export default Category