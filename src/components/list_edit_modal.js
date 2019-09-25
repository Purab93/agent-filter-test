import React from 'react';
import Axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import ListRow from './list_row';

export default class editModal extends  React.Component  {
    constructor(props, context) {
        super(props, context);
        this.state = {
            show: this.props.show,
            lblsCollection: this.props.callDetails.label_id
        };
    }

    handleClose = () => {
        this.props.updateLabels();
    }

    addLabel = (labelDetails) =>{
        
    }

    getLabels(){
        return (
            <>
                {
                    this.state.lblsCollection.map(function(index,value){
                        return (<ListRow key={index} lblVal={value} addLabel={this.addLabel}/>);
                    })
                }
            </>
        );
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
                {this.getLabels()}
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