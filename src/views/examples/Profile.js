import React, { useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
import UserHeader from "components/Headers/UserHeader.js";
import useAuth from "../../firebase/Auth/StatusLogin";
import { changing_password } from "../../firebase/Auth/Authentication";

const Profile = () => {
  const { userDetails } = useAuth();
 
  const [formData, setFormData] = useState({
    CurrentPass: '',
    NewPassword: '',
  });

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };


  // Function to handle updating the password
  const handleUpdatePassword = () => {
    // Logic to update the password goes here
    // You can use the NewPassword state variable to get the new password
    changing_password(formData.CurrentPass,formData.NewPassword)
    .then(data=>console.log(data))
    .catch(error=>console.log(error))
    console.log("Updating password:", formData);
  };

  return (
    <>
      <UserHeader />
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={require("../../assets/img/theme/adminpic.png")}
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4"></CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <Row></Row>
                <div className="text-center">
                  <br></br>
                  <br></br>
                  <p>Admin - everything is centralized.</p>
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    Show more
                  </a>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">My account</h3>
                  </Col>
                  <Col className="text-right" xs="4"></Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    User information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            name
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={userDetails.name}
                            id="input-username"
                            placeholder="Username"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Email address
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            defaultValue={userDetails.email}
                            placeholder="jesse@example.com"
                            type="email"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <h3>Change Password</h3>
                    <br></br>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Current Password
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="*******"
                            id="input-first-name"
                            placeholder="First name"
                            type="password"
                            name="CurrentPass"
                            value={formData.CurrentPass}
                            onChange={handleChange}
                          />
                          
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            New Password
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="*******"
                            id="input-last-name"
                            placeholder="Last name"
                            type="password"
                                     name="NewPassword"
                            value={formData.NewPassword}
                            onChange={handleChange}
                          />
                          
                          
                        </FormGroup>
                        <Button
        className="mt-3 mx-auto d-block" // Center the button and add margin top
        color="primary"
        onClick={handleUpdatePassword}
      >
        Update
      </Button>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
