import React from 'react';
import Axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

export default class editModal extends  React.Component  {
    inputChangeHanler = (val) => {
        this.props.addLabel();
    }

    render(){
        return(
            <div className="container">
                <div className="input-holder">
                    <input type="text" placeholder="add label" onChange={(val)=>this.inputChangeHanler(val)} value={this.props.lblVal}/>
                </div>
                <div>
                    <Button variant="danger">Delete</Button>
                </div>
            </div>
        );
    }
}