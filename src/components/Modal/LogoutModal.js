
import React, { useState } from 'react';

import {
  Button,
  Modal,
//   ModalHeader,
  ModalBody,
  ModalFooter,
  // ModalHeader,
  // FormGroup,
  // Input,
  // Label,
  // Form
} from 'reactstrap';

function LogoutModal(props) {
  const { className } = props;
  const [backdrop] = useState(true);
  const [keyboard,] = useState(true);

  const toggle = () => props.setModal(false);


  return (
    <div>

      <Modal
        isOpen={props.modal}
        toggle={toggle}
        className={className}
        backdrop={backdrop}
        keyboard={keyboard}
      >

        <ModalBody>
        Are you sure you want to Logout ?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={props.logout}>
            Logout
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            cancel
          </Button>

        </ModalFooter>
      </Modal>
    </div>
  );
}


export default LogoutModal;