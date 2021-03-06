
import Paper from 'material-ui/Paper';
import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router';



var baseURL = '/';


const style = {
  marginBottom:12,
  width:'100%',
};

const text = {
  margin:0,
  padding:0,
  textAlign:'center'
}


export default class Test extends React.Component{
  constructor(props,context){
    super(props,context);
    this.state = {
      formInput: { username: '', password: ''}
    };
  }

  static get contextTypes() {
    return {
      router: React.PropTypes.object
    }
  } // Used to provide property validation.Currently we are saying that we need a context prop of type "React.PropTypes.object"

  componentIsMounting() {
   this.setState({$invalid: false});
   this.setState({$signedUp: false});
  }

  handleSubmit(event) {
    event.preventDefault();
    var pass = this.state.formInput.password;
    var username = this.state.formInput.username;
    var router = this.context.router;
    var bcrypt = require('bcryptjs');
    var x = this;
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(pass, salt, function(err, hash) {
            var data = {
              name : username,
              password : hash
            }

            $.ajax({
              type : 'POST',
              data :  JSON.stringify(data),
              contentType : 'application/json',
              url : baseURL + 'api/signup',
              success: (function(data) {
                if(data['success'] == false){
                  router.push('/SignUP');
                  x.setState({$invalid: true});
                }
                else{
                  x.setState({$signedUp:true});
                  router.push('/'); // This uses a react router to configure the link provided in router
                }
              }).bind(this)
            });
        });
    });
  }
  usernameChanged(event) {
    this.state.formInput.username = event.target.value;
  }
  passwordChanged(event) {
    this.state.formInput.password = event.target.value;
  }
  render (){
    let invalid = <div style={{color: '#F00',fontSize : 'medium'}}>Username already exists.Try with another email</div>;
    let signedUp = <div style={{color: '#0F0',fontSize : 'medium'}}>User Successfully Signed up</div>;
    return (
      <div>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-lg-4 col-xs-12 col-sm-6 col-md-6 col-lg-offset-4 col-sm-offset-3 col-md-offset-3'>
            <h1 style={text}>QuizRT</h1><br/>
            <p style={text}>Sign-Up to continue with QuizRT</p>
            <form onSubmit={this.handleSubmit.bind(this)} id='signup' >
                  <TextField hintText="abc@def.com" floatingLabelText="Email" fullWidth={true} onChange={this.usernameChanged.bind(this)} type="email" />
                  <TextField fullWidth={true}  floatingLabelText="Password" type="password" onChange={this.passwordChanged.bind(this)} />
                  <RaisedButton type="submit" label="Sign Up" primary={true} style={style} />
            </form>
            { this.state && this.state.$invalid ? invalid : null }
            { this.state && this.state.$signedUp ? signedUp : null }
            <div className='row'>
              <div className='col-xs-12'>
                <div className='center-xs'>
                  <p>OR</p>
                </div>
              </div>
            </div>
            <Link to = '/login' >
              <RaisedButton label="Login" style={style} />
            </Link>
            </div>
          </div>
        </div>
      </div>

    );
  }
};
