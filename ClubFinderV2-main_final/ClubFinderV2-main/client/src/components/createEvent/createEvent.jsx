import React, { useContext, useState, useEffect } from 'react';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; 

import axios from "axios";
import { AuthContext } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom";

import './createEvent.scss';
import { makeRequest } from '../../axios';


const CreateEvent = () => {
    const [inputs, setInputs] = useState({
        club_id:"",
        event_name:"",
        max_attendee:"",
        event_date: new Date(),
        location:"",
        img:"",
    });

    const [ clubs, setClubs ] = useState([]);
    const [ err, setError ] = useState(null);
    const {currentUser} = useContext(AuthContext);
    const [ file, setFile ] = useState(null);

    const upload = async () => {
        try {
            const formData = new FormData(); 
            formData.append("file", file);
            const res = await makeRequest.post("/upload", formData);
            return res.data;
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (currentUser) {
            axios.get("http://localhost:8800/api/clubs?currentUser.id=", { withCredentials: true })
                .then(response => setClubs(response.data))
                .catch(error => setError("Failed to fetch clubs"));
        }
    }, [currentUser]);

    const handleChange = (e) => {
        setInputs(prev => ({...prev, [e.target.name]: e.target.value})) 
    };

    const handleDateChange = (date) => {
        setInputs(inputs => ({ ...inputs, event_date: date }));
    };

    const handleDiscard = () => {
        setInputs({ club: '', name: '',  location: '', image: null });
    };

    const handleClick = async (e) => {
        e.preventDefault();
    
        if (file) {
            try {
                const imgUrl = await upload();
                if (imgUrl) {
                    const payload = {
                        ...inputs,
                        img: imgUrl, 
                    };

                    try {
                        await axios.post("http://localhost:8800/api/events/", payload, { withCredentials: true });
                        navigate("/");
                    } catch (postError) {
                        setError(postError.response.data);
                    }
                } else {
                    setError("Failed to upload image.");
                }
            } catch (uploadError) {
                console.error("Upload failed:", uploadError);
                setError(uploadError.message || "Failed to upload image.");
            }
        } else {
            try {
                await axios.post("http://localhost:8800/api/events/", inputs, { withCredentials: true });
                navigate("/");
            } catch (postError) {
                setError(postError.response.data);
            }
        }
    };

    console.log(inputs);
    
    const navigate = useNavigate();

    return (
        <div className="event-creator">
            <div className="outer-container-event">
                <h1>Create Event</h1>
                <div className="inner-container-event">
                    <form>
                        <div className='inputs'>
                            <select 
                                name="club_id"
                                value={inputs.club_id}
                                onChange={handleChange}
                            >
                                <option disabled hidden value="">
                                    Select Club
                                </option>
                                {clubs.map(club => (
                                    <option key={club.id} value={club.id}>
                                        {club.name}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="text"
                                name="event_name"
                                placeholder="Event Name"
                                onChange={handleChange}
                            />
                            <input 
                                type="number" 
                                name="max_attendee" 
                                placeholder="Max Attendees" 
                                onChange={handleChange} 
                                min="1"
                                max="90"
                            />
                            <DatePicker
                                selected={inputs.event_date}
                                onChange={handleDateChange}
                                name="event_date"
                                dateFormat="MMMM d, yyyy h:mm aa"
                                showTimeSelect
                            />
                            <input
                                type="text"
                                name="location"
                                placeholder="Location"
                                onChange={handleChange}
                            />
                            <input
                                type="file"
                                id="image"
                                name="image"
                                onChange={(e) => setFile(e.target.files[0])}
                                className="choose-image"
                            />
                            
                            <label htmlFor="image" className="custom-button">Choose Event Image</label>

                            <div className="buttons">
                                <span> <button className="post" onClick={handleClick}> Create Event</button> </span>

                                <span> <button className="reset" onClick={handleDiscard}>Reset</button> </span>
                            </div>
                        </div>  
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateEvent;
