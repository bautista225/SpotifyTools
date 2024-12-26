import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import ProgressBar from "react-bootstrap/ProgressBar";
import { unstable_usePrompt as usePrompt } from "react-router-dom";

const useProgressModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const [progressLabel, setProgressLabel] = useState("");
  const [description, setDescription] = useState("");
  usePrompt({
    when: showModal,
    message:
      "There is an ongoing action.\n" +
      "If you leave the window, you will lose the data.\n" +
      "Are you sure you want to leave?",
  });

  const open = () => setShowModal(true);
  const close = () => {
    setProgressValue(0);
    setProgressLabel("");
    setShowModal(false);
  };

  const modalComponent = (
    <>
      <Modal
        show={showModal}
        onHide={close}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Body>
          <p>{description}</p>
          <ProgressBar
            variant="dark"
            now={progressValue}
            label={progressLabel}
          />
        </Modal.Body>
      </Modal>
    </>
  );

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      console.log("Leaving the page");
      if (showModal) {
        event.preventDefault();
        // Algunos navegadores requieren esta línea para mostrar el mensaje.
        event.returnValue =
          "There is an ongoing action.\n" +
          "If you leave the window, you will lose the data.\n" +
          "Are you sure you want to leave?";
        return event.returnValue;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      console.log("Unmounting the component");
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [showModal]);

  return {
    modalComponent,
    isOpen: showModal,
    setDescription,
    setProgressValue,
    setProgressLabel,
    open,
    close,
  };
};

export default useProgressModal;
