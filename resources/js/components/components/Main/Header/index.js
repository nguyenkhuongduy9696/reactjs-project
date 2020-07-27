import React from 'react'
import logo from '../../../assets/Main/images/home/logo.png'
const Header = props => {
    return (
        <header id="header">
            <div className="header-middle">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4">
                            <div className="logo pull-left">
                                <a href="index.html"><img src={logo} alt="" /></a>
                            </div>
                        </div>
                        <div className="col-sm-8">
                            <div className="shop-menu pull-right">
                                <ul className="nav navbar-nav">
                                    <li><a href="#"><i className="fa fa-user" /> Account</a></li>
                                    <li><a href="#"><i className="fa fa-star" /> Wishlist</a></li>
                                    <li><a href="checkout.html"><i className="fa fa-crosshairs" /> Checkout</a></li>
                                    <li><a href="cart.html"><i className="fa fa-shopping-cart" /> Cart</a></li>
                                    <li><a href="login.html"><i className="fa fa-lock" /> Login</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="header-bottom">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-9">
                            <div className="navbar-header">
                                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                                    <span className="sr-only">Toggle navigation</span>
                                    <span className="icon-bar" />
                                    <span className="icon-bar" />
                                    <span className="icon-bar" />
                                </button>
                            </div>
                            <div className="mainmenu pull-left">
                                <ul className="nav navbar-nav collapse navbar-collapse">
                                    <li><a href="index.html" className="active">Home</a></li>
                                    <li><a href="#">Shop</a></li>
                                    <li><a href="404.html">Blog</a></li>
                                    <li><a href="contact-us.html">Contact</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="search_box pull-right">
                                <input type="text" placeholder="Search" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>

    );
}
export default Header