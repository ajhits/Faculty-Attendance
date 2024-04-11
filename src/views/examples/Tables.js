import {
  Badge,
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
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
} from "reactstrap";

import Header from "components/Headers/Header.js";

const Tables = () => {
  // Function to handle delete action
  const handleDelete = (userId) => {
    // Perform delete action based on userId
    console.log(`Deleting user with ID: ${userId}`);
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
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">User ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">ID Number</th>
                    <th scope="col">Position</th>
                    <th scope="col">Actions</th> {/* Added column for actions */}
                  </tr>
                </thead>
                <tbody>
                  {/* Sample table row */}
                  <tr>
                    <td>1</td>
                    <td>John Doe</td>
                    <td>1234567890</td>
                    <td>Manager</td>
                    <td>
                      {/* Delete button */}
                      <Button color="danger" onClick={() => handleDelete(1)}>Delete</Button>
                    </td>
                  </tr>
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
                <Form>
                  <FormGroup>
                    <Label for="name">Name</Label>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Enter name"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="familiarity">ID Number</Label>
                    <Input
                      type="text"
                      name="id"
                      id="id"
                      placeholder="Enter ID"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="Department">Position</Label>
                    <Input type="select" name="Department" id="Department">
                      <option value="faculty">Faculty</option>
                      <option value="staff">Staff</option>
                      <option value="employee">Employee</option>
                    </Input>
                  </FormGroup>
                  <Button color="primary">Register</Button>
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
