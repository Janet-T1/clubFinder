import React, { useContext, useState, useEffect } from 'react';
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom";

import './createClub.scss';
import { makeRequest } from '../../axios';

const CreateClub = () => {
  
  const [inputs, setInputs] = useState({
    club_category:"",
    club_name:"",
    description:"",
    max_members:"",
    img:""
  });

  const [ categories, setCategories ] = useState([]);
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
        axios.get("http://localhost:8800/api/categories")
            .then(response => setCategories(response.data))
            .catch(error => setError("Failed to fetch categories"));
    }, []);

    console.log(categories);


  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs(prev => ({...prev, [e.target.name]: e.target.value})) 
  }
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
                  await axios.post("http://localhost:8800/api/clubs/", payload, { withCredentials: true });
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
            await axios.post("http://localhost:8800/api/clubs/", inputs, { withCredentials: true });
            navigate("/");
        } catch (postError) {
            setError(postError.response.data);
        }
    }
  }
  console.log(inputs)

  return (
    <div className="club-creator">
        <div className="outer-container-club">
            <h1>Create Club</h1>
            <div className="inner-container-club">
                <form>
                    <div className="inputs-club"> 
                        <select 
                            name="club_category"
                            value={inputs.club_category}
                            onChange={handleChange}
                        >
                            <option disabled hidden value="">
                              Select Category
                            </option>
                            {categories.map(category => (
                              <option key={category.id} value={category.id}>
                                {category.name}
                              </option>
                            ))}
                        </select>
                        
                        <input
                            type="text"
                            name="club_name"
                            placeholder="Club Name"
                            onChange={handleChange}
                        />

                        <textarea
                            type="text"
                            name="description"
                            placeholder="Club Description"
                            onChange={handleChange}
                        ></textarea>

                        <input
                            type="number"
                            name="max_members"
                            placeholder="Maximum Participants (MAX : 90)"
                            onChange={handleChange} 
                            min="1"
                            max="90"
                        />

                        <input
                            type="file"
                            id='image'
                            name="image"
                            onChange={(e) => setFile(e.target.files[0])}
                            className="choose-image"
                        />
                        
                        
                        <label htmlFor="image" className="custom-button">Choose Club Image</label>

                        <div className="buttons-club">
                          <span> <button className="post" type="submit" onClick={handleClick}> Create Club </button></span>

                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  );
};

export default CreateClub;