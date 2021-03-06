import React from 'react'
import Sidebar from '../../components/Admin/Sidebar'
import Topbar from '../../components/Admin/Topbar'
import Footer from '../../components/Admin/Footer'
import '../../assets/Admin/sb-admin-2.min.scss'
import '../../assets/Admin/fontawesome-free/css/all.min.css'
export default ({ children }) => {
    return (
        <div className="admin-page">
            <div id="wrapper">
                <Sidebar />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <Topbar />
                        <div className="container-fluid">
                            {children}
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}