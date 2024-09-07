import React from 'react'
import { Outlet } from 'react-router';
import Navbar from '../layout/navbar';
import Utils from '../helper/utils';

const auth = () => {

    function validate() {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.pathname = '/login';
        }
    }

    validate();

    return (
        <React.Fragment>
            <Navbar />

            <Outlet />
        </React.Fragment>
    )
}

export default auth;