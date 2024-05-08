import { updateUserData } from '../../firebase/Database';
import React, { useEffect, useState } from 'react';

import {
  Button,
  Modal,
//   ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input,
  Label,
  Form
} from 'reactstrap';

function EditModal(props) {
  const { className } = props;
  const [backdrop] = useState(true);
  const [keyboard,] = useState(true);

  const toggle = () => props.setModal(false);


  const [formData, setFormData] = useState({
    UID: '',
    name: '',
    email: '',
    idNumber: '',
    position: '' // default value
  
});

  useEffect(()=>{
    props.data && setFormData(props.data)
},[props.data])


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));


  };

  const handlUpdate = () => {
    updateUserData(formData)
    .then(data=>{
        alert(data)
        window.location.reload()
        toggle()
    })
    .catch(error=>alert(error))
  }
  return (
    <div>

      <Modal
        isOpen={props.modal}
        toggle={toggle}
        className={className}
        backdrop={backdrop}
        keyboard={keyboard}
      >
        {/* <ModalHeader toggle={toggle}></ModalHeader> */}
        <ModalBody>
   
            {/* Form for registration */}
            <Form>

                {/* Email */}
                <FormGroup>
                    <Label for="email"> <strong>{props.data && formData.email}</strong></Label>
                </FormGroup>

            
                {/* Name */}
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

                {/* Department */}
                <FormGroup>
                  <Label for="department">Department</Label>
                  <Input
                  type="select"
                  name="department"
                  id="department"
                  value={formData.department}
                  onChange={handleChange}
                  >
                    <option value="CEA">CEA</option>
                    <option value="CBEA">CBEA</option>
                    <option value="CSA">CSA</option>
                  </Input>
                </FormGroup>

                {/* Position */}
                <FormGroup>
                    <Label for="position">Position</Label>
                    <Input
                    type="select"
                    name="position"
                    id="position"
                    value={formData.position}
                      onChange={handleChange}
                    >
                        <option value="faculty">Faculty</option>
                        <option value="staff">Staff</option>
                        <option value="employee">Employee</option>
                    </Input>
                </FormGroup>

            </Form>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={()=>handlUpdate()}>
            Save Changes
          </Button>{' '}
          <Button color="danger" onClick={toggle}>
            cancel
          </Button>

        </ModalFooter>
      </Modal>
    </div>
  );
}


export default EditModal;