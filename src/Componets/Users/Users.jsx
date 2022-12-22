import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import './User.css';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [dataError, setDataError] = useState('');

    const fullName = user?.profile?.firstName + user?.profile?.lastName;
    const jobTitle = user?.jobTitle;
    const email = user?.profile?.email;
    const bio = user?.Bio;
    const userName = user?.profile?.username;

    const DfullName = users[0]?.profile?.firstName + users[0]?.profile?.lastName;
    const DjobTitle = users[0]?.jobTitle;
    const Demail = users[0]?.profile?.email;
    const Dbio = users[0]?.Bio;
    const DuserName = users[0]?.profile?.username;

    useEffect(() => {
        axios.get('https://602e7c2c4410730017c50b9d.mockapi.io/users')
            .then(data => {
                setUsers(data?.data);
                setIsLoading(false);
            })
            .catch(error => setDataError(error))

    }, []);

    const userDetails = (id) => {
        axios.get(`https://602e7c2c4410730017c50b9d.mockapi.io/users/${id}`)
            .then(data => {
                setUser(data?.data);
                setIsLoading(false);
            })
            .catch(error => setDataError(error))
    };
    // single user detils

    const selectedUsers = document.querySelectorAll('#bg');

    selectedUsers.forEach(user => {
        user.addEventListener('click', function () {
            selectedUsers.forEach(u => u.classList.remove('active'));
            this.classList.add('active')
        })
    })

    return (
        <>
            {
                dataError ?
                    <div className='min-vh-100 d-flex justify-content-center align-items-center'>
                        <p className='fs-2 text-center fw-bold'>No Data To Show</p>
                    </div>
                    :
                    <div className='min-vh-100'>
                        {
                            isLoading ?
                                <div className='min-vh-100 d-flex justify-content-center align-items-center'>
                                    <Spinner animation="grow" variant="primary" />
                                </div>
                                :
                                <Container className='d-lg-flex justify-content-evenly align-items-center min-vh-100 my-2' fluid={'lg'}>
                                    <div className='user-list'>
                                        <h3 className='text-center text-capitalize'>Users list</h3>
                                        <div className='main-list'>
                                            {
                                                users.map(user => <div key={user.id} className='user d-flex align-items-center' id='bg' onClick={() => userDetails(user?.id)}>
                                                    <img height={50} src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png" alt="user img" />
                                                    <p className='mb-0 ms-2 fw-bold'>{user?.profile?.firstName} {user?.profile?.lastName}</p>
                                                </div>)
                                            }
                                        </div>
                                    </div>
                                    <div className='user-details'>
                                        <h3 className='text-center text-capitalize mt-2'>User Details</h3>
                                        <div className='detaisl p-2'>
                                            <div className='text-center'>
                                                <img height={150} src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png" alt="user img" />
                                                <p className='fw-semibold'>{userName ? userName : DuserName}</p>
                                            </div>
                                            <textarea controlled='true' readOnly value={bio ? bio : Dbio} type="text" placeholder='Bio' />
                                            <label>
                                                <p className='mb-1'>Full Name</p>
                                                <input controlled='true' readOnly value={fullName ? fullName : DfullName} type="text" placeholder='Full Name' />
                                            </label>
                                            <label>
                                                <p className='mb-1'>Job Title</p>
                                                <input controlled='true' readOnly value={jobTitle ? jobTitle : DjobTitle} type="text" placeholder='Job Title' />
                                            </label>
                                            <label>
                                                <p className='mb-1'>Email</p>
                                                <input controlled='true' readOnly value={email ? email : Demail} type="email" placeholder='email' />
                                            </label>
                                        </div>
                                    </div>
                                </Container>
                        }
                    </div>
            }
        </>
    );
};

export default Users;