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
import "./signup.css";
import axios from 'axios';
import { apiURL } from '../../config/apiURL';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      phone: "",
      mobile: "",
      zipcode: "",
      profilePic: "",
      lat: "",
      lang: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  fileSelectedHandler(event) {
    this.setState({ profilePic: event.target.files[0] });
  }

  handleSubmit(event) {
    event.preventDefault();

    let form = new FormData();
    if(this.state.profilePic.length < 1){
    form.append("profilePic", this.state.profilePic);
    form.append(  "name", this.state.name,);
    form.append( "email", this.state.email,);
    form.append(  "password", this.state.password,);
    form.append(  "phone", this.state.phone,);
    form.append( "mobile", this.state.mobile,);
    form.append(  "zipcode", this.state.zipcode,);
    form.append(    "lat", this.state.lat,);
    form.append(   "lang", this.state.lang,);
    }
    else{
    form.append("profilePic", this.state.profilePic, this.state.profilePic.name);
    form.append(  "name", this.state.name,);
    form.append( "email", this.state.email,);
    form.append(  "password", this.state.password,);
    form.append(  "phone", this.state.phone,);
    form.append( "mobile", this.state.mobile,);
    form.append(  "zipcode", this.state.zipcode,);
    form.append(    "lat", this.state.lat,);
    form.append(   "lang", this.state.lang,);
    }
    
    



  
    axios.post(apiURL + "api/signup" , form)
    .then((res) => { 
      alert("your account created successfully");
    })
    .catch( (err) => { 
         alert(err.response.data.message);
    });
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lang = position.coords.longitude;
      this.setState({ lat: lat });
      this.setState({ lang: lang });
    });
  }

  render() {
    return (
      <div className="container">
        <Card
          className="signupCard"
          style={{ height: "530px", width: "600px" }}
        >
          <CardHeader className="text-center">
            <h2 style={{ color: "blue" }}>Signup Form </h2>
          </CardHeader>
          <Form
            id="form"
            onSubmit={this.handleSubmit}
            encType="multipart/form-data" 
          >
            <FormGroup row>
              <Label htmlFor="name" md={2}>
                Name :
              </Label>
              <Col md={8}>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter your name..."
                  value={this.state.name}
                  onChange={this.handleInputChange}
                />
              </Col>
            </FormGroup>
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
              <Label htmlFor="phone" md={2}>
                Phone :
              </Label>
              <Col md={8}>
                <Input
                  type="number"
                  name="phone"
                  id="phone"
                  placeholder="Enter your phone number..."
                  value={this.state.phone}
                  onChange={this.handleInputChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label htmlFor="mobile" md={2}>
                Mobile :
              </Label>
              <Col md={8}>
                <Input
                  type="number"
                  name="mobile"
                  id="mobile"
                  placeholder="Enter your mobile no..."
                  value={this.state.mobile}
                  onChange={this.handleInputChange}
                />
              </Col>
            </FormGroup>
            <Row>
              <Col>
                <FormGroup row>
                  <Label htmlFor="zipcode" md={2}>
                    Zip Code :
                  </Label>
                  <Col md={4}>
                    <Input
                      type="text"
                      name="zipcode"
                      id="zipcode"
                      placeholder="Enter your zipcode..."
                      value={this.state.zipcode}
                      onChange={this.handleInputChange}
                    />
                  </Col>
                  <Col md={2}>
                    <Input
                      type="file"
                      onChange={this.fileSelectedHandler}
                      className="form-control-file"
                     
                    />
                  </Col>
                </FormGroup>
              </Col>
            </Row>
            <FormGroup row>
              <Col md={{ size: 8, offset: 2 }}>
                <Button className="btn btn-block"> SignUp </Button>
              </Col>
            </FormGroup>
          </Form>
        </Card>
      </div>
    );
  }
}

export default SignUp;
