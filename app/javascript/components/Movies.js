import React, { Fragment } from "react"
import Logo from 'images/logo.png'
import Rocket from 'images/rocket.png'

class Movies extends React.Component {
  render() {
    return (
      <Fragment>
        <div id="preloder">
          <div className="loader"></div>
        </div>

        <header className="header-section">
          <a href="./index.html" className="site-logo">
            <img className='logo' src={Rocket} alt='logotron' />
          </a>
          <div className="nav-switch">
            <i className="fa fa-bars"></i>
          </div>
          <div className="nav-warp">
            <div className="user-panel">
              <a href="#">Search Now</a>
            </div>
          </div>
        </header>

        <section className="hero-section set-bg">
          <div className="container h-100">
            <div className="hero-content text-white">
              <div className="row">
                <div className="col-lg-6 pr-0">
                  <h2>Ultimate Moviegoers Guide</h2>
                  <p>Your one stop shop for all your movie questions! Search, view and discover everything you ever wanted to
                    know about every movie you can imagine!</p>
                  <a href="#" className="site-btn">Search Now</a>
                </div>
              </div>
              <div className="hero-rocket">
                <img src={Rocket} alt='rocket' />
              </div>
            </div>
          </div>
        </section>

      </Fragment>
    )
  }
}

export default Movies

