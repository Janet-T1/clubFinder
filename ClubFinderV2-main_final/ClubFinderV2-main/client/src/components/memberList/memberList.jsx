import Member from "../member/Member"; 
import "./memberList.scss";

import { useLocation, Link } from "react-router-dom";
import { useQuery, userQueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";


const MemberList = ({clubId}) => {

    const { isLoading, error, data } = useQuery(["members", clubId], () =>
        makeRequest.get(`/members/${clubId}`).then((res) => {
            return res.data;
        })
    );

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div> Error: {error.message}</div>;

    return <div className="memberList">
        {data.map(member =>(
            <Member member={member} key={member.id}/>
        ))}

    </div>
}; 

export default MemberList; 