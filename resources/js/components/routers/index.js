import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//Layout
import LayoutAdmin from '../pages/layouts/LayoutAdmin';
import LayoutMain from '../pages/layouts/LayoutMain'
//Admin
import Dashboard from '../pages/views/Admin/Dashboard'
import ListCate from '../pages/views/Admin/Category/ListCate'
import AddCate from '../pages/views/Admin/Category/AddCate'
//Main
import Home from '../pages/views/Main/Home'
import ListProduct from '../pages/views/Admin/Products/ListProducts';
import AddProduct from '../pages/views/Admin/Products/AddProducts';
import EditProduct from '../pages/views/Admin/Products/EditProduct';
import DetailProduct from '../pages/views/Admin/Products/DetailProduct';
import Shop from '../pages/views/Main/Shop';
import Category from '../pages/views/Main/Category';
import Product from '../pages/views/Main/Product';
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
                        </Switch>
                    </LayoutAdmin>
                </Route>
                <Route path='/:path?/:path?' exact>
                    <LayoutMain>
                        <Switch>
                            <Route path="/" exact>
                                <Home />
                            </Route>
                            <Route path="/shop" >
                                <Shop />
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