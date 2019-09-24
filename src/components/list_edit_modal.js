import React from 'react';
import Axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

export default class editModal extends  React.Component  {
    constructor(props, context) {
        super(props, context);
        this.state = {
            show: this.props.show,
        };
    }

    handleClose = () => {
        this.setState({ show: false });
    }

    handleShow = () => {
        this.setState({ show: true });
    }
    render(){
        return(
            <Modal
                centered
                size="lg"
                show={this.props.show}
                onHide={this.handleClose}
            >
            <Modal.Header closeButton>
                <Modal.Title>Call Id <span className="modal-title-pkg-name">{this.props.callDetails.call_id}</span></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {JSON.stringify(this.props.callDetails.label_id)}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={this.handleClose}>
                    Update Label(s)
                </Button>
            </Modal.Footer>
        </Modal>
        );
    }
}