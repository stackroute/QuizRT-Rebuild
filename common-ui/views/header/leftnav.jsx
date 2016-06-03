import React from 'react';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import ImageBurstmode from 'material-ui/svg-icons/image/burst-mode';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import ActionPowersettingsnew from 'material-ui/svg-icons/action/power-settings-new';
import ActionAccountbox from 'material-ui/svg-icons/action/account-box';
import ActionTurnedin from 'material-ui/svg-icons/action/turned-in';
import ActionViewmodule from 'material-ui/svg-icons/action/view-module';
import ActionViewquilt from 'material-ui/svg-icons/action/view-quilt';
import ActionHome from 'material-ui/svg-icons/action/home';
import cookie from 'react-cookie';
var baseURL = 'http://localhost:3000/';

const avatarstyle={
  backgroundSize:'cover',
  height:50,
  width:50,
  marginTop:10,
};

const AppBaravatarstyle={
  backgroundSize:'cover',
  height:50,
  width:50,
}

const style1={
  marginTop:0,
};

const iconstyle={
  verticalAlign:'center',
};

const style={
  textAlign: 'center',
};

const listtext={
  textAlign:'left',
};

const imgstyle={
  height:'auto',
  width:'auto',
};

var ProfileHero = React.createClass({
  getInitialState: function () {
    return({open: false});
  },

  // static get contextTypes() {
  //   return {
  //     router: React.PropTypes.object
  //   }
  // }

  contextTypes :{
    router : React.PropTypes.object
  },

  handleToggle: function () {
    this.setState({open: !this.state.open});
  },

  handleClose: function () {
    this.setState({open: false});
  },
  handleTouchTap: function() {
    alert('You are Redirected to Dashboard');
  },

  handleRecentTouch : function(){
    event.preventDefault();
    this.context.router.push('/recent');
  },

  handleDashboard : function(){
    event.preventDefault();
    this.context.router.push('/dashboard');
  },

  handleProfile : function(){
    event.preventDefault();
    this.context.router.push('/recent');
  },

  handleTopics : function(){
    event.preventDefault();
    this.context.router.push('/alltopics');
  },

  handleTournaments : function(){
    event.preventDefault();
    this.context.router.push('/alltopics');
  },

  handleLogout : function(){
    event.preventDefault();

    var token = {token : cookie.load('auth_cookie')}

    $.ajax({
      type : 'POST',
      data :  JSON.stringify(token),
      contentType : 'application/json',
      url : baseURL + 'api/Logout',
      success: (function(data) {
        if(data['success'] == true){
            this.context.router.push('/login');

        }

      }).bind(this)
    });
  },

  render: function() {
    return (
      <div>

      <AppBar
        title={<span>QuizRT</span>}
        onTitleTouchTap={this.handleTouchTap}
        onLeftIconButtonTouchTap={this.handleToggle}
        iconElementRight={
          <div style={iconstyle}>
            <Avatar src="img/user_avatar/photo.jpg" style={AppBaravatarstyle}/>
          </div>
          }
      />


        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >

          <MenuItem onTouchTap={this.handleClose} style={style}>
          <div><Avatar src="img/user_avatar/photo.jpg" style={avatarstyle}/></div>
          Display Name</MenuItem>
          <MenuItem onTouchTap={this.handleClose} style={style}> RANK: 21#</MenuItem>
          <Divider />
          <List>
            <ListItem primaryText="DASHBOARD" leftIcon={<ActionHome />} style={listtext}
              onTouchTap={this.handleDashboard.bind(this)}/>
            <ListItem primaryText="VIEW PROFILE" leftIcon={<ActionAccountbox />} style={listtext}
              onTouchTap={this.handleProfile.bind(this)}/>
            <ListItem primaryText="RECENT ACTIVITY" leftIcon={<ImageBurstmode />} style={listtext}
              onTouchTap={this.handleRecentTouch.bind(this)}/>
            <ListItem primaryText="TOPICS" leftIcon={<ActionViewmodule />} style={listtext}
              onTouchTap={this.handleTopics.bind(this)}/>
            <ListItem primaryText="TOURNAMENTS" leftIcon={<ActionViewquilt />} style={listtext}
              onTouchTap={this.handleTournaments.bind(this)}/>
            <ListItem primaryText="LOGOUT" leftIcon={<ActionPowersettingsnew />} style={listtext}
              onTouchTap={this.handleLogout.bind(this)} />
          </List>
        </Drawer>
      </div>
    );
  }
});

export default ProfileHero;
