import decode from "jwt-decode";

export default class AuthHelperMethods {
  login = (email, password) => {
    const proxy_url =
      "https://cors-anywhere.herokuapp.com/https://capstone-portfolio-backend.herokuapp.com/user/login";
    return this.fetch(proxy_url, {
      method: "POST",
      body: JSON.stringify({
        email,
        password
      })
    }).then(res => {
      this.setToken(res.token);
      return Promise.resolve(res);
    });
  };

  loggedIn = () => {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  };

  isTokenExpired = token => {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      console.log("Expired Check Failed");
      return false;
    }
  };

  setToken = idToken => {
    localStorage.setItem("id_token", idToken);
  };

  getToken = () => {
    return localStorage.getItem("id_token");
  };

  logout = () => {
    console.log("logout");
    localStorage.removeItem("id_token");
    window.history.go("/login");
  };

  getConfirm = () => {
    let answer = decode(this.getToken());
    console.log("Received answer.");

    return answer;
  };

  fetch = (url, options) => {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };

    if (this.loggedIn()) {
      headers["Authorization"] = "Bearer " + this.getToken();
    }

    return fetch(url, {
      headers,
      ...options
    })
      .then(this._checkStatus)
      .then(response => response.json());
  };

  _checkStatus = response => {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      var error = new Error(response.statusText);
      error.response = response;
      console.log(error);
    }
  };
}
