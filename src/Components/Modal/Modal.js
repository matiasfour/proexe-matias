import React from 'react'
import './modal.css'
import { connect } from 'react-redux';
import { removeUser } from  '../../redux'

const Modal = ({id, closeModal, removeUser, users}) => {

  const handleDeleteUser = () => {
        removeUser(id);
        closeModal();
  }

  return (
    <div className='modal'>
      <div class="modal-content">
        <span onClick={() => closeModal()} class="close">&times;</span>
        <p>Are you sure?</p>
        <button className='btn orange' onClick={() => handleDeleteUser()}>Yes</button>
        <button className='btn' onClick={() => closeModal()}>No</button>
      </div>
    </div>  
 
  )
}

const mapStateToProps = state => {
    return {
        users: state.users,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        removeUser: (id) => dispatch(removeUser(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);