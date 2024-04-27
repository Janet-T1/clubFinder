import "./post.scss";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBlankIcon from '@mui/icons-material/FavoriteBorder'
import FaceIcon from '@mui/icons-material/Face';
import TextsmsIcon from '@mui/icons-material/Textsms';

import { Link } from "react-router-dom";
import { useQuery, userQueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import { makeRequest } from "../../axios";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";

import moment from "moment";

import Comments from "../comments/Comments"

const Post = ({post}) => {

    const [commentOpen, setCommentOpen] = useState(false);

    const {currentUser} = useContext(AuthContext);

    const { isLoading, error, data } = useQuery(["likes", post.id], () =>
      makeRequest.get("/likes?post_id=" + post.id).then((res) => {
        return res.data;
      })
    );

    const queryClient = useQueryClient();

    const mutation = useMutation(
        (liked) => {
            if (liked) return makeRequest.delete("/likes?post_id=" + post.id);
            return makeRequest.post("/likes", { post_id: post.id });
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["likes"]);
            },
        }
    );

    const handleLike = () => {
        mutation.mutate(data.includes(currentUser.id))
    }

    return (
        <div className="post"> 
            <div className="container">

                <div className="user">
                    <div className="userInfo">
                        <div className="details">
                            <img src={"http://localhost:3000/upload/" + post.user_profile_image} alt=""/>

                            <div className="header">
                                <Link to={`/profile/${post.username}`} style={{textdecoration:"none", color:"inherit"}}> 
                            {/* user id not username  */}
                                <span className="name"> {post.name} </span>
                                </Link>
                                <span> posted on </span>
                                <Link to={`/clubProfile/${post.club_id}`} style={{textdecoration:"none", color:"inherit"}}>
                                <span className="clubName"> {post.club_name} </span>
                                </Link>

                            </div>

                        </div>
                        <span className="date"> {moment(post.time_created).fromNow()} </span>
                    </div>
                    <MoreHorizIcon/>
                </div>


                <div className="title">
                    <p>{post.title}</p>
                </div>
                <div className="content">
                    <p>{post.content}</p>
                    <img src={"./upload/"+post.img} alt="" />
                </div>
            
                <div className="info">
                    <div className="item">
                        {isLoading ? (
                            "loading"
                        ) : data.includes(currentUser.id) ? (
                            <FavoriteIcon onClick={handleLike}/>
                        ) : (
                            <FavoriteBlankIcon onClick={handleLike}/>
                        )}
                        {data?.length} members liked this

                    </div>
                    <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
                        <TextsmsIcon/>
                        Comments
                    </div>
                </div>
                {commentOpen && <Comments post_id={post.id}/>}
            </div>
        </div>
    )
};

export default Post;