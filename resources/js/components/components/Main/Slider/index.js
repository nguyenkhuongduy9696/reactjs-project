import React from 'react'
import girl1 from '../../../assets/Main/images/home/girl1.jpg'
import girl2 from '../../../assets/Main/images/home/girl2.jpg'
import girl3 from '../../../assets/Main/images/home/girl3.jpg'
import pricing from '../../../assets/Main/images/home/pricing.png'
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
                                        <h2>Free E-Commerce Template</h2>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                        tempor incididunt ut labore et dolore magna aliqua. </p>
                                        <button type="button" className="btn btn-default get">Get it now</button>
                                    </div>
                                    <div className="col-sm-6">
                                        <img src={girl2} className="girl img-responsive" alt="" />
                                        <img src={pricing} className="pricing" alt="" />
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