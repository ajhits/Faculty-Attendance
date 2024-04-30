
import { ForgotPasswords } from "../../firebase/Auth/Authentication";
import React from "react";
import {
  Button,
  Card,
  // CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";

const Forgot = () => {
  const [user, setUser] = React.useState({
    email: "",
    password: ""
})

    // for email and password changes
    const handleInputChange = e => {
      const { name, value } = e.target;
      setUser({
        ...user,
        [name]: value
      });
  };


  const handleLogin = async (e) => {
    e.preventDefault()

    ForgotPasswords(user.email)
    .then(e=>alert(e.message))
    .catch(e=> alert(e.message))
};

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <h3>Reset Password</h3>
            </div>

            {/* Email */}
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    name="email"
                    value={user.username}
                    onChange={handleInputChange}
                    autoComplete="new-email"
                  />
                </InputGroup>
              </FormGroup>

              {/* Login */}
              <div className="text-center">
                <Button className="my-4" color="primary" type="button" onClick={handleLogin}>
                  send email
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="/"
            >
              <small>Back to Login</small>
            </a>
          </Col>
          
        </Row>
      </Col>
    </>
  );
};

export default Forgot;
