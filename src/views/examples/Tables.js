import {
  // Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Form,
  FormGroup,
  Input,
  Label,
  Pagination,
  // PaginationItem,
  // PaginationLink,
  Table,
  Container,
  Row,
} from "reactstrap";

import Header from "components/Headers/Header.js";
import { useEffect, useState } from "react";
import { getEmployee, removeUser } from "../../firebase/Database";
import { createAccount } from "../../firebase/Auth/Authentication";


// REGISTER USERS ======================================================================= //

const Tables = () => {

  const [userAccount,setUserAccount] = useState({})

  useEffect(()=>{
    getEmployee()
    .then(data=>{

      const KEY = Object.keys(data)
      // Object.values(data).map((data,key)=>({...data, "UID": KEY[key]}))
      // console.log(Object.values(data).map((data,key)=>({...data, "UID": KEY[key]})))
      setUserAccount(Object.values(data).map((data,key)=>({...data, "UID": KEY[key]})));
    })  
    .catch(error=>console.error(error))
  },[])


  // Function to handle delete action
  const handleDelete = (userId) => {
    // Perform delete action based on userId
    console.log(`Deleting user with ID: ${userId}`);

    removeUser(userId).then(data=>{
      alert(data);
      window.location.reload()
    }).catch(error=>alert(error))
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    idNumber: '',
    position: 'faculty' // default value
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const capitalizeString = (str) => {
    const words = str.split(' ');
    const capitalizedFirstWord = words[0].charAt(0).toUpperCase() + words[0].slice(1).toLowerCase();
    const restOfWords = words.slice(1).map(word => word.toLowerCase());
    return [capitalizedFirstWord, ...restOfWords].join(' ');
  }

  const handleSubmit =  (e) => {
    e.preventDefault();
    console.log(userAccount.filter(filter=>filter.idNumber === "2019-201745").length); // Logging the form data

    if (userAccount.filter(filter=>filter.idNumber === formData.idNumber).length < 0 ) {
      createAccount({...formData, "name": capitalizeString(formData.name)})
      .then(()=>{
        alert("account created");
        window.location.reload();
      })
      .catch(error=>alert(error))
        return
      }
    alert("Oops! 😕 It seems like the employee number you entered already exists in our system. Please review your input or try a different employee number.")
    

  };

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Users</h3>
                <h5 className="mb-0">total of registered user: {userAccount.length}</h5>
              </CardHeader>
              
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Employee ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Position</th>
                    <th scope="col">Actions</th> {/* Added column for actions */}
                  </tr>
                </thead>
                <tbody>
                  {/* Sample table row */}

                  {Object.values(userAccount)?.map((data,key)=>(
                    <tr key={key}>
                      <td>{data.idNumber}</td>
                      <td>{data.name}</td>
                      <td>{data.email}</td>
                      <td>{data.position}</td>
                      <td>
                        {/* Delete button */}
                        <Button color="danger" onClick={() => handleDelete(data.UID)}>Delete</Button>
                      </td>
                  </tr>
                  ))}
          
                  {/* Add more table rows here */}
                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    {/* Pagination items... */}
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>

            {/* New section for registration */}
            <Card className="mt-4 shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Register New User</h3>
              </CardHeader>
              <CardBody>
                {/* Form for registration */}
                <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="name">Name</Label>
        <Input
          type="text"
          name="name"
          id="name"
          placeholder="Enter name"
          value={formData.name}
          onChange={handleChange}
        />
      </FormGroup>

      <FormGroup>
        <Label for="email">Email</Label>
        <Input
          type="text"
          name="email"
          id="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
        />
      </FormGroup>

      <FormGroup>
        <Label for="id">Employee Number</Label>
        <Input
          type="text"
          name="idNumber"
          id="id"
          placeholder="Enter your Employee Number"
          value={formData.id}
          onChange={handleChange}
        />
      </FormGroup>

      <FormGroup>
        <Label for="position">Position</Label>
        <Input
          type="select"
          name="position"
          id="department"
          value={formData.department}
          onChange={handleChange}
        >
          <option value="faculty">Faculty</option>
          <option value="staff">Staff</option>
          <option value="employee">Employee</option>
        </Input>
      </FormGroup>

      <Button color="primary" type="submit">Register</Button>
    </Form>

                
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Tables;
