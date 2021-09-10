import React, {useState} from "react";
import {Offcanvas} from "react-bootstrap";
import {FaRegFileAlt} from "react-icons/fa";

import "./Read.scss";

const ReadMore = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <FaRegFileAlt onClick={handleShow} className="memo-record-read-btn" />
      <Offcanvas
        className="offcanvas"
        show={show}
        onHide={handleClose}
        {...props}
      >
        <Offcanvas.Header className="offcanvas-header" closeButton>
          <Offcanvas.Title className="offcanvas-label">
            {props.data.title}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <hr />
        <Offcanvas.Body className="offcanvas-body overflow-auto">
          {props.data.content}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default ReadMore;
