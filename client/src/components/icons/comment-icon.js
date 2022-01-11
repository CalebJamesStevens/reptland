import {useContext, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

function CommentIcon() {
    const {currentUser, setCurrentUser} = useContext(UserContext);

    return (
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-message" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M4 21v-13a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-9l-4 4" />
            <line x1="8" y1="9" x2="16" y2="9" />
            <line x1="8" y1="13" x2="14" y2="13" />
        </svg>
    );
}

export default CommentIcon;
