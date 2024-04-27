import "./category.scss";
import {Link } from "react-router-dom"; 


const Category = ({category}) => {
    return (
        <div className="category"> 
            <Link to={"/explore/" + category.link}>
                <button className="image-button">
                    <img src={"./upload/categories/"+category.image} alt=""/>
                    <div className="category-name">{category.name}</div>
                </button>
            </Link>

          
        </div>
    ); 
}; 

export default Category;