import React from 'react';
import './Profile.css';
import Header from '../../components/header/Header';

const Profile = () => {
  return (
    <>
    <Header /> {}
    <main className='bg-wo-image'>
      <section className='profile-flex-container'>
        <div className='user-container'>
          <div className='user-avatar-container'>
            <img className='profile-user-avatar'></img>
            <p className='profile-user-fullname a'>Lorem ipsum</p>
          </div>
          <div className='profile-user-reviews-container profile-w-bg'>
            <p className='profile-user-reviews-title a'>Ваши отзывы</p>
          </div>
        </div>
        <div className='user-edit-data-container profile-w-bg'>
          <p className='profile-field-name a'>Логин</p>
          <></>
        </div>
        <div className='user-history-container profile-w-bg'>

        </div>
      </section>
    </main>
    </>
  );
};

export default Profile;