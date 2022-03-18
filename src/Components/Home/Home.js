import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from  '../../redux'
import Dashboard from '../Dashboard/Dashboard';

const Home = ({ users, fetchUsers }) => {

    useEffect(() => {
        if(users.length === 0){
            //console.log("se reejecuto")
            fetchUsers()
        }
    }, [])
    
     return (
         <div className="home">
             <Dashboard/>
         </div>
     )
   
}

const mapStateToProps = state => {
    return {
        users: state.users.users,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchUsers: () => dispatch(fetchUsers()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
