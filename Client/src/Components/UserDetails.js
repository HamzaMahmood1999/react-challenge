import React from 'react';
import {NetworkStatus, useQuery, gql} from "@apollo/client";
import {useLocation} from "react-router-dom";

const USER_DETAIL = gql`
query($id: Int!){
    getAllUsers(id: $id) {
      id
      firstName
      lastName
      email
      password
    }
}
`;

function UserDetails(props){
    const location = useLocation()
    //Pass the id to the Query to fetch details of the related Album
    const id = location.id
    console.log(props)
    //console.log(id)

    const{data, loading, error, networkStatus} = useQuery(USER_DETAIL,{
        variables: {id},
        fetchPolicy: 'cache-and-network',
        notifyOnNetworkStatusChange: true,
    })

    if (networkStatus === NetworkStatus.refetch)
        return 'Refetching!';
    if (loading)
        return 'Loading...';
    if (error) {
        return `Error! ${error}`;
    }
    if (data) {
        return (
            <div className={"is-detail-Page"}>
                <div className="album-detailsHead align-left is-row is-card"
                     style={{display: 'flex', flexFlow: 'column'}}>
                    <div className="is-row">
                        <div className="is-100">
                            <h3>{data['getAllUsers'][0].firstName}</h3>
                        </div>
                    </div>
                </div>
                <div className="album-detailsBody is-card">
                    <div className="album-outline-container">
                        <div className="album-outline">
                        <table style={{width: '100%'}}>
                            <tr>
                                <td>First Name: </td>
                                <td><p>{data['getAllUsers'][0].firstName}</p></td>
                            </tr>
                            <tr>
                                <td>Last Name: </td>
                                <td><p>{data['getAllUsers'][0].lastName}</p></td>
                            </tr>
                            <tr>
                                <td>Email: </td>
                                <td><p>{data['getAllUsers'][0].email}</p></td>
                            </tr>
                            <tr>
                                <td>Password</td>
                                <td><p>{data['getAllUsers'][0].password}</p></td>
                            </tr>
                        <tbody>
                        </tbody>

                        </table>                            
                        </div>
                    </div>
                </div>
            </div>
        );


    }


}

export default UserDetails;