import "./events.scss";
import Event from "../event/Event"; 
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import React, { useContext, useState, useEffect } from 'react';

const Events = () => {
   
    const [events, setEvents] = useState([]);
    const {currentUser} = useContext(AuthContext);
    const [ err, setError ] = useState(null);

    useEffect(() => {
        if (currentUser) {
            axios.get("http://localhost:8800/api/events/my?currentUser.id=", { withCredentials: true })
                .then(response => setEvents(response.data))
                .catch(error => setError("Failed to fetch clubs"));
        }
    }, [currentUser]);

    console.log(events);

    return (    
        <div className="events">
                {events.map(event =>(
                    <Event event={event} key={event.event_id}/>
                ))}
        </div>

    );
}; 

export default Events;




