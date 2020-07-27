import React from 'react'
import '../../assets/Main/css/bootstrap.min.scss'
import '../../assets/Main/css/font-awesome.min.css'
import '../../assets/Main/css/animate.css'
import '../../assets/Main/css/main.scss'
import '../../assets/Main/css/responsive.css'
import Header from '../../components/Main/Header'
import Slider from '../../components/Main/Slider'
export default ({ children }) => {
    return (
        <div className="main-page">
            <Header />
            <Slider />
        </div>
    )
}