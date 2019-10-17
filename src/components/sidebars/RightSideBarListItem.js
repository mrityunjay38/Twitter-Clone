import React from "react";

class RightSideBarListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div>
        <div key={this.props.user.userId} className="user">
              <div className="user-name">
                  <h4>{this.props.user.name}</h4>
                </div>
                <div className="follow-button " onClick={this.props.toggleFollow.bind(this, this.props.user)}>
                  {this.props.user.isFollowing ? (<p className="follow" style={this.props.user.style}>Unfollow</p>): (<p className="follow" style={this.props.user.style}>Follow</p>)}
                </div>
        </div>
        <hr/>
     </div>
    );
  }
}

export default RightSideBarListItem;