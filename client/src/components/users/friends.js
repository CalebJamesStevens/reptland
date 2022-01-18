import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";

function Friends () {
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const [friendsList, setFriendsList] = useState()
    const [friendRequestsList, setFriendRequestsList] = useState()


    const fetchUserFriends = async () => {
        if (!currentUser) return;
        console.log('fetching friends')
        await setFriendRequestsList(new Array())
        await setFriendsList(new Array())
        await fetch(`/users/${currentUser?._id}/info?friends=true&friendRequests=true`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                data.friendRequests.forEach(requester => {
                    setFriendRequestsList(current => [...current, (
                        <div>
                            <div>
                                Request from: {requester?.username}
                            </div>
                            <form action={`/users/${requester?.username}/accept-friend-request`} method="POST">
                                <input type='hidden' name='userID' value={requester?._id}/>
                                <input type='hidden' name='accepted' value={'true'}/>
                                <input type='submit' value={'Accept Request'}/>
                            </form>
                            <form action={`/users/${requester?.username}/accept-friend-request`} method="POST">
                                <input type='hidden' name='userID' value={requester?._id}/>
                                <input type='hidden' name='accepted' value={'false'}/>
                                <input type='submit' value={'Deny Request'}/>
                            </form> 
                        </div>
                    )])
                });
                data.friends.forEach(friend => {
                    setFriendsList(current => [...current, (
                        <div className="container-3">
                            {friend?.username}
                        </div>
                    )])
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
            <div className="user-friends-container">
                {friendsList}
            </div>
            <div className="friend-requests-container">
                {friendRequestsList}
            </div>
        </div>
    )

} 

export default Friends;