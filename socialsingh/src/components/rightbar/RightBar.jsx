import Online from "../online/Online";
import { Users } from "../../dummydata";
import "./rightbar.css"
import UserFriends from "../userfriends/UserFriends";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const RightBar = ({ user }) => {
  const HomeRIghtbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img
            src="https://png.pngtree.com/png-vector/20190521/ourlarge/pngtree-cake-birthday-white-background-png-image_1052995.jpg"
            alt=""
            className="birthdayImg" />
          <span className="birthdayText">
            <b>jobanpreet singh</b> and <b>3 other friends</b> have a birthday today
          </span>
        </div>
        <img
          src="https://cdn.britannica.com/53/176353-050-5B854179/Harmandir-Sahib-Amritsar-Punjab-India.jpg"
          alt=""
          className="rightbarAd" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {
            Users.map((user) => (
              <Online key={user.id} user={user} />
            ))
          }

        </ul>
      </>
    )
  }

  const ProfileRightbar = () => {
    return (
      <>
        <h4 className="rightbarTitle">User Information</h4>
        <div className="rightbarInfo">
          <div className="infoItem">
            <span className="infoKey">City:</span>
            <span className="infoValue">Lohian khas</span>
          </div>
          <div className="infoItem">
            <span className="infoKey">From:</span>
            <span className="infoValue">Punjab</span>
          </div>
          <div className="infoItem">
            <span className="infoKey">Relationship:</span>
            <span className="infoValue">Single</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User Friends</h4>
        <div className="rightbarFollowings">
          {
            Users.map(user=>(
              <UserFriends key={user.id} user={user} />
            ))
          }
        </div>
      </>
    )
  }
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRIghtbar />}
      </div>
    </div>
  )
}

export default RightBar
