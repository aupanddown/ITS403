import React from 'react';
import logo from './logo.svg';
import './App.css';

var firebase = require("firebase");

var firebaseConfig = {
  apiKey: "AIzaSyBRDVymyzqY8Bkn_aTXslonDd0QnHrOevM",
  authDomain: "lecture-12-96d82.firebaseapp.com",
  databaseURL: "https://lecture-12-96d82.firebaseio.com",
  projectId: "lecture-12-96d82",
  storageBucket: "lecture-12-96d82.appspot.com",
  messagingSenderId: "161542841429",
  appId: "1:161542841429:web:9a12f62644e476c062a0dc",
  measurementId: "G-34Q18EVEZP"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

class SignupForm extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      passwordOne: '',
      passwordTwo: '',
      error: null,
    }
  }

  onSubmit = event => {
    const { username, email, passwordOne } = this.state;

    firebase.auth().createUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        firebase.database().ref('users/'+ authUser.user.uid)
          .set({
            username,
            email,
          });
          this.setState({
            username: '',
            email: '',
            passwordOne: '',
            passwordTwo: '',
            error: null,
          });
          console.log(authUser);
          this.props.toggleSignupOff();
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {  
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
        />
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />
        <button disabled={isInvalid} type="submit" class="signup">
          Sign Up
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

class SigninForm extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: null,
    };
    this.handleSignupLinkClicked = this.handleSignupLinkClicked.bind(this);
  }

  onSubmit = event => {
    const { email, password } = this.state;

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({
          email: '',
          password: '',
          error: null,
          signedin: true
        });
        this.props.toggleSignedIn();
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault(); // prevent following the url (undefined) after clicking submit
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSignupLinkClicked = event => {
    this.props.toggleSignupOn();
    event.preventDefault();
  }

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <button disabled={isInvalid} type="submit" class="signin">
          Sign In
        </button>

        {error && <p>{error.message}</p>}
        <a href='' onClick={this.handleSignupLinkClicked}>Don't have an account?</a>
      </form>
    );
  }
}

function PrivatePage(props) {
  return (
    <div>
      <p>Please signout</p>
    <form>
    <button type = "button" class = "signout" onClick = {()=>{props.toggleSignedOut()}}> 
    Signout
    </button>
    </form>
    </div>
  )
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signedin: false,
      showsignup: false
    };
    this.toggleSignupOn = this.toggleSignupOn.bind(this);
    this.toggleSignupOff = this.toggleSignupOff.bind(this);
    this.toggleSignedIn = this.toggleSignedIn.bind(this);
    this.toggleSignedOut = this.toggleSignedOut.bind(this);
  }

  toggleSignupOn() {
    this.setState({showsignup:true})
  }

  toggleSignupOff() {
    this.setState({showsignup:false})
  }

  toggleSignedIn() {
    this.setState({signedin:true})
  }

  toggleSignedOut(){
    firebase.auth().signOut().then(result=>{
      this.setState({signedin:false});
    }).catch(error=>{
        this.setState({error});
    });
  }
  componentDidUpdate(){
    this.listenForAuthChange();
  }

  listenForAuthChange() {
    firebase.auth().onAuthStateChanged((user) => {
      console.log("auth changed");
      if (user)
        console.log('User details', user);
      else
        console.log("no one is signed in ");
    });
  }

  render() {
    if (this.state.signedin === false){
      if (this.state.showsignup)
        return <SignupForm toggleSignupOff={this.toggleSignupOff}/>
      else  {
        return <SigninForm toggleSignupOn={this.toggleSignupOn} toggleSignedIn={this.toggleSignedIn}/>
      }
    }
    else{
      return <PrivatePage toggleSignedOut = {this.toggleSignedOut}/>
    }
  }
  
}
