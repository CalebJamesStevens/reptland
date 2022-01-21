import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";

function FriendRequestButton ({userID}) {
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const [friendList, setFriendList] = useState()
    const [isFriend, setIsFriend] = useState()
    const [hasRequested, setHasRequested] = useState()
    const [user, setUser] =  useState()
    const [formAction, setFormAction] = useState()
    const [formHtml, setFormHtml] = useState()

    const addFriendForm = (
        <>
            <form action={`/users/${user?.username}/request-friend`} method="POST">
                <input type='hidden' name='userID' value={user?._id}/>
                <input type='hidden' name='request' value={'add'}/>
                <input className='button-style-2' type='submit' value={'Add friend'}/>
            </form>
        </>
    )

    const removeFriendForm = (
        <>
            <form action={`/users/${user?.username}/request-friend`} method="POST">
                <input type='hidden' name='userID' value={user?._id}/>
                <input type='hidden' name='request' value={'remove'}/>
                <input className='button-style-2' type='submit' value={'Remove Friend'}/>
            </form>
        </>
    )

    const cancelRequestForm = (
        <>
            <form action={`/users/${user?.username}/request-friend`} method="POST">
                <input type='hidden' name='userID' value={user?._id}/>
                <input type='hidden' name='request' value={'cancel'}/>
                <input className='button-style-2' type='submit' value={'Cancel Request'}/>
            </form>
        </>
    )

    

    const fetchUser = () => {
        fetch(`/api/users/${userID}/info?id=true&username=true`)
            .then(res => res.json())
            .then(data => {
                setUser(data)
            })
    }

    const checkIfFriend = () => {
        if (currentUser?.friends.includes(user?._id)) {
            setIsFriend(true)
            setFormHtml(removeFriendForm)
        } else {
            setIsFriend(false)
            if (currentUser?.sentFriendRequests.includes(user?._id)) {
                setFormHtml(cancelRequestForm)
                setHasRequested(true)
            } else {
                setFormHtml(addFriendForm)
                setHasRequested(false)
            }
        }
    }

    useEffect(() => {
        if (user) return;
        fetchUser()
    },[])

    useEffect(() => {
        if (!user) return;
        if (user?._id == currentUser?._id) {

        } else {
            checkIfFriend()
        }
    },[user])


    return (
        <div className="friend-request-button-container">
            {formHtml}
        </div>
    )

}

export default FriendRequestButton