import {Link, useLocation, useHistory} from "react-router-dom";
import Logo from '../Images/logohere.png'


function UserCard({item}){
    const history= useHistory();
    
    const route = () => {
        history.push({
            pathname: '/User',
            id: item.id
        })
    } 
    return (
        <div
           onClick = {route}
            className={"card-margin align-left is-row is-card"}
        >
            <div className="is-50">
                <div className="image-container">
                    <img className="card-logo" src={Logo} alt="Logo" />
                </div>
            </div>
            <div className="is-50">
                <h3>{item.firstName} - {item.lastName}</h3>
            </div>
        </div>
    );
}

export default UserCard
