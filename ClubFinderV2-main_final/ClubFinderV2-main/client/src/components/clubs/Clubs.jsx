import Club from "../club/Club"; 
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import React, { useContext, useState, useEffect } from 'react';

const Clubs = ( {category_id}) => {
    const [clubs, setClubs] = useState([]);
    const {currentUser} = useContext(AuthContext);
    const [ err, setError ] = useState(null);

    useEffect(() => {
        if (currentUser) {
            axios.get("http://localhost:8800/api/clubs?currentUser.id=", { withCredentials: true })
                .then(response => setClubs(response.data))
                .catch(error => setError("Failed to fetch clubs"));
        }
    }, [currentUser, category_id]);

    return (
        <div className="clubs">
            <div className="club-gallery">
                <div className="View-all-clubs">
                    {clubs.map(club =>(
                        <Club club={club} key={club.club_id}/>
                    ))}        
                </div>
            </div>
        </div>
    );
}; 

export default Clubs;