import { Button, Modal } from 'flowbite-react';
import { useState } from 'react';

export function ErrorModal(props) {
  const [openModal, setOpenModal] = useState(true);

  const onClick = () => {
    setOpenModal(false);
    window.location.href = "https://frontenddemo.run.goorm.site/";
  };

  return (
    <Modal show={openModal} onClose={onClick}>
      <Modal.Header>{props.header}</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            {props.message1}
          </p>
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            {props.message2}
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClick}>I accept</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ErrorModal;