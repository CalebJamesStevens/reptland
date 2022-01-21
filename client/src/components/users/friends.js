import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import ProfileIcon from "../icons/profile-icon";

function Friends () {
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const [friendsList, setFriendsList] = useState()
    const [friendRequestsList, setFriendRequestsList] = useState()


    const fetchUserFriends = async () => {
        if (!currentUser) return;
        console.log('fetching friends')
        await setFriendRequestsList(new Array())
        await setFriendsList(new Array())
        await fetch(`/api/users/${currentUser?._id}/info?friends=true&friendRequests=true`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                data.friendRequests.forEach(requester => {
                    setFriendRequestsList(current => [...current, requester])
                });
                data.friends.forEach(friend => {
                    setFriendsList(current => [...current, friend])
                });
            })
    }

    useEffect(() => {
        if (friendsList && friendRequestsList) return;
        fetchUserFriends()
    }, [currentUser])

    useEffect(() => {
        
    }, [friendsList, friendRequestsList])

    return (
        <div className="user-friends-page-container">
            <div className="user-friends-container container-3">
                {friendsList?.map(friend => {
                    return (
                    <div className="friend-item container-3">
                        <div className="friend-profile-picture"><ProfileIcon/></div>
                        {friend?.username}
                    </div>
                    )
                })}
                <div className="friend-item container-3">
                        <div className="friend-profile-picture"><ProfileIcon/></div>
                        {'friend?.username'}
                </div>
                <div className="friend-item container-3">
                    <div className="friend-profile-picture"><ProfileIcon/></div>
                    {'friend?.username'}
                </div>
            </div>
            <div className="friend-requests-container container-3">
                <div className="header-1">Friend Requests</div>
                {friendRequestsList?.map(requester => {
                    return (
                    <div className="friend-request-item container-3">
                        <div className="friend-request-pfp">
                            <ProfileIcon/>
                        </div>
                        <div>
                            <div>
                                {requester?.username} wants to be your friend!
                            </div>
                            <div className="friend-request-options">
                                <form action={`/users/${requester?.username}/accept-friend-request`} method="POST">
                                    <input type='hidden' name='userID' value={requester?._id}/>
                                    <input type='hidden' name='accepted' value={'true'}/>
                                    <input className='button-style-1' type='submit' value={'Accept'}/>
                                </form>
                                <form action={`/users/${requester?.username}/accept-friend-request`} method="POST">
                                    <input type='hidden' name='userID' value={requester?._id}/>
                                    <input type='hidden' name='accepted' value={'false'}/>
                                    <input className='button-style-1' type='submit' value={'Deny'}/>
                                </form> 
                            </div>
                        </div>
                    </div>
                    )
                })}
            </div>
        </div>
    )

} 

export default Friends;