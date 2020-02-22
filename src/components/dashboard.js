import React, { Component } from 'react'
import PortfolioForm from '../dashboard/portfolio.form'
import PortfolioList from '../dashboard/portfolio.list'

import withAuth from './with.auth';
import AuthHelperMethods from './auth.helper.methods';

class Dashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            portfolioItems: [],
            portfolioToEdit: {}
        };

        this.handleNewFormSubmission = this.handleNewFormSubmission.bind(this);
        this.handleEditFormSubmission = this.handleEditClick.bind(this);

        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);

        this.clearPortfolioToEdit = this.clearPortfolioToEdit.bind(this);
        this.getPortfolioItems = this.getPortfolioItems.bind(this);

        this._handleLogout = this._handleLogout.bind(this);
    }

    Auth = new AuthHelperMethods();

    _handleLogout = () => {
      this.Auth.logout()
      this.props.history.replace('/login');
    }

    clearPortfolioToEdit() {
        this.setState({
            portfolioToEdit: {}
        })
    }

    handleEditClick(portfolioItem) {
        this.setState({
            portfolioToEdit: portfolioItem
        });
    }

    handleDeleteClick(portfolioItem) {
        fetch(`https://capstone-portfolio-backend.herokuapp.com/deletePortfolioItem/${portfolioItem._id}`, {
            method: "delete"
        })
            .then(response => {
                this.setState({
                    portfolioItems: this.state.portfolioItems.filter(item =>  {
                        return item._id !== portfolioItem._id
                    })
                });

                return response.data;
            })
            .catch(error => {
                console.log("handleDeleteClick error", error)
            })
    }

    handleEditFormSubmission() {
        this.getPortfolioItems();
    }

    handleNewFormSubmission(portfolioItem) {
        this.setState({
            portfolioItems: [portfolioItem].concat(this.state.portfolioItems)
        });
    }

    handleFormSubmissionError(error) {
        console.log("handleFormSubmissionError error", error)
    }

    getPortfolioItems() {
        fetch(`https://capstone-portfolio-backend.herokuapp.com/portfolioItems`)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                this.setState({
                    portfolioItems: [...response]
                })
            }).catch(error => {
                console.log("Error getting portfolio item: ", error)
            })
    }

    componentDidMount() {
        this.getPortfolioItems()
    }



    render() {
        return (
            <div className='portfolio-manager-wrapper'>
                <div className='left-column'>
                    <PortfolioForm
                        handleNewFormSubmission={this.handleNewFormSubmission}
                        handleEditFormSubmission={this.handleEditFormSubmission}
                        handleSuccessfulFormSubmission={this.handleSuccessfulFormSubmission}
                        handleFormSubmissionError = {this.handleFormSubmissionError}

                        clearPortfolioToEdit={this.clearPortfolioToEdit}
                        portfolioToEdit={this.state.portfolioToEdit}
                    />
                </div>
                <div className='right-column'>
                    <PortfolioList
                        handleDeleteClick={this.handleDeleteClick}
                        data={this.state.portfolioItems}
                        handleEditClick={this.handleEditClick}
                    />
                </div>
            </div>
        )
    }
}

export default withAuth(Dashboard);