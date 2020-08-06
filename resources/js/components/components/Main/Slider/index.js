import React from 'react'
import dam from '../../../assets/Main/images/home/dam.jpg'
import { Link } from 'react-router-dom'
const Slider = props => {
    return (
        <section id="slider">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <div id="slider-carousel" className="carousel slide" data-ride="carousel">
                            <div className="carousel-inner">
                                <div className="item active">
                                    <div className="col-sm-6">
                                        <h1><span>E</span>-SHOPPER</h1>
                                        <h2>Đầm xinh cho ngày mới năng động</h2>
                                        <p>Nổi tiếng với nhiều mẫu váy đầm cao cấp với chất lượng, E-SHOPPER luôn đặt uy tín lên trên đầu và tư vấn khách hàng nhiệt tình nhất. </p>
                                        <Link to='/category/15' type="button" className="btn btn-default get">Xem ngay</Link>
                                    </div>
                                    <div className="col-sm-6">
                                        <img src={dam} style={{ borderRadius: "50%", width: "400px" }} className="girl img-responsive" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
}
export default Slider