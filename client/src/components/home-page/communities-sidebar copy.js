import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DropdownIcon from "../icons/dropdown-icon";

function CommunitiesSidebar () {
    const [communities, setCommunities] = useState(new Array());
    const [communitiesHtml, setCommunitiesHtml] = useState();
    const navigate = useNavigate();

    const getRandomCommunities = () => {
        fetch('/api/communities/getrandom')
            .then(res => res.json())
            .then(data => {
                if(!data[0]) return;
                setCommunities(current => [...current, data[0]])
            })
    }

    const createCommunityList = () => {
        setCommunitiesHtml(communities.map((community) => {
            return (
                <>
                    <div key={community._id} className='clickable' onClick={() => navigate(`/communities/view/${community.name}`)}>
                        {community.name}
                    </div>
                </>
            )
        }))
        
    }

    useEffect (() => {
        for (let i = 0; i < 5; i++) {
            getRandomCommunities();
        }
    }, []);

    useEffect (() => {
        createCommunityList();
    }, [communities])

    return(
        <div className="communities-sidebar-container sidebar-container">
            <div className="sidebar-component-title">Explore new communities!</div>
            <div className="sidebar-component-body">
                {communitiesHtml && communitiesHtml}
            </div>
        </div>
    );

}

export default CommunitiesSidebar;