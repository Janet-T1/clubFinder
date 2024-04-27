import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useQuery, userQueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import { makeRequest } from "../../axios.js";

import moment from "moment";

import "./comments.scss";

const Comments = ({post_id}) => {

    const [content, setContent] = useState("");

    const {currentUser} = useContext(AuthContext)
    
    const { isLoading, error, data } = useQuery(["comments"], () =>
        makeRequest.get("/comments?post_id="+post_id).then((res) => {
            return res.data; 
        })
    );

    const queryClient = useQueryClient();

    const mutation = useMutation(
        (newComment) => {
            return makeRequest.post("/comments", newComment);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["comments"]);
            },
        }
    );

    const handleClick = async (e) => {
        e.preventDefault();
        mutation.mutate({ content, post_id });
        setContent("");
    }

    return (
        <div className="comments">
            <div className="write">
                <img src={currentUser.profilePicture} alt="" />
                <input type="text" placeholder="write a comment" value={content} onChange={(e) => setContent(e.target.value)} />
                <button onClick={handleClick}> Comment </button>
            </div>
            {isLoading
                ? "loading"
                : data.map((comment) => (
                    <div className="comment">
                        <img src={comment.user_profile_image} alt="" />
                        <div className="info">
                            <span>{comment.name}</span>
                            <p> {comment.content} </p>
                        </div>
                        <span className="date"> 
                            {moment(comment.time_created).fromNow()} 
                        </span>
                    </div>
                ))}
        </div>
    );
};

export default Comments;