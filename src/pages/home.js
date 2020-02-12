import React, { Component } from 'react'
import GetAll from '../dashboard/get.all.portfolioItems'

export default class Home extends Component {

    componentDidUpdate() {
        window.history.go()
    }


    render() {
        return (

            <div className='home-display'>
                <h1>Home</h1>


                <h2 className="home-banner">Coding Projects</h2>
                <GetAll />

            </div>
        )
    }
}