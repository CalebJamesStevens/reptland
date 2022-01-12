import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CommunityIcon from "../icons/community-icon";

function UsersSidebar () {
    const [users, setUsers] = useState(new Array());
    const [usersHtml, setUsersHtml] = useState();
    const navigate = useNavigate();

    const getRandomUsers = () => {
        fetch('/users/getrandom')
            .then(res => res.json())
            .then(data => {
                console.log(data[0])
                setUsers(current => [...current, data[0]])
            })
    }

    const createUsersList = () => {
        setUsersHtml(users.map((user) => {
            return (
                <>
                    <div className='clickable' onClick={() => navigate(`/users/${user.username}/profile`)}>
                        {user.username}
                    </div>
                </>
            )
        }))
        
    }

    useEffect (() => {
        for (let i = 0; i < 5; i++) {
            getRandomUsers();
        }
    }, []);

    useEffect (() => {
        createUsersList();
    }, [users])

    return(
        <div className="users-sidebar-container sidebar-container">
            <div className="sidebar-component-title">Explore new people!</div>
            <div className="sidebar-component-body">
                {usersHtml && usersHtml}
            </div>
        </div>
    );

}

export default UsersSidebar;