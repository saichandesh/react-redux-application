import React, {Component } from 'react';
import { connect } from 'react-redux';
import ReactTable from 'react-table';

import './Results.css';

class Results extends Component{

    state = {
        users : [],
        columns : [
            {
                Header: 'User Name',
                accessor: 'username'
            },
            {
                Header: 'Password',
                accessor: 'password'
            },
            {
                Header: 'Code',
                accessor: 'code'
            }
        ]
    }

    componentWillMount(){
        let usersInfo = localStorage.getItem('users');
        
        if(usersInfo !=null){
            this.setState({
                users : JSON.parse(usersInfo)
            });
        }
    }
    
    render(){
        return(
            <div className="table">
                 <ReactTable
                    data = {this.state.users}
                    columns={this.state.columns}
                    defaultPageSize = {this.state.users.length}
                    showPaginationBottom = {false}
                    sortable = {false}
                    multiSort = {false}
                    pageSize = {this.state.users.length}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        users: state.user.users
    }
}

export default connect(mapStateToProps, null)(Results);