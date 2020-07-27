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
const Routers = () => {
    return (
        <Router>
            <Switch>
                <Route path='/admin/:path?/:path?' exact>
                    <LayoutAdmin>
                        <Switch>
                            <Route path='/admin' exact>
                                <Dashboard />
                            </Route>
                            <Route path='/admin/category/add'>
                                <AddCate />
                            </Route>
                            <Route path='/admin/category'>
                                <ListCate />
                            </Route>
                        </Switch>
                    </LayoutAdmin>
                </Route>
                <Route>
                    <LayoutMain>
                        <Switch>
                            <Route path="/" exact>
                                <Home />
                            </Route>
                        </Switch>
                    </LayoutMain>
                </Route>
            </Switch>
        </Router>
    )
}
export default Routers