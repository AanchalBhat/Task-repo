import React from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardText,
  CardHeader,
} from "reactstrap";
import "./profile.css";
import {apiURL} from '../../config/apiURL';
import axios from 'axios';

class Profile extends React.Component {

    constructor(props){
        super(props);
        this.state = {

            createdAt: "",
            email: "",
            lang: null,
            lat: null,
            message: "",
            mobile: null,
            name: "",
            phone: null,
            profilePic: "",
            success: true,
            updatedAt: "",
            zipcode: null,
            _id: "",

        }
    }

    componentDidMount(){
        let userData = localStorage.getItem("userData");
        if(userData){
            let token = JSON.parse(userData).token;
              axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${token}`;
        axios.get(apiURL + "api/profile")
        .then( (res) => {
            this.setState({createdAt : res.data.createdAt });
            this.setState({email : res.data.email });
            this.setState({lang : res.data.lang });
            this.setState({lat : res.data.lat });
            this.setState({message : res.data.message });
            this.setState({mobile : res.data.mobile });
            this.setState({name : res.data.name });
            this.setState({phone : res.data.phone });
            this.setState({profilePic : res.data.profilePic });
            this.setState({success : res.data.success });
            this.setState({updatedAt : res.data.updatedAt });
            this.setState({zipcode : res.data.zipcode });
            this.setState({_id : res.data._id });
        } )
        .catch( (err) => console.log(err.response));
        }
        else{
            return
        }
      
    }



  render() {
    return (
      <div className="profile">
        <div className="container">
          <Card style={{ height: "575px", width: "600px" }}>
            <CardHeader className="text-center">
              <h2>User Profile </h2>
            </CardHeader>
            <CardImg className="userImg rounded-circle" style={{height : "200px" , width :"200px"}} src={this.state.profilePic}/>
            <CardBody>
              <Row>
                <Col  md={{ size: 3, offset: 2 }}> <h6> Name :</h6> </Col>
                <Col><h6>{this.state.name} </h6></Col>
              </Row>
              <Row className="mt-3">
                <Col  md={{ size: 3, offset: 2 }}> <h6>Email : </h6> </Col>
                <Col><h6>{this.state.email} </h6></Col>
              </Row>
              <Row className="mt-3"> 
                <Col  md={{ size: 3, offset: 2 }}> <h6>Phone : </h6> </Col>
                <Col><h6>{this.state.phone}</h6></Col>
              </Row>
              <Row className="mt-3">
                <Col md={{ size: 3, offset: 2 }}><h6> Mobile :</h6>  </Col>
                <Col><h6>{this.state.mobile} </h6></Col>
              </Row>
              <Row className="mt-3">
                <Col  md={{ size: 3, offset: 2 }}> <h6>Zip Code: </h6></Col>
                <Col><h6>{this.state.zipcode}</h6></Col>
              </Row>
              <Row className="mt-3">
                <Col  md={{ size: 3, offset: 2 }}> <h6> Latitude:</h6></Col>
                <Col><h6>{this.state.lat} </h6></Col>
              </Row>
              <Row className="mt-3">
                <Col  md={{ size: 3, offset: 2 }}> <h6>Longitude: </h6></Col>
                <Col><h6>{this.state.lang}</h6></Col>
              </Row>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}

export default Profile;
