import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Axios from 'axios';
//Layout
import LayoutAdmin from '../pages/layouts/LayoutAdmin';
import LayoutMain from '../pages/layouts/LayoutMain'
//Admin-dasboard
import Dashboard from '../pages/views/Admin/Dashboard'
//Admin-category
import ListCate from '../pages/views/Admin/Category/ListCate'
import AddCate from '../pages/views/Admin/Category/AddCate'
import EditCategory from '../pages/views/Admin/Category/EditCategory';
//Admin-product
import ListProduct from '../pages/views/Admin/Products/ListProducts';
import AddProduct from '../pages/views/Admin/Products/AddProducts';
import EditProduct from '../pages/views/Admin/Products/EditProduct';
import DetailProduct from '../pages/views/Admin/Products/DetailProduct';
//Admin-blog
import ListBlog from '../pages/views/Admin/Blog/ListBlog';
import AddBlog from '../pages/views/Admin/Blog/AddBlog';
import EditBlog from '../pages/views/Admin/Blog/EditBlog';
import DetailBlog from '../pages/views/Admin/Blog/DetailBlog';
//admin-contact
import ListContact from '../pages/views/Admin/Contact/ListContact';
//admin-order
import ListOrder from '../pages/views/Admin/Order/ListOrder';
import OrderDetail from '../pages/views/Admin/Order/OrderDetail';
//Main
import Home from '../pages/views/Main/Home'
import Shop from '../pages/views/Main/Shop';
import Category from '../pages/views/Main/Category';
import Product from '../pages/views/Main/Product';
import Blogs from '../pages/views/Main/Blogs'
import BlogPage from '../pages/views/Main/BlogPage';
import About from '../pages/views/Main/About';
import Contact from '../pages/views/Main/Contact';
import Cart from '../pages/views/Main/Cart';
import Checkout from '../pages/views/Main/Checkout';



const Routers = () => {
    return (
        <Router>
            <Switch>
                <Route path='/admin/:path?/:path?/:path?' exact>
                    <LayoutAdmin>
                        <Switch>
                            <Route path='/admin' exact>
                                <Dashboard />
                            </Route>
                            <Route path='/admin/category/edit/:id'>
                                <EditCategory />
                            </Route>
                            <Route path='/admin/category/add'>
                                <AddCate />
                            </Route>
                            <Route path='/admin/category' exact>
                                <ListCate />
                            </Route>
                            <Route path='/admin/products/add' exact>
                                <AddProduct />
                            </Route>
                            <Route path='/admin/products/:id' exact>
                                <DetailProduct />
                            </Route>
                            <Route path='/admin/products/edit/:id' exact>
                                <EditProduct />
                            </Route>
                            <Route path='/admin/products' exact>
                                <ListProduct />
                            </Route>
                            <Route path='/admin/blogs/add' exact>
                                <AddBlog />
                            </Route>
                            <Route path='/admin/blogs/:id' exact>
                                <DetailBlog />
                            </Route>
                            <Route path='/admin/blogs/edit/:id' exact>
                                <EditBlog />
                            </Route>
                            <Route path='/admin/blogs' exact>
                                <ListBlog />
                            </Route>
                            <Route path='/admin/contact' exact>
                                <ListContact />
                            </Route>
                            <Route path='/admin/orders/:id' exact>
                                <OrderDetail />
                            </Route>
                            <Route path='/admin/orders' exact>
                                <ListOrder />
                            </Route>
                        </Switch>
                    </LayoutAdmin>
                </Route>
                <Route path='/:path?/:path?' exact>
                    <LayoutMain>
                        <Switch>
                            <Route path="/" exact>
                                <Home />
                            </Route>
                            <Route path="/checkout" exact>
                                <Checkout />
                            </Route>
                            <Route path="/cart" exact>
                                <Cart />
                            </Route>
                            <Route path="/about" exact>
                                <About />
                            </Route>
                            <Route path="/contact" exact>
                                <Contact />
                            </Route>
                            <Route path="/shop" >
                                <Shop />
                            </Route>
                            <Route path="/blogs/:id" >
                                <BlogPage />
                            </Route>
                            <Route path="/blogs" >
                                <Blogs />
                            </Route>
                            <Route path="/category/:id" >
                                <Category />
                            </Route>
                            <Route path="/product/:id" >
                                <Product />
                            </Route>
                        </Switch>
                    </LayoutMain>
                </Route>
            </Switch>
        </Router>
    )
}
export default Routers