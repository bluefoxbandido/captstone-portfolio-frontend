import React from 'react';

const PortfolioList = (props) => {
    const portfolioList = props.data.map(portfolioItem => {
        return (
            <div key={portfolioItem._id} className="portfolio-item">
                <div className="text-content">
                    <div className="title">{portfolioItem.name}</div>
                    <div className="description">
                        <h4>{portfolioItem.url}</h4>
                        <p>
                            {portfolioItem.description}
                        </p>
                    </div>
                    <div className="actions">
                        <button className="action">Edit</button>
                        <a 
                          className="actions"
                          onClick={() => props.handleDeleteClick(portfolioItem)}
                        >
                            X
                        </a>
                    </div>
                </div>

            </div>
        )
    })
    return (
        <div className='portfolio-list-wrapper'>
            {portfolioList}            
        </div>
    )
}

export default PortfolioList;