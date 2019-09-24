import React from 'react';
import Axios from 'axios';
import ReactTable from "react-table";
import { Button } from 'react-bootstrap';
import EditModal from './components/list_edit_modal';

import 'react-table/react-table.css';
import 'react-sm-select/dist/styles.css';



export default class Part2 extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            checked: [],
            modalData: {
                show: false,
                callDetails: {

                }
            }
        }
    }
    
    componentWillMount(){
        Axios.all([this.getCallLst(),this.getListLbl()])
        .then(Axios.spread((callListData, listLblData) => {
            let callList = callListData.data.data.call_data;
            let unqLblList = listLblData.data.data.unique_label_list;

            this.setState({callList,unqLblList});
        })).catch(()=>{
            console.log('some error while fetching request')
        });
    }

    getCallLst(){
        return Axios('https://damp-garden-93707.herokuapp.com/getcalllist',{'headers':{user_id:'24b456'}});
    }

    getListLbl(){
        return Axios('https://damp-garden-93707.herokuapp.com/getlistoflabels',{'headers':{user_id:'24b456'}});
    }

    getApplyLbl(callList,unqLblList){debugger
        Axios.post('https://damp-garden-93707.herokuapp.com/applyLabels',{
            'headers':{user_id:'24b456'},
            data:{'operation':{
                    'callList':callList,
                    'label_ops':unqLblList
                }
            }
        })
        .then((res)=>{
            if(res.status === 200){
                debugger;
            } else {    
                console.log('Some error has occured please try again');
            }
        }).catch(()=>{
            console.log('some error while fetching request')
        });
    }

    handleModifyClick = (value)=>{
        let callVal = this.state.callList[value];
        this.setState({
            modalData: {
                show: true,
                callDetails: callVal
            }
        });
    }

    render(){
        const columns = [{
            Header: 'Call Id',
            accessor: 'call_id' // String-based value accessors!
        }, {
            Header: 'Label Id',
            accessor: 'label_id'
        },{
            Header: 'Actions',
            Cell: row => (
                <Button variant="primary" className="modify-btn" onClick={()=>{this.handleModifyClick(row.index);}}>Modify</Button>
            ),
            sortable: false,
            filterable: false
          }];
        const tabConfig = {
            showPagination: true,
            showPageSizeOptions: true,
            showPaginationTop: false,
            showPaginationBottom: true,
            pageSizeOptions : [ 5 , 10 , 20 , 25 , 50 ] ,      
            defaultPageSize: 10,
            sortable: true,
            multiSort: true,
            filterable: true,
            defaultFilterMethod: (filter, row, column) => {
                const id = filter.pivotId || filter.id
                return row[id] !== undefined ? String(row[id]).startsWith(filter.value) : true
            }
        };
        return(
            <div className="container-part1">
                {this.state? 
                    <>
                        <ReactTable 
                            {...tabConfig}
                            data={this.state.callList} 
                            columns={columns} 
                        /> 
                        <EditModal {...this.state.modalData}/>
                    </>:<></>}
            </div>
        );
    }
}