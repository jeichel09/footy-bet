import React, { Component } from 'react';
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';

let Navigation = (Component) => ({ ...props }) => {
    return (
        <div className='layout flex flex-auto h-screen'>
            <Navbar />
            <div className='container'>
                <Sidebar />
                <div className='main-container'>
                    <Component { ...props } />
                </div>
            </div>
        </div>
    );
}

export default Navigation