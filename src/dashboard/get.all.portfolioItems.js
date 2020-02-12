import React, { Component } from 'react'

export default class GetAll extends Component {
    constructor(props) {
        super(props)

        this.state = {
            portfolioItems: []
        }
    }

    async componentDidMount() {
        fetch(`https://capstone-portfolio-backend.herokuapp.com/portfolioItems`)
            .then(res => res.json())
            .then(portfolioItems => {
                console.log(portfolioItems)
                this.setState({
                    portfolioItems: portfolioItems
                })
            })
            .catch(error => {
                console.log('Error', error)
            })

    }

    render() {
        const portfolioList = this.state.portfolioItems.map(portfolioItem => {
            return (
                <div key={portfolioItem._id} className="portfolioItem">
                    <div className="title">
                        <h2>{portfolioItem.name}</h2>
                        <a href={portfolioItem.url}>{portfolioItem.url}</a>
                    </div>
                    <div className="description">
                        {portfolioItem.description}
                    </div>
                </div>
            );
        });
        return (
            <div className="portfolio-list-wrapper">
                {portfolioList}
            </div>
        )
    }
}