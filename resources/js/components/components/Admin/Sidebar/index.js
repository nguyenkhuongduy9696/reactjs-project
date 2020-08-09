import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Sidebar = props => {
    return (
        <div>
            <ul className="navbar-nav bg-gradient-success sidebar sidebar-dark accordion" id="accordionSidebar">
                <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/admin">
                    <div className="sidebar-brand-icon">
                        <i className="fas fa-user-cog" />
                    </div>
                    <div className="sidebar-brand-text mx-3">Dashboard</div>
                </Link>
                {/* Divider */}
                <hr className="sidebar-divider my-0" />
                {/* Divider */}
                <hr className="sidebar-divider" />
                {/* Nav Item - Pages Collapse Menu */}
                <li className="nav-item">
                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                        <i className="fas fa-list" />
                        <span>Category</span>
                    </a>
                    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <Link className="collapse-item" to="/admin/category">List Category</Link>
                            <Link className="collapse-item" to="/admin/category/add">Add Category</Link>
                        </div>
                    </div>
                </li>

                <li className="nav-item">
                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#products" aria-expanded="true" aria-controls="collapseTwo">
                        <i className="fab fa-product-hunt" />
                        <span>Products</span>
                    </a>
                    <div id="products" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <Link className="collapse-item" to="/admin/products">List Product</Link>
                            <Link className="collapse-item" to="/admin/products/add">Add Product</Link>
                        </div>
                    </div>
                </li>
                <li className="nav-item">
                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#blogs" aria-expanded="true" aria-controls="collapseTwo">
                        <i className="fab fa-blogger" />
                        <span>Blogs</span>
                    </a>
                    <div id="blogs" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <Link className="collapse-item" to="/admin/blogs">List Blogs</Link>
                            <Link className="collapse-item" to="/admin/blogs/add">Add Blog</Link>
                        </div>
                    </div>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/admin/contact">
                        <i className="fas fa-envelope" />
                        <span>Contact</span></Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/admin/orders">
                        <i className="fas fa-shopping-cart" />
                        <span>Orders</span></Link>
                </li>
                {/* Divider */}
                <hr className="sidebar-divider d-none d-md-block" />
                {/* Sidebar Toggler (Sidebar) */}
                <div className="text-center d-none d-md-inline">
                    <button className="rounded-circle border-0" id="sidebarToggle" />
                </div>
            </ul>
        </div>
    )
}

Sidebar.propTypes = {

}

export default Sidebar
