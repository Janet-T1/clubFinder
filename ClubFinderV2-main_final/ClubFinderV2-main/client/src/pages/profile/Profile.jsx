import "./profile.scss";

import React, { useState, useContext, useEffect } from 'react';
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import { useQuery, userQueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";

import PlaceIcon from '@mui/icons-material/Place';
import CakeIcon from '@mui/icons-material/Cake'
import Edituser from '../../components/edituser/Edituser';
import ProfileClubs from "../../components/profileClubs/ProfileClubs";

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [ userInfo, setUserInfo ] = useState({});
    const [ error, setError ] = useState(null);
    const {currentUser } = useContext(AuthContext);

    const userId = useLocation().pathname.split("/")[2];

    useEffect(() => {
        axios.get(`http://localhost:8800/api/users/find/${userId}`)
            .then(response => setUserInfo(response.data[0]))
            .catch(error => setError("Failed to fetch user info"));
    }, [userId]);


    const userIdC = userInfo.id;

    console.log(userInfo);
    console.log(userIdC);

    return (
        <div className="user-profile">
            <div className="inner-container-clubProfile">
                <div className="user-Info">
                    <div className="images-profile">
                        <img src={`../upload/${userInfo.user_profile_image}`} alt="" className="cover" />
                    
                        <div className="[profile]-pic-div"> <img src={`../upload/${userInfo.user_cover_image}`} alt="" className="profilePic" /></div>

                        <div className="topRight">
                            <button className="editButton"> Edit </button>
                        </div>

                        <div className="left-bottom">
                            <div className="name">{userInfo.name}</div>
                            
                            <div className="subtitle">
                                <PlaceIcon /> {userInfo.location} 
                            </div>
                            <div className="subtitle">
                                <CakeIcon /> {userInfo.birthdate}
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className='seperate'></div>
                <div className="myClubsContainer">
                    <ProfileClubs userIdC={userIdC}/>
                </div>
            </div>     
        </div>





            
    )
}

export default Profile;