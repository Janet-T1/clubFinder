import "./member.scss";

const Member = ({member}) => {
    return (
        <div className="member"> 
                <div className="member-slot">
                    <div className= "imgProfile"><
                        img src={"http://localhost:3000/upload/" + member.user_profile_image} alt=""/> 
                    </div>
                    <span className="userName">{member.name}</span>

                    <button className= "Remove">
                        Remove
                    </button>

                </div>
      
        </div>
    ); 
}; 

export default Member;