import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import fire from '../../firebaseConfig/config';
// import { storage } from '../../firebaseConfig/config'

class Signup extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handlePhotoChange = this.handlePhotoChange.bind(this);
    // this.UploadImage = this.UploadImage.bind(this);
    this.signup = this.signup.bind(this);
    this.state = {
        email: '',
        password: '',
        username: '',
        name: '',
        UserPhoto: null,
        UserPhotoURL: ''
    };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handlePhotoChange(e) {
    if(e.target.files[0]) {
      const UserPhoto = e.target.files[0];
      this.setState(() => ({UserPhoto}));
    }
    // this.setState({ UserPhoto: URL.createObjectURL(e.target.files[0]) });
// this.setState({ UserPhoto: photo })
    // console.log()
  }

  // UploadImage(e) {
  //   const { UserPhoto } = this.state;

  //   var metadata = {
  //     contentType: 'image/jpeg'
  //   };

  //   const uploadTask = fire.storage().ref().child(`UserProfilePic/${UserPhoto.name}`).put(UserPhoto + metadata);
  //   uploadTask.on('state_changed', (snapshot) => {
  //     var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //     console.log('Upload is ' + progress + '% done');
  //     switch (snapshot.state) {
  //       case fire.storage.TaskState.PAUSED: // or 'paused'
  //         console.log('Upload is paused');
  //         break;
  //       case fire.storage.TaskState.RUNNING: // or 'running'
  //         console.log('Upload is running');
  //         break;
  //     }
  //   }, (error) => {
  //     console.log(error);
  //   }, () => {
  //     uploadTask.snapshot.ref.getDownloadURL().then(url => {
  //       this.setState({ UserPhotoURL: url })
  //     })
  //   })
  // }


  signup(e){
    e.preventDefault();

    fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{

      // const { UserPhoto } = this.state;
  
      // const uploadTask = fire.storage().ref().child(`UserProfilePic/${UserPhoto.name}`).put(UserPhoto);
      // uploadTask.on('state_changed', (snapshot) => {
      //   var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      //   console.log('Upload is ' + progress + '% done');
      //   switch (snapshot.state) {
      //     case 'paused': // or 'paused'
      //       console.log('Upload is paused');
      //       break;
      //     case 'running': // or 'running'
      //       console.log('Upload is running');
      //       break;
      //   }
      // }, (error) => {
      //   console.log(error);
      // }, () => {
      //   uploadTask.snapshot.ref.getDownloadURL().then(url => {
      //     this.setState({ UserPhotoURL: url })
      //   })
      // })

        fire.auth().onAuthStateChanged(user => {

          user.updateProfile({
            displayName: this.state.name   
          }).then(function() {
            console.log('successfully Updated profile')
          }, function(error) {
            console.log(error)
          })

        this.state.signup = {
              userId: user.uid,
              name: this.state.name,
              email:this.state.email,
              photo:''
              };
          
          const data = {
              ...this.state.signup
           };
      fire.firestore().collection("users")
            .doc(user.uid.toString())
            .set(data)
            .then(() => {
        window.location = "/login"

            })
        })
        this.setState({errorMessage : "Successfully Registered"})
        console.log("Successfully Registered");
    }).catch((error) => {
        this.setState({errorMessage : error.message})
      })
  }
  render() {
    return (
      <div className="col-md-6">
        <form>
        <div class="form-group">
            <label for="FirstName">Name</label>
            <input  value={this.state.name} onChange={this.handleChange} type="text" name="name" class="form-control" id="name" aria-describedby="nameHelp" placeholder="Enter name" />
          </div>
          <div class="form-group">
            <label for="Email">Username</label>
            <input  value={this.state.username} onChange={this.handleChange} type="text" name="username" class="form-control" id="username" aria-describedby="username" placeholder="Enter username" />
          </div>
          <div class="form-group">
            <label for="Email">Email address</label>
            <input  value={this.state.email} onChange={this.handleChange} type="email" name="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
          </div>
          <div class="form-group">
            <label for="Password">Password</label>
            <input  value={this.state.password} onChange={this.handleChange} type="password" name="password" class="form-control" id="password" placeholder="Password" />
          </div>
          <input type="file" onChange={this.handlePhotoChange}/><button onClick={this.UploadImage}>Upload</button>
          <button onClick={this.signup} style={{marginLeft: '25px'}} className="btn btn-success">Signup</button>
          <p>{this.state.errorMessage}</p>
        </form>
      
      </div>
    );
  }
}
export default Signup;