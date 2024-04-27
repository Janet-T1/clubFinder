import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import "./leftbar.scss";
import { Link } from 'react-router-dom';
import { 
    Home as HomeIcon,
    CalendarToday as CalendarIcon,
    Explore as ExploreIcon,
    People as PeopleIcon,
    AddCircle as AddCircleIcon
} from '@mui/icons-material';

import SensorDoorIcon from '@mui/icons-material/SensorDoor';

const Leftbar = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [ userInfo, setUserInfo ] = useState({});
    const [ error, setError ] = useState(null);
    const {currentUser } = useContext(AuthContext);

    useEffect(() => {
        axios.get(`http://localhost:8800/api/users/find/${currentUser.username}`)
            .then(response => setUserInfo(response.data[0]))
            .catch(error => setError("Failed to fetch user info"));
    }, []);

    console.log(currentUser.username)
    
    return (
        <div className="leftbar">
            <div className="container">
                <div className="menu">
                    <div className="user">
                        <img 
                            src={"../upload/"+currentUser.user_profile_image}
                            alt=""
                        />  
                        <span className="userName"> <Link to={`/profile/${currentUser.username}`} className="link-name"> Jin Song </Link> </span>
                    </div>
                    <hr/>
                    
                    <Link to="/" className="item">
                        <SensorDoorIcon />
                        <span> Home </span>
                    </Link>
                    <Link to="/explore" className="item">
                        <ExploreIcon/>
                        <span> Explore </span>
                    </Link>
                    <Link to="/myClubs" className="item" >
                        <HomeIcon/>
                        <span> My Clubs </span>
                    </Link>
                    <Link to="/myEvents" className="item">
                        <CalendarIcon/>
                        <span> My Events </span>
                    </Link>

                    
            
                    <hr/>
                    
                    <Link to="/createPost" className="item">
                        <AddCircleIcon/>
                        <span> Create Post </span>
                    </Link>
                    <Link to="/createEvent" className="item">
                        <AddCircleIcon/>
                        <span> Create Event </span>
                    </Link>
                    <Link to="/createClub" className="item">
                        <AddCircleIcon/>
                        <span> Create Club </span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Leftbar;
