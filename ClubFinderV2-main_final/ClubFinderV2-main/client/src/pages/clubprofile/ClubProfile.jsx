import React, { useState, useEffect, useContext } from 'react';
import "./clubProfile.scss";

import { format } from "date-fns";

import { useLocation, Link } from "react-router-dom";
import { useQuery, userQueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";

import axios from "axios"

import ClubPosts from "../../components/clubposts/ClubPosts"
import Events from "../../components/events/Events";
import Posts from "../../components/posts/Posts";
import MemberList from "../../components/memberList/memberList";
import ImageGallery from '../../components/imageGallery/imageGallery';

const ClubProfile = () => {
    const [showEvents, setShowEvents] = useState(true);
    const [showPosts, setShowPosts] = useState(false);
    const [showImageGallery, setShowImageGallery] = useState(false);
    const [joinedClub, setJoinedClub] = useState(false); // Track whether the user has joined the club or not
    const [buttonClicked, setButtonClicked] = useState(false); // Track whether the button has been clicked or not
    
    const [ error, setError ] = useState(null);
    const {currentUser} = useContext(AuthContext);
    const [ clubInfo, setClubInfo ] = useState({});

    const clubId = parseInt(useLocation().pathname.split("/")[2]);

    useEffect(() => {
        axios.get(`http://localhost:8800/api/clubs/find/${clubId}`)
            .then(response => setClubInfo(response.data[0]))
            .catch(error => setError("Failed to fetch club info"));
    }, [clubId]);


    console.log(clubId);
    console.log(clubInfo)

    const handleEventsClick = () => {
        setShowEvents(true);
        setShowPosts(false);
        setShowImageGallery(false);
    };

    const handlePostsClick = () => {
        setShowEvents(false);
        setShowPosts(true);
        setShowImageGallery(false);
    };

    const handleImageGalleryClick = () => {
        setShowEvents(false);
        setShowPosts(false);
        setShowImageGallery(true);
    };

    const handleJoinClub = () => {
        // Toggle whether the user has joined the club
        setJoinedClub(prevJoinedClub => !prevJoinedClub);
        // Set button clicked to true
        setButtonClicked(true);
    };

    const formatDate = (dateString) => {
        if (!dateString) {
            return 'N/A';  // Return 'Not Available' if the date string is undefined or empty
        }
    
        const date = new Date(dateString);
        if (!isNaN(date.valueOf())) {
            return date.toISOString().split('T')[0];
        } else {
            return 'Invalid date';  // Return 'Invalid date' if the date string does not convert to a valid Date
        }
    }

    return (
        <div className="clubprofile">
            <div className="inner-container-clubProfile">
                <div className="images">
                    <img src={"../upload/"+clubInfo.image} alt="" className="cover" />
                    
                    <div className="text-container"> 
                        <div className="c1">{clubInfo.name}</div>
                        <div className="c2">{clubInfo.category_name}</div>
                        <div className="c3">Founded: {formatDate(clubInfo.date_created)}    </div>                    
                    </div>
                </div>

                <div className="components">
                    <div className="edit"> <button className="edit-button">Edit</button></div>
                   
                    <div className="outer-buttons">
                        <div className="buttons-clubProfile">
                            <span><button onClick={handleEventsClick}> View Club Events </button></span>
                            <span><button onClick={handlePostsClick}> View Posts </button></span>
                            <span><button onClick={handleImageGalleryClick}>Image Gallery</button></span>
                        </div>
                    </div>

                    <div className="show-component">
                        {showEvents && <Events />}
                        {showPosts && <ClubPosts clubId={clubId}/>}
                        {showImageGallery && <ImageGallery clubId={clubId} />}
                    </div>
                    
                    <div className="header"><h1>Club Members</h1></div>
                    
                    <MemberList clubId={clubId}/>

                    <div className="join-club">
                        {/* Toggle button color based on whether the button has been clicked */}
                        <button onClick={handleJoinClub} style={{ backgroundColor: buttonClicked ? 'rgb(113, 113, 113)' : '#514949' }}>{joinedClub ? "Joined club!" : "Join Club"}</button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ClubProfile;