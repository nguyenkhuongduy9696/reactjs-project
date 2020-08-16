import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import { Link } from 'react-router-dom'
import cart from '../../../../cart'
import Pagination from 'react-js-pagination'
const Shop = () => {
    const [products, setProduct] = useState({});
    const [pageProduct, setPageProduct] = useState([]);
    const [search, setSearch] = useState("")
    const c = cart();
    useEffect(() => {
        callDataProducts()
    }, [])
    const callDataProducts = (pageNumber = 1) => {
        axios.get(`/api/productPage?page=${pageNumber}`)
            .then(respone => {
                console.log(respone.data)
                setProduct(respone.data);
                setPageProduct(respone.data.data)
            }).catch(error => console.log(error))
    }
    const onHandleChange = (event) => {
        let value = event.target.value;
        if (value == "") {
            callDataProducts()
        } else {
            axios.get(`/api/search/${value}`)
                .then(function (response) {
                    setPageProduct(response.data)
                });
        }
    }
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
                <div className="row">
                    <div className="col-sm-9">
                        <h2 className="title text-center">Cửa hàng</h2>
                    </div>
                    <div className="col-sm-3">
                        <div className="search_box pull-right">
                            <input type="text" placeholder="Search" onChange={onHandleChange} />
                        </div>
                    </div>
                </div>
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

export default Shop