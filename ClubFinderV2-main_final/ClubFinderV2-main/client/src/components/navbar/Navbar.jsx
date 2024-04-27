import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


import "./navbar.scss";
import HouseOutlinedIcon from '@mui/icons-material/HouseOutlined';
import PersonIcon from '@mui/icons-material/Person';


const Navbar = () => {

    const { currentUser } = useContext(AuthContext);
    return (
        <div className="navbar">
            <div className="left">
                <div className="Logo">
                    <Link to="/" style={{textDecoration:"none"}}>
                        <span > ClubFinder.<HouseOutlinedIcon/> </span>
                    </Link>
                </div>
                
                <div className="search">
                    <input type="text" placeholder="Search"/>
                </div>
            </div>
            <div className="right">
                <div className="Logout">
                    <Link to="/login">
                        <p> Logout </p>
                    </Link>
                </div>
                <PersonIcon />
                <div className="user">
                    <img 
                        src={currentUser.profilePicture}
                        alt=""
                    />
                    <span>{currentUser.name}</span>
                </div>
            </div>
        </div>
    )
}

export default Navbar;