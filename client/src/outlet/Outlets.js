import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';

function OutLets() {
  return (
    <div>
      <Navbar/>
      <Outlet/>
    </div>
  )
}

export default OutLets;