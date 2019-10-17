import React from "react";
import "../../css/following.css";

class UserFollowingItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div >
        <div key={this.props.user.userId} className="user-list">
              <div className="user-name">
                  <h3>{this.props.user.follower_name}</h3>
                </div>
                <div className="follow-button " onClick={this.props.toggleFollow.bind(this, this.props.user,this.props.users)}>
                  {this.props.user.isFollowing ? (<p className="follow">Unfollow</p>): (<p className="follow">Follow</p>)}
                </div>
        </div>
        <hr/>
     </div>
    );
  }
}

export default UserFollowingItem;