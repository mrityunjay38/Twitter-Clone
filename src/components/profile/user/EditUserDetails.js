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

        const user = fire.auth().currentUser;

        console.log('Ashish');

        const userDetails = {
            profilePhotoURL: this.state.photoURL,
            headerPhotoURL: this.state.headerPhotoURL,
            bio: this.state.bio
        }

        console.log(userDetails);

        if(this.state.photo || this.state.headerPhoto) {
            console.log('Ashish');

            if(this.state.photo) {
            console.log('Ashish');

                const storageRef = file.ref('uploads/' + this.state.user.userId + '/profile/' + this.state.photo.name);
                // const profilePhotoRef = storageRef.ref(this.state.photo.name);
                storageRef.put(this.state.photo).then(snap => {
                    console.log(snap);
                    snap.ref.getDownloadURL().then(url => {
                        userDetails.profilePhotoURL = url;

                        user.updateProfile({
                            photoURL: userDetails.profilePhotoURL
                        });

                        db.collection('users').doc(this.state.user.userId).update(userDetails);
                        console.log(url);
                    })
                })
            } 
            
            if(this.state.headerPhoto) {
            console.log('Ashish');

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
            console.log(userDetails);
            db.collection('users').doc(this.state.user.userId).update(userDetails);
        }

        console.log('Success, ', user);
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
                                <div className="edit-page-svg-container svg-container">
                                    <svg viewBox="0 0 24 24" class="r-jwli3a r-4qtqp9 r-yyyyoo r-1q142lx r-50lct3 r-dnmrzs r-bnwqim r-1plcrui r-lrvibr"><g><path d="M19.708 22H4.292C3.028 22 2 20.972 2 19.708V7.375C2 6.11 3.028 5.083 4.292 5.083h2.146C7.633 3.17 9.722 2 12 2c2.277 0 4.367 1.17 5.562 3.083h2.146C20.972 5.083 22 6.11 22 7.375v12.333C22 20.972 20.972 22 19.708 22zM4.292 6.583c-.437 0-.792.355-.792.792v12.333c0 .437.355.792.792.792h15.416c.437 0 .792-.355.792-.792V7.375c0-.437-.355-.792-.792-.792h-2.45c-.317.05-.632-.095-.782-.382-.88-1.665-2.594-2.7-4.476-2.7-1.883 0-3.598 1.035-4.476 2.702-.16.302-.502.46-.833.38H4.293z"></path><path d="M12 8.167c-2.68 0-4.86 2.18-4.86 4.86s2.18 4.86 4.86 4.86 4.86-2.18 4.86-4.86-2.18-4.86-4.86-4.86zm2 5.583h-1.25V15c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-1.25H10c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h1.25V11c0-.414.336-.75.75-.75s.75.336.75.75v1.25H14c.414 0 .75.336.75.75s-.336.75-.75.75z"></path></g></svg>
                                </div>
                            <img src={this.state.headerPhotoURL} alt="HeaderPhoto"/>
                        </div>
              
                        <div className="edit-page-profile-image">
                            <input
                                onChange={this.handleProfilePhotoChange}
                                type="file"
                                name="imgUpload" />
                                <div className="edit-page-svg-container svg-container">
                                    <svg viewBox="0 0 24 24" class="r-jwli3a r-4qtqp9 r-yyyyoo r-1q142lx r-50lct3 r-dnmrzs r-bnwqim r-1plcrui r-lrvibr"><g><path d="M19.708 22H4.292C3.028 22 2 20.972 2 19.708V7.375C2 6.11 3.028 5.083 4.292 5.083h2.146C7.633 3.17 9.722 2 12 2c2.277 0 4.367 1.17 5.562 3.083h2.146C20.972 5.083 22 6.11 22 7.375v12.333C22 20.972 20.972 22 19.708 22zM4.292 6.583c-.437 0-.792.355-.792.792v12.333c0 .437.355.792.792.792h15.416c.437 0 .792-.355.792-.792V7.375c0-.437-.355-.792-.792-.792h-2.45c-.317.05-.632-.095-.782-.382-.88-1.665-2.594-2.7-4.476-2.7-1.883 0-3.598 1.035-4.476 2.702-.16.302-.502.46-.833.38H4.293z"></path><path d="M12 8.167c-2.68 0-4.86 2.18-4.86 4.86s2.18 4.86 4.86 4.86 4.86-2.18 4.86-4.86-2.18-4.86-4.86-4.86zm2 5.583h-1.25V15c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-1.25H10c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h1.25V11c0-.414.336-.75.75-.75s.75.336.75.75v1.25H14c.414 0 .75.336.75.75s-.336.75-.75.75z"></path></g></svg>
                                </div>
                            <img src={this.state.photoURL} alt="ProfilePhoto"/>
                        </div>

                        <h1 style={{
                            margin: 0,
                            position: 'relative',
                            top: '-2rem',
                            paddingLeft: '1rem',
                            font: 'bold 1.2rem/1rem helvetica'
                        }}>{this.state.name}</h1>

                        <div className="edit-page-bio-textarea">
                            <label htmlFor="bio" style={{ paddingBottom: '0.3rem' }}>Bio</label>
                            <textarea value={this.state.bio} onChange={this.handelChange} name="bio" placeholder="Add Your Bio." />
                        </div>

                    </SettingsProfileModal>
                </div>
            )
        }
}

export default EditUserDetails
