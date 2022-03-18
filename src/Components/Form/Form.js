import React, { useState, useEffect } from 'react'
import { addUser, editUser } from  '../../redux'
import { useNavigate, useParams } from "react-router-dom";
import { connect } from 'react-redux';
import './form.css'

const Form = ({ addUser, loading, editUser, mode, users }) => {
  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [username, setUsername] = useState('');
  const [emailError, setEmailError] = useState('');
  const [fieldsEmpty, setFieldsEmpty] = useState('');
  const navigate = useNavigate();
  let params = useParams();

  const submitUser = (e) => {  
    e.preventDefault();

    //validations
    if(name === "" || email === "" || username === "" ||  city === ""){
        setFieldsEmpty("Please fill all fields")
        return
    }
    if(validateEmail() === false) {
        setEmailError('invalid email format, should be example@gmail.com')
        return;
    }

    const user = {
        id: users.length + 1,
        name,
        email,
        username,
        address: { city }
    }

    addUser(user)
    navigate('/')
  }

  const handleEditUser = (e) => {

    e.preventDefault();

    //validations
    if(name === "" || email === "" || username === "" ||  city === ""){
        return setFieldsEmpty("Please fill all fields")
    }

    if(validateEmail() === false) {
        setEmailError('invalid email format, should be example@gmail.com')
        return;
    }

    const user = {
        id: parseInt(params.id),
        name,
        email,
        username,
        address: { city }
    }

    editUser(user);
    
    navigate('/')
  }

  const fillForm = () => {
    const id = parseInt(params.id);
    const userData = users.find(user => user.id === id);
    console.log("this is user data " + userData.name);
    if(userData){
        setName(userData.name);
        setEmail(userData.email);
        setCity(userData.address.city);
        setUsername(userData.username);
    }
    console.log(users)
  }

 const validateEmail = () => {
    const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
    const result = pattern.test(email);
    if(result===true){
        return true
    } else{
        return false
    }
  }

  useEffect(() => {
      if(mode === "edit"){
            fillForm();
      }
  }, []);



  return (
    <div className='form-container'>
        <div className='form-title'>
            <h2> {mode === "add" ? "Add new user" :  mode === "edit" ? `Edit user ${name}`: '' } </h2>
        </div>
        <form>
            <div className='form-input'>
                <label>Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}  />
            </div>
            <div className='form-input'>
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}  />
            </div>
            <div className='form-input'>
                <label>Username</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}  />
            </div>
            <div className='form-input'>
                <label>City</label>
                <input type="text" value={city} onChange={(e) => setCity(e.target.value)}  />
            </div>
            <div className='form-buttons' >
                <button onClick={() => navigate('/')} className='btn cancel' >Cancel</button>
                <button onClick={(e) => mode === "add" ? submitUser(e) : mode === "edit" ? handleEditUser(e) : null } 
                        type='submit' 
                        className='btn submit' 
                >
                    Submit
                </button>
            </div>
            <span>{ loading ? 'LOADING...' : ''  }</span>
            <p>{emailError}</p>
            <p>{fieldsEmpty}</p>
        </form>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
    return {
        addUser: (user) => dispatch(addUser(user)),
        editUser: (user) => dispatch(editUser(user)),
    }
}

const mapStateToProps = state => {
    return {
        loading: state.users.loading,
        error: state.users.error,
        users: state.users.users
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Form);