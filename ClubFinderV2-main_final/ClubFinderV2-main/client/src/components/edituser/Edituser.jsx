import React, { useState, useContext } from 'react';
import { makeRequest } from "../../axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Typography } from '@mui/material';
import "./Edituser.scss";

const Edituser = ({ setIsEditing, user }) => {
    const [cover, setCover] = useState(null);
    const [profile, setProfile] = useState(null);
    const [formData, setFormData] = useState({
        email: user.email,
        password: user.password,
        name: user.name,
        location: user.location,
    });

    const upload = async (file) => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const rest = await makeRequest.post("/upload", formData);
            return rest.data;
        } catch (err) {
            console.log(err);
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const queryClient = useQueryClient();

    const mutation = useMutation(
        (user) => {
            return makeRequest.put("/users", user);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["posts"]);
            }
        }
    );

    const handleClick = async (e) => {
        e.preventDefault();
        let coverUrl = user.user_cover_image;
        let profileUrl = user.user_profile.image;
        coverUrl = cover ? await upload(cover) : user.coverPic;
        profileUrl = cover ? await upload(profile) : user.profilePic;
        
        mutation.mutate({ ...formData, coverPic: coverUrl, profilePic: profileUrl });
    };

    return (
        <Dialog>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogContent className="editUserForm">
                <TextField
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
                <TextField
                    label="Location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                />
                <Typography variant="subtitle1">Profile Picture</Typography>
                <input
                    accept="image/*"
                    type="file"
                    name="profilePicture"
                    onChange={handleChange}
                    style={{ margin: '10px 0' }}
                />
                
                <Typography variant="subtitle1">Banner Picture</Typography>
                <input
                    accept="image/*"
                    type="file"
                    name="bannerPicture"
                    onChange={handleChange}
                    style={{ margin: '10px 0' }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setIsEditing(false)}> Close </Button>
                <Button onClick={handleClick}> Update </Button>
            </DialogActions>
        </Dialog>
    );
};
export default Edituser;
