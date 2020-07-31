import React, { useState, useEffect } from 'react'
import shipping from '../../../assets/Main/images/home/shipping.jpg'
import { Link } from 'react-router-dom';
import axios from 'axios';
const LeftBar = () => {
    const [category, setCategory] = useState([]);
    const callDataCategory = () => {
        axios.get('/api/category')
            .then(response => {
                setCategory(response.data)
            })
            .catch(error => console.log(error));
    }
    useEffect(() => {
        callDataCategory()
    }, [])
    return (
        <div>
            <div className="col-sm-3">
                <div className="left-sidebar">
                    <h2>Category</h2>
                    <div className="panel-group category-products" id="accordian">
                        {category.map(({ id, name }, index) => (
                            <div className="panel panel-default" key={index}>
                                <div className="panel-heading">
                                    <h4 className="panel-title"><Link to={`/category/${id}`}>{name}</Link></h4>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="brands_products">
                        <h2>Brands</h2>
                        <div className="brands-name">
                            <ul className="nav nav-pills nav-stacked">
                                <li><a href="#"> <span className="pull-right">(50)</span>Acne</a></li>
                                <li><a href="#"> <span className="pull-right">(56)</span>Grüne Erde</a></li>
                                <li><a href="#"> <span className="pull-right">(27)</span>Albiro</a></li>
                                <li><a href="#"> <span className="pull-right">(32)</span>Ronhill</a></li>
                                <li><a href="#"> <span className="pull-right">(5)</span>Oddmolly</a></li>
                                <li><a href="#"> <span className="pull-right">(9)</span>Boudestijn</a></li>
                                <li><a href="#"> <span className="pull-right">(4)</span>Rösch creative culture</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="shipping text-center">
                        <img src={shipping} alt="" />
                    </div>
                </div>
            </div>

        </div>
    );
}

export default LeftBar