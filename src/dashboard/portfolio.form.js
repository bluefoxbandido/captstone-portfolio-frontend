import React, { Component } from "react";

export default class PortfolioForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      description: "",
      url: "",
      imageUrl: "",
      editMode: false,
      apiUrl: `https://capstone-portfolio-backend.herokuapp.com/createPortfolioItem`,
      apiAction: "post"
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.buildForm = this.buildForm.bind(this);
  }

  componentDidUpdate() {
    if (Object.keys(this.props.portfolioToEdit).length > 0) {
      const {
        _id,
        name,
        description,
        url,
        imageUrl
      } = this.props.portfolioToEdit;

      this.props.clearPortfolioToEdit();

      this.setState({
        id: _id,
        name: name || "",
        description: description || "",
        url: url || "",
        imageUrl: imageUrl || "",
        editMode: true,
        apiUrl: `https://capstone-portfolio-backend.herokuapp.com/portfolioItem/${_id}`,
        apiAction: "put"
      });
    }
  }

  buildForm() {
    const data = {
      name: this.state.name,
      description: this.state.description,
      url: this.state.url,
      imageUrl: this.state.imageUrl
    };

    return data;
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    console.log(this.state.apiAction);
    console.log(this.state.apiUrl);
    console.log(this.buildForm());
    fetch(this.state.apiUrl, {
      method: this.state.apiAction,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: this.state.name,
        description: this.state.description,
        url: this.state.url,
        imageUrl: this.state.imageUrl
      })
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);

        this.setState({
          name: "",
          description: "",
          url: "",
          imageUrl: "",
          editMode: false,
          apiUrl: `https://capstone-portfolio-backend.herokuapp.com/createPortfolioItem/:id`,
          apiAction: "post"
        });
        window.history.go();
      })
      .catch(error => {
        console.log("HandleSubmit Error: ", error);
      });

    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="portfolio-form-wrapper">
        <div className="two-column">
          <input
            type="text"
            name="name"
            placeholder="Portfolio Item Name"
            value={this.state.name}
            onChange={this.handleChange}
          />

          <input
            type="text"
            name="url"
            placeholder="Portfolio URL"
            value={this.state.url}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="imageUrl"
            placeholder="Portfolio Image URL"
            value={this.state.imageUrl}
            onChange={this.handleChange}
          />
        </div>
        <div className="imageUrl"></div>
        <div className="description">
          <textarea
            type="text"
            name="description"
            placeholder="Description"
            value={this.state.description}
            onChange={this.handleChange}
          />
        </div>
        <div className="submit-button">
          <button className="btn" type="submit">
            Save
          </button>
        </div>
      </form>
    );
  }
}
