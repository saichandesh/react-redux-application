import React, {Component } from 'react';
import { form , 
        Button, 
        FormGroup, 
        FormControl,
        Modal,
        Label } from 'react-bootstrap';
import { connect } from 'react-redux';

import './Home.css';
import logo from '../../logo.svg';

import { newUser, userAdding } from '../../store/actions/index';

class Home extends Component{

    state = {
        username : '',
        password: '',
        code : '',
        showModal : false,
        errorClassName : 'noerror'
    }

    handleChange = event => {

        this.setState({
            errorClassName : 'noerror'
        });

        switch(event.target.id){
            case 'username' : 
                this.setState({
                    username : event.target.value
                });
                break
            case 'password' :
                this.setState({
                    password : event.target.value
                });
                break
            case 'code' :
                this.setState({
                    code : event.target.value
                });
                break;
            default :
                this.setState( prevState => {
                    return prevState;
                });
                
        }
    }

    componentWillReceiveProps(nextProps){
        if(!nextProps.userAdding){
            this.handleClose();
        }
    }
    
    onClick = () => {
        if(this.state.username !== '' && this.state.password !== '' && this.state.code !== ''){
            this.setState({
                showModal : true
            });
            this.props.onUserAdding(true);
            let user = {
                username : this.state.username,
                password : this.state.password,
                code : this.state.code
            }
            this.props.onSubmit(user);
        }else{
            this.setState({
                errorClassName : 'error'
            });
        }
    }

    handleClose = () => {
		this.setState({ 
            showModal: false,
            username : '',
            password: '',
            code: ''
        });
	}

    render(){
        return(
            <div>
                <form>
                    <div className="form-group">
                        <FormGroup>
                            <label>User Name</label>
                            <FormControl
                                    id = "username"
                                    type="text"
                                    value={this.state.username}
                                    placeholder="Enter username"
                                    onChange={this.handleChange}
                            />
                            <label>Password</label>
                            <FormControl
                                    id = "password"
                                    type="password"
                                    value={this.state.password}
                                    placeholder="Enter password"
                                    onChange={this.handleChange}
                            />
                            <label>Code</label>
                            <textarea 
                                id="code"
                                className="form-control" 
                                rows="15" 
                                placeholder="Enter Code"
                                value={this.state.code}
                                onChange={this.handleChange}
                            />
                            <Button 
                                bsStyle="primary" 
                                className="form-control" 
                                onClick = {this.onClick}>
                                Submit
                            </Button>
                            <Label className={this.state.errorClassName}>All Fields are required</Label>
                        </FormGroup>
                    </div>
                </form>
                <Modal show={this.state.showModal} onHide={this.handleClose}>
					<Modal.Body>
                        <img src={logo} className="submit-logo" alt="logo" />
                        <h4>Submitting....</h4>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        userAdding : state.user.userAdding
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSubmit: (user) => dispatch(newUser(user)),
        onUserAdding: (adding) => dispatch(userAdding(adding))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);