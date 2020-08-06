import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import { Link } from 'react-router-dom'
import usePaginate from '../../../../paginate'
import cart from '../../../../cart'
const Shop = () => {
    const [products, setProduct] = useState([]);
    const c = cart();
    const callDataProduct = () => {
        Axios.get('/api/products')
            .then(response => {
                setProduct(response.data)
            })
            .catch(error => console.log(error))
    }
    const page = usePaginate(products, 6)
    useEffect(() => {
        callDataProduct()
    }, [])
    return (
        <div>
            <div className="features_items">
                <h2 className="title text-center">Cửa hàng</h2>
                {page.currentData().map(({ id, name, image, price }, index) => (
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

export default Shop