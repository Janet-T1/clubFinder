import "./home.scss"
import Posts from "../../components/posts/Posts";
import Events from "../../components/events/Events";
import MemberList from "../../components/memberList/memberList";

const Home = () => {
    return (
        <div className="home">
           <Posts/>
        </div>
    );
}

export default Home;