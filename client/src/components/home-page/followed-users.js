import { useEffect } from "react";

function FollowedUsers() {

    let test = () => {
        console.log('fetching home')
        fetch('/home/followed-users')
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
    }

    useEffect(() => {
        console.log('asdfasdfa')
        test()
    }, []);

    return (
        <div className="home-container">
        </div>
    );
}
export default FollowedUsers;