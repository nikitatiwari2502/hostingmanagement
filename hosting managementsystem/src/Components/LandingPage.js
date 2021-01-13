import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import HostingList from "./HostingList";
import  "./login.css";
class LandingPage extends Component {
  state = {
    name: "",
    password: "",
    isLogin: false,
    fields: {},
    errors: {},
  };
  handleChange = (e) => {
    if (e.target.name === "name") {
      this.setState({
        name: e.target.value,
      });
    }
    if (e.target.name === "password") {
      this.setState({
        password: e.target.value,
      });
    }
  };

  handleSave = (e) => {
    e.preventDefault();
    this.validateForm();
    if (this.state.name === "Admin" && this.state.password === "admin") {
      this.setState({
        isLogin: true,
      });
    } else {
      alert("Please enter valid credentials");
    }
  };

  validateForm() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields["name"]) {
      formIsValid = false;
      errors["name"] = "*Please enter your User name.";
    }
    if (typeof fields["name"] !== "undefined") {
      if (!fields["name"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["name"] = "*Please enter alphabet characters only.";
      }
    }

    if (!fields["password"]) {
      formIsValid = false;
      errors["password"] = "*Please enter your password.";
    }

    if (typeof fields["password"] !== "undefined") {
      if (
        !fields["password"].match(
          /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/
        )
      ) {
        formIsValid = false;
        errors["password"] = "*Please enter secure and strong password.";
      }
    }

    this.setState({
      errors: errors,
    });
    return formIsValid;
  }

  render() {
    return (
      <>
        {this.state.isLogin ? (
          <HostingList></HostingList>
        ) : (
          <Container >
           
            <div id="main-registration-container">
              <div id="register">
                <h3>Login page</h3>
                <form
                  method="post"
                  name="userRegistrationForm"
                  onSubmit={this.handleSave}
                >
                  <label>User Name:</label>
                  <input type="text" name="name" onChange={this.handleChange} />
                  <div className="errorMsg">{this.state.errors.emailid}</div>

                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    onChange={this.handleChange}
                  />
                  <div className="errorMsg">{this.state.errors.password}</div>
                  <input type="submit" className="button" value="Login" />
                </form>
              </div>
            </div>
          </Container>
        )}
      </>
    );
  }
}

export default LandingPage;
