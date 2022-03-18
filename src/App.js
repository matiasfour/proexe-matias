import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home';
import Form from './Components/Form/Form';

function App() {
  return (
    <Provider store={store}>
        <div className="App">  
            <h1>Dashboard</h1>
            <Router>
              <Routes>
                  <Route exact path="/" element={<Home/>}/>
                  <Route exact path="/addUser" element={<Form mode="add" />}/>
                  <Route exact path='/editUser/:id' element={<Form mode="edit" />} />
              </Routes>
            </Router> 
        </div>
    </Provider>
  );
}

export default App;
