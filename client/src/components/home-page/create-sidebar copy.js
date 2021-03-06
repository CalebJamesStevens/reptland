import { Navigate, useNavigate } from "react-router-dom";
import DropdownIcon from "../icons/dropdown-icon";

function CreateSidebar () {
    const navigate = useNavigate();

    return(
        <div className="create-sidebar-container sidebar-container">
            <div className="sidebar-component-title">Create!</div>
            <div className="sidebar-component-body">
                <div onClick={() => navigate(`/posts/new-post`)} className="clickable hover-style-1 button-style-1 button">Create Post</div>
                <div onClick={() => navigate(`/communities/new-community`)} className="clickable hover-style-1 button-style-1 button">Create Community</div>
            </div>
        </div>
    );

}

export default CreateSidebar;