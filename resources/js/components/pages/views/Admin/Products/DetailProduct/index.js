import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

const DetailProduct = () => {
    function Detail() {
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
                <h1 className="h3 mb-2 text-gray-800">Chi tiết sản phẩm</h1>
                <div className="card shadow mb-4">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-4">
                                <img src={product.image} alt="" width="100%" />
                            </div>
                            <div className="col-1"></div>
                            <div className="col-6">
                                <h4 className="text-primary">Tên sản phẩm: {product.name}</h4><br />
                                <p><span className="text-primary">Danh mục: </span> {getCategory(product.cate_id)}</p>
                                <p><span className="text-primary">Giá: </span> {product.price}$</p>
                                <p><span className="text-primary">Tồn kho: </span> {product.quantity}</p>
                                <p><span className="text-primary">Mô tả ngắn của sản phẩm</span></p>
                                <p>{product.short_desc}</p>
                            </div>
                        </div><br />
                        <div className="row">
                            <h4 className="text-primary">Chi tiết sản phẩm</h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-1"></div>
                        <div className="col-10">
                            <div className="figure-image text-justify" dangerouslySetInnerHTML={{ __html: product.detail }}></div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
    return (
        <div>
            <Detail />
        </div>
    );
}

export default DetailProduct