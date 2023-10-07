import React from 'react'
import main from '../Images/main.jpg'

const Home = () => {
  return (
    <div className="home_page">
        <div className="bg_img">
        </div>
        <div className="main_content  shadow-lg">
            <h1>Get the location of your nearby Vendors !</h1>
            <p>HawkerHub is a crowd-sourced, community-driven web application focused on enabling technology for street vendors and hawkers. This platform serves as a valuable tool for both vendors and customers, simplifying the ordering process and enhancing the overall customer experience .</p>
            <button className='rounded-xl'>Search Nearby Vendors</button>
        </div>

        <div className="home_cards">
            <div className=" cards">
            <i className="fa-solid fa-truck"></i>
                <h3>No delivery fees</h3>
            </div>
            <div className="  cards">
            <i className="fa-solid fa-money-bill-wave"></i>
                <h3>Affordable Price</h3>
            </div>
            <div className="  cards">
            <i className="fa-solid fa-user-ninja"></i>
                <h3>No Hidden Charges</h3>
            </div>
            <div className="  cards">
            <i className="fa-solid fa-money-bill-trend-up"></i>
                <h3>Fair Trade</h3>
            </div>
        </div>
    </div>
  )
}

export default Home