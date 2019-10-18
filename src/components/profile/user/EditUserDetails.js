import React, { Component } from 'react'
import UserProfileWithTweets from '../UserProfileWithTweets'
import SettingsProfileModal from './SettingsProfileModal'
import fire from '../../../firebaseConfig/config'
import file from "../../../firebaseConfig/storage";
import db from '../../../firebaseConfig/db'

export class EditUserDetails extends Component {
    
    state = {
        show: true,
        headerPhotoURL: '',
        headerPhoto: {},
        photo: {},
        photoURL: '',
        displayName: '',
        bio: ''
    }

    async componentDidMount() {
        fire.auth().onAuthStateChanged(user => {
            let displayName = user.displayName.split('|');
        this.setState({ isSignedIn: !!user, userID: user.uid, name: displayName[0], path: '/' + displayName[1] })
        })

        await db.collection('users').where('username', '==', this.props.match.params.username ).get().then( snap => {
            snap.docs.forEach( doc => {
              console.log(doc.data())
              this.setState( { 
                  user: doc.data(), 
                  headerPhotoURL: doc.data().headerPhotoURL, 
                  photoURL: doc.data().profilePhotoURL,
                  bio: doc.data().bio,
                  displayName: doc.data().name 
                } );
            } )
          } )
    }

    hideModal = () => {
        this.setState({ show: false })
    }

    handleHeaderPhotoChange = e => {
        console.log(e.target.files[0]);
        this.setState({
          headerPhotoURL: URL.createObjectURL(e.target.files[0]),
          headerPhoto: e.target.files[0]
        });
      };

    handleProfilePhotoChange = e => {
        this.setState({
            photoURL: URL.createObjectURL(e.target.files[0]),
            photo: e.target.files[0]
          });
    }

    handelChange = (e) => {
        this.setState({ [e.target.name] : e.target.value })
    }

    settingUserDetail = (e) => {
        e.preventDefault();

        console.log('Ashish');

        const userDetails = {
            profilePhotoURL: this.state.photoURL,
            headerPhotoURL: this.state.headerPhotoURL,
            bio: this.state.bio
        }

        if(this.state.photo || this.state.headerPhoto) {

            if(this.state.photo) {
                const storageRef = file.ref('uploads/' + this.state.user.userId + '/profile/' + this.state.photo.name);
                // const profilePhotoRef = storageRef.ref(this.state.photo.name);
                storageRef.put(this.state.photo).then(snap => {
                    console.log(snap);
                    snap.ref.getDownloadURL().then(url => {
                        userDetails.profilePhotoURL = url;
                        db.collection('users').doc(this.state.user.userId).update(userDetails);
                        console.log(url);
                    })
                })
            } 
            
            if(this.state.headerPhoto) {
                const storageRef = file.ref('uploads/' + this.state.user.userId + '/profile/' + this.state.headerPhoto.name);
                storageRef.put(this.state.headerPhoto).then(snap => {
                    console.log(snap);
                    snap.ref.getDownloadURL().then(url => {
                        userDetails.headerPhotoURL = url;
                        db.collection('users').doc(this.state.user.userId).update(userDetails);

                        // userDetails.headerPhotoURL = url;
                        console.log(url);
                    })
                })
            }

        } else {
            db.collection('users').doc(this.state.user.userId).update(userDetails);
        }
    }

        render() {

            // const { name, username, CreatedAt, Followers, Following, userPhoto } = this.props
    
            return (
                <div>
                    {/* <UserProfileWithTweets /> */}

                    <SettingsProfileModal
                        show={this.state.show}
                        handleClose={this.hideModal}
                        changeUserDetail={this.settingUserDetail}
                        path={this.state.path}
                    >
                        <div className="edit-page-header-image">
                            <input
                                onChange={this.handleHeaderPhotoChange}
                                type="file"
                                name="imgUpload" />
                            <img src={this.state.headerPhotoURL} alt="HeaderPhoto"/>
                        </div>
              
                        <div className="edit-profile-profile-image">
                            <input
                                onChange={this.handleProfilePhotoChange}
                                type="file"
                                name="imgUpload" />
                            <img src={this.state.photoURL} alt="ProfilePhoto"/>
                        </div>

                        <h1 style={{
                            margin: 0,
                            position: 'relative',
                            top: '-3rem',
                            paddingLeft: '1rem'
                        }}>{this.state.name}</h1>

                        <div className="edit-profile-bio-textarea">
                            <label htmlFor="bio">Bio</label>
                            <textarea value={this.state.bio} onChange={this.handelChange} name="bio" placeholder="Add Your Bio." />
                        </div>

                    </SettingsProfileModal>
                </div>
            )
        }
}

export default EditUserDetails
