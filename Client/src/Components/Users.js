import React, { useEffect, useState } from 'react';
import UserCard from './UserCard'
import { useQuery, gql, NetworkStatus } from '@apollo/client';
import {useLocation} from "react-router-dom";

const ALL_USERS = gql`
  query {
    getAllUsers {
      id
      firstName
      lastName
      email
      password
    }
  }
`;

function Users(){

    const location = useLocation()
    //const history = useHistory()
    const searchedName = location.name

    console.log(searchedName)

    const [users, setUsers] = useState([])
    //const [searchedName, setSearchName] = useState()
    //setSearchName(location.name)
    //Passing query to useQuery hook to fetch data
    const{data, loading, error, networkStatus} = useQuery(ALL_USERS, {fetchPolicy: "cache-and-network"})

    useEffect(() => {
        if (!loading && data?.getAllUsers?.length) {
                setUsers(data.getAllUsers);
        }
    }, [loading, data]);
    useEffect(()=>{
        if (searchedName!==undefined){
            setUsers(data.getAllUsers.filter(user => user.firstName.toLowerCase().includes(searchedName.toLowerCase())));      
        }
    },[searchedName])
    console.log(users)


    if (networkStatus === NetworkStatus['refetch'])
        return 'Refetching!';
    else if (loading)
        return 'Loading..';
    else if (error)
        return `Error! ${error}`;
    else if(data)
        //console.log(users)
        return(
            <div className="is-scrollable-list">
                {users.length > 0 ? users?.map((card) => (
                    <UserCard
                        key={card.id}
                        item={card}
                    />
                )) : 'Users list undefined...' }
            </div>
        )
}

export default Users;