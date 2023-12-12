
import React, { useState } from 'react';
import NavBar from '../components/navbar/NavBar';
import Footer from '../components/footer/Footer'
import axios from 'axios';

const AdminPanel = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  return (
    <>
    <NavBar/>
    <div>Hi admin!</div>

    <Footer />
    </>
  );
}

export default AdminPanel;
