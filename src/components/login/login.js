import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  FormFeedback,
  Row,
  Card,
  CardHeader,
} from "reactstrap";
import "./login.css";
import axios from 'axios';
import { apiURL } from '../../config/apiURL';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleInputChange(event){
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event){
    event.preventDefault();
    axios.post(apiURL + "api/login", this.state)
    .then( (res) => { 
      alert("You are loggedin successfully");
      localStorage.setItem("userData", JSON.stringify(res.data));
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.token}`;
       this.props.history.push("/profile");
    })
    .catch((err) => alert(err.response.data.message) );
    
  }

  render() {
    return (
      <div className="container">
        <Card className="loginCard" style={{ height: "350px", width: "600px" }}>
          <CardHeader className="text-center">
            <h2 style={{ color: "blue" }}>Login Form </h2>{" "}
          </CardHeader>
          <Form id="form" handleSubmit onSubmit={this.handleSubmit}>
            <FormGroup row>
              <Label htmlFor="email" md={2}>
                Email :
              </Label>
              <Col md={8}>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email..."
                  value={this.state.email}
                  onChange={this.handleInputChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label htmlFor="password" md={2}>
                Password :
              </Label>
              <Col md={8}>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password..."
                  value={this.state.password}
                  onChange={this.handleInputChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md={{ size: 8, offset: 2 }}>
                <Button className="btn btn-block"> LogIn </Button>
              </Col>
            </FormGroup>
          </Form>
        </Card>
      </div>
    );
  }
}

export default Login;
