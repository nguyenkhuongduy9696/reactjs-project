import React from 'react'
import logo from '../../../assets/Main/images/home/logo.png'
import { Link } from 'react-router-dom';
const Header = props => {
    return (
        <header id="header">
            <div className="header-middle">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4">
                            <div className="logo pull-left">
                                <Link to="/"><img src={logo} alt="" /></Link>
                            </div>
                        </div>
                        <div className="col-sm-8">
                            <div className="shop-menu pull-right">
                                <ul className="nav navbar-nav">
                                    {/* <li><a href="#"><i className="fa fa-user" /> Account</a></li> */}
                                    <li><Link to="/checkout"><i className="fa fa-crosshairs" /> Checkout</Link></li>
                                    <li><Link to="/cart"><i className="fa fa-shopping-cart" /> Cart</Link></li>
                                    {/* <li><a href="login.html"><i className="fa fa-lock" /> Login</a></li> */}
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
                                    <li><Link to="/" className="active">Home</Link></li>
                                    <li><Link to="/shop">Shop</Link></li>
                                    <li><Link to="/blogs">Blog</Link></li>
                                    <li><Link to="/about">About</Link></li>
                                    <li><Link to="/contact">Contact</Link></li>
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