import React from 'react';
import Axios from 'axios';
import ReactTable from "react-table";
import { MultiSelect } from 'react-sm-select';

import 'react-table/react-table.css';
import 'react-sm-select/dist/styles.css';



export default class Part2 extends React.Component {
    
    componentWillMount(){
        Axios.all([this.getCallLst(),this.getListLbl()])
        .then(Axios.spread((callListData, listLblData) => {
            let callList = callListData.data.data.call_data;
            let unqLblList = listLblData.data.data.unique_label_list;
            this.getApplyLbl(callList,unqLblList);
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

    getSelOpts(){
        return this.state.agentList.map((val) => {
            return {
                value: val,
                label: val
            }
        })
    }

    multiSelectVal= (selValue) => {
        let agentListData = this.state.agentAllData.filter((value)=>{
            if(selValue.indexOf(value.agent_id) >= 0){
                return true;
            }
            return false;
        });
        this.setState({selValue,agentListData});
    }

    render(){
        const columns = [{
            Header: 'Agent Name',
            accessor: 'agent_id' // String-based value accessors!
        }, {
            Header: 'Call Id',
            accessor: 'call_id'
        }, {// Required because our accessor is not a string
            Header: 'Call Time',
            accessor: 'call_time'
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
                        <MultiSelect
                            id="some-id"
                            enableSearch= {true}
                            valuePlaceholder="Filter using Agent Name"
                            searchPlaceholder = "Search Agent Name"
                            options={this.getSelOpts()}
                            value={this.state.selValue}
                            onChange={this.multiSelectVal}
                        />
                        <ReactTable 
                            {...tabConfig}
                            data={this.state.agentListData} 
                            columns={columns} 
                        /> 
                    </>:<></>}
            </div>
        );
    }
}