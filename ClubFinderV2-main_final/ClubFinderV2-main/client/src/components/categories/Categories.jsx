import Category from "../category/Category"; 
import axios from "axios";
import React, { useState, useEffect } from "react";

const Categories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8800/api/categories'); // Adjust the URL based on your server
                setCategories(response.data);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="categories">
            {categories.map(category => (
                <Category key={category.name} category={category} />
            ))}
        </div>
    );
};

export default Categories;