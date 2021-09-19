import React from 'react'
import logohere from '../Images/logohere.png'
import { useHistory} from "react-router-dom";



function TopMenu(){
    const history = useHistory();

    function sendChange(value){
        let username = value;
        //console.log(value)
        history.push({
            pathname: '/',
            name: value || ""
        })
}
    return (
        <div className="top-menu is-shadow-2">
            <div className="menu-logo-container">
                <img className="menu-logo" src={logohere} alt="Logo" />
            </div>
            <div>
                <input
                    className="search-field"
                    placeholder="Search here...."
                    type="search"
                    name="name"
                    autoComplete="off"
                    onChange = {(e)=>sendChange(e.target.value)}
                />
            </div>
        </div>
    );
}

export default TopMenu;