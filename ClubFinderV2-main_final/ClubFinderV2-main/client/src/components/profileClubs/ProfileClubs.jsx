import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Club from "../club/Club";
import "./profileClubs.scss";

const ProfileClubs = ({ userIdC }) => {
    const [clubs, setClubs] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8800/api/clubs/user/${userIdC}`)
            .then(response => {
                setClubs(response.data);
            })
            .catch(error => {
                console.error("Failed to fetch clubs:", error);
                setError("Failed to fetch clubs");
            });
    }, [userIdC]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    clubs.image = "."+clubs.image;

    return (
        <div className="profile-clubs">
            {clubs.map(club => (
                <Club key={club.id} club={club} />
            ))}
        </div>
    );
};

export default ProfileClubs;
