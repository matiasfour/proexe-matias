import React, { useState } from 'react'
import { connect } from 'react-redux';
import  { useNavigate } from 'react-router-dom'
import Modal from '../Modal/Modal';
import './list.css'

const List = ({ users }) => {

  const navigate = useNavigate();  
  const [selectedId, setSelectedId] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const openModal = (id) => {
      setSelectedId(id);
      setIsVisible(true);
  }

  const closeModal = () => {
      setSelectedId(null);
      setIsVisible(false)
  }

  return (
    <div className='table'>
        <div style={{display: isVisible ? 'block' : 'none' }}>
            <Modal closeModal={closeModal} id={selectedId} />
        </div>
        <div className='table-header orange'>
            <div className='th'>
                <span>Id</span>
            </div>
            <div className='th'>
                <span>Name</span>
            </div>
            <div className='th'>
                <span>Username</span>
            </div>
            <div className='th'>
                <span>City</span>
            </div>
            <div className='th'>
                <span>Email</span>
            </div>
            <div className='th'>
                <span>Edit</span>
            </div>
            <div className='th'>
                <span>Delete</span>
            </div>
        </div>
        {
            users.users.length > 0 
            && users.users.map(user => (
                <div className='row'>
                    <div className='data-cell'>
                        {user?.id}
                    </div>
                    <div className='data-cell'>
                        {user?.name}
                    </div>
                    <div className='data-cell'>
                        {user?.username}
                    </div>
                    <div className='data-cell'>
                        {user?.address?.city}
                    </div>
                    <div className='data-cell'>
                        {user?.email}
                    </div>
                    <div className='data-cell'>
                        <button onClick={() => navigate(`/editUser/${user.id}`)} className='btn orange'>Edit</button>
                    </div>
                    <div className='data-cell'>
                        <button className='btn red' onClick={() => openModal(user.id)} >Delete</button>
                    </div>
                </div> 
            )) 
        }
        {
            users.users.length === 0 && (<p style={{padding: 20}}>No currents users, add new ones</p> )
                
            
        }
    </div>
  )
}

const mapStateToProps = state => {
    return {
        users: state.users,
    }
}


export default connect(mapStateToProps)(List);