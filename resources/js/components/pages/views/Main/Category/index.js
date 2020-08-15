import React, { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom';
import Axios from 'axios';
import { Link } from 'react-router-dom'
import Pagination from 'react-js-pagination'
import cart from '../../../../cart'
const Category = () => {
    let location = useLocation();
    function Cate() {
        const [products, setProduct] = useState({});
        const [pageProduct, setPageProduct] = useState([]);
        const [cate, setCate] = useState();
        let { id } = useParams();
        useEffect(() => {
            callDataProduct()
        }, [location])
        const callDataProduct = (pageNumber = 1) => {
            Axios.get(`/api/category/${id}?page=${pageNumber}`)
                .then(response => {
                    setProduct(response.data.pro);
                    setPageProduct(response.data.pro.data)
                    setCate(response.data.cate.name)
                })
                .catch(error => console.log(error))
        }
        const c = cart();
        const list = pageProduct.map(({ id, name, image, price }, index) => {
            return (
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
            )
        })
        return (
            <div>
                <div className="features_items">
                    <h2 className="title text-center">Các sản phẩm {cate}</h2>
                    {list}
                </div>
                <Pagination
                    activePage={products.current_page}
                    itemsCountPerPage={products.per_page}
                    totalItemsCount={products.total}
                    onChange={(pageNumber) => callDataProducts(pageNumber)}
                    itemClass="page-item"
                    linkClass="page-link"
                    firstPageText="First"
                    lastPageText="Last"
                />
            </div>
        );
    }
    return (
        <Cate />
    );
}

export default Category