import "./userFriends.css";

const UserFriends = ({user}) => {
  return (
    <div className="rightbarFollowing">
        <img 
        src={user.profilePicture}
        className="followingImg"
        alt="avatar" />
        <span className="followingName">{user.username}</span>
    </div>
  )
}

export default UserFriends
