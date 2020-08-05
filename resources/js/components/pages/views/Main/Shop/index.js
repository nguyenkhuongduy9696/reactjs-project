import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import { Link } from 'react-router-dom'
const Shop = () => {
    const [products, setProduct] = useState([]);
    const callDataProduct = () => {
        Axios.get('/api/products')
            .then(response => {
                setProduct(response.data)
            })
            .catch(error => console.log(error))
    }
    useEffect(() => {
        callDataProduct()
    }, [])
    return (
        <div>
            <div className="features_items">
                <h2 className="title text-center">Cửa hàng</h2>
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

        </div>
    );
}

export default Shop