import React from 'react'
import '../../assets/Main/css/bootstrap.min.scss'
import '../../assets/Main/css/font-awesome.min.css'
import '../../assets/Main/css/animate.css'
import '../../assets/Main/css/main.scss'
import '../../assets/Main/css/responsive.css'
import Header from '../../components/Main/Header'
import Slider from '../../components/Main/Slider'
import LeftBar from '../../components/Main/LeftBar'
import Footer from '../../components/Main/Footer'
export default ({ children }) => {
    return (
        <div className="main-page">
            <Header />
            <Slider />
            <div className="container">
                <div className="row">
                    <LeftBar />
                    <div className="col-sm-9 padding-right">
                        {children}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}