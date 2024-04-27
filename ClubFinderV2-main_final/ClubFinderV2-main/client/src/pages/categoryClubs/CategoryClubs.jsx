
import  Clubs from "../../components/clubs/Clubs"; 
import { useParams } from "react-router-dom";

const CategoryClubs = () => {

    const { category_id } = useParams(); 
    return (
        <div className="clubs-container">
            <div className="div1">
                <Clubs category_id = {category_id}/>
            </div>
            
        </div>
    );
}
export default CategoryClubs;