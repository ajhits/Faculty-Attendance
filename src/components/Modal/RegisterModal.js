// import { updateUserData } from '../../firebase/Database';
import React, { useEffect, useState } from 'react';

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  // Input,
  Label,
  Form
} from 'reactstrap';

function RegisterModal(props) {
  const { className } = props;
  const [backdrop] = useState(true);
  const [keyboard,] = useState(true);

  const toggle = () => props.setModal(false);


  const [formData, setFormData] = useState({
    UID: '',
    name: '',
    email: '',
    idNumber: '',
    position: '',
    department: ''
  
});

  useEffect(()=>{
    props.data && setFormData(props.data)
},[props.data])


  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value
  //   }));


  // };

  // const handlUpdate = () => {
  //   updateUserData(formData)
  //   .then(data=>{
  //       alert(data)
  //       window.location.reload()
  //       toggle()
  //   })
  //   .catch(error=>alert(error))
  // }
  return (
    <div>

      <Modal
        isOpen={props.modal}
        toggle={toggle}
        className={className}
        backdrop={backdrop}
        keyboard={keyboard}
      >
        <ModalHeader toggle={toggle}>Please verify of the user details before proceeding to creating account</ModalHeader>
        <ModalBody>
   
            {/* Form for registration */}
            <Form>

                {/* Email */}
                <FormGroup>
                    <Label for="email"> Email: <strong>{props.data && formData.email}</strong></Label>
                </FormGroup>

                {/* Name */}
                <FormGroup>
                    <Label for="name"> Name: <strong>{props.data && formData.name}</strong></Label>
                </FormGroup>

                {/* Employee Number */}
                <FormGroup>
                  <Label for="id">Employee ID:  <strong> {props.data && formData.idNumber}</strong></Label>
                </FormGroup>

                
                {/* Employee Number */}
                <FormGroup>
                  <Label for="id">Department:  <strong> {props.data && formData.department}</strong></Label>
                </FormGroup>

                {/* Position */}
                <FormGroup>
                  <Label for="position"> Position:  <strong>{props.data && formData.position}</strong></Label>
                </FormGroup>

            </Form>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={props.handleSubmits} >
            Register User
          </Button>{' '}

        </ModalFooter>
      </Modal>
    </div>
  );
}


export default RegisterModal;