import Post from "../post/Post";
import "./clubPosts.scss";
import { useQuery } from '@tanstack/react-query'
import { makeRequest } from "../../axios";


const ClubPosts = ({clubId}) => {
  
    const { isLoading, error, data } = useQuery(["clubposts", clubId], () =>
      makeRequest.get(`/clubposts/${clubId}`).then((res) => {
        return res.data;
      })
    );

  return (
    <div className="posts">
      {error 
        ? "Error loading posts" 
        : isLoading 
        ? "loading" 
        : data.map((post) => ( <Post post={post} key={post.id}/> ))
      }
  </div>
  );
};

export default ClubPosts;