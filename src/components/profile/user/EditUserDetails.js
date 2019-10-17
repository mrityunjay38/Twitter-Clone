import React, { Component } from 'react'
import UserProfileWithTweets from '../UserProfileWithTweets'
import SettingsProfileModal from './SettingsProfileModal'

export class EditUserDetails extends Component {
    
    state = {
        show: true,
        headerPhotoURL: 'https://wallpapercave.com/wp/LtttNC6.jpg',
        headerPhoto: {},
        photo: {},
        photoURL: 'https://51chq46p2eu3z0o231w2i5ow-wpengine.netdna-ssl.com/wp-content/uploads/2016/05/photo-1453574503519-1ae2536262ec-700x467.jpeg',
        displayName: 'Ashish padhi'
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

        render() {

            // const { name, username, CreatedAt, Followers, Following, userPhoto } = this.props
    
            return (
                <div>
                    {/* <UserProfileWithTweets /> */}

                    <SettingsProfileModal
                        show={this.state.show}
                        handleClose={this.hideModal}
                    >
                    <div>
                    <input
                onChange={this.handleHeaderPhotoChange}
                type="file"
                name="imgUpload" />
                        <img src={this.state.headerPhotoURL} alt="HeaderPhoto" style={{ width: '10rem' }}/>
                    </div>
              <div>
                <input
                onChange={this.handleProfilePhotoChange}
                type="file"
                name="imgUpload" />
                        <img src={this.state.photoURL} alt="ProfilePhoto" style={{ width: '10rem' }}/>

              </div>

                
                

                    </SettingsProfileModal>
                </div>
            )
        }
}

export default EditUserDetails
