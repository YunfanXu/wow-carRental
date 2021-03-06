
import React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import UserDropdown from './UserDropdown';
import { removeToken, removeUser } from '../utils/user';

export const Navigation = ({ handleLoginClick, handleJoinClick }) => {
  const handleLoginButton = () => {
    handleLoginClick();
  };

  const handleJoinButton = () => {
    handleJoinClick();
  }

  const [userInfo, setUserInfo] = React.useState(null);

  React.useEffect(() => {
    let info = localStorage.getItem('user_info');
    if (info) {
      setUserInfo(JSON.parse(info))
    }
  }, [localStorage.getItem('user_info')])

  const renderLoginBox = () => {
    return (
      <>
        <li>
          <div onClick={handleLoginButton}  className='loginicon'>
            Log in
          </div>
        </li>
        <li>
          <div onClick={handleJoinButton} className='loginicon'>
            Join
          </div>
        </li>
      </>
    )
  }

  const handleLogout = () => {
    setUserInfo(null);
    removeToken();
    removeUser();
  }

  const renderUserBox = () => {
    return (
      <>
        <li>
          <UserDropdown userName={userInfo.fname} handleLogout={handleLogout}/>
        </li>
      </>
    )
  }
  return (
    <nav id='menu' className='navbar navbar-default navbar-fixed-top' style={{margin: 0}}>
      <div className='container'>
        <div className='navbar-header'>
          <button
            type='button'
            className='navbar-toggle collapsed'
            data-toggle='collapse'
            data-target='#bs-example-navbar-collapse-1'
          >
            {' '}
            <span className='sr-only'>Toggle navigation</span>{' '}
            <span className='icon-bar'></span>{' '}
            <span className='icon-bar'></span>{' '}
            <span className='icon-bar'></span>{' '}
          </button>
          <a className='navbar-brand page-scroll' href='#page-top'>
            XZZ CAR RENTALS
          </a>{' '}
        </div>

        <div
          className='collapse navbar-collapse'
          id='bs-example-navbar-collapse-1'
        >
          <ul className='nav navbar-nav navbar-right'>
            <li>
              <a href='#features' className='page-scroll'>
                Cars
              </a>
            </li>
            <li>
              <a href='#about' className='page-scroll'>
                About
              </a>
            </li>
            {/* <li>
              <a href='#services' className='page-scroll'>
                Services
              </a>
            </li>
            <li>
              <a href='#portfolio' className='page-scroll'>
                Gallery
              </a>
            </li> */}
            <li>
              <a href='#testimonials' className='page-scroll'>
                Testimonials
              </a>
            </li>
            <li>
              <a href='#team' className='page-scroll'>
                Team
              </a>
            </li>
            <li>
              <a href='#contact' className='page-scroll'>
                Contact
              </a>
            </li>

            {userInfo ? renderUserBox() : renderLoginBox()}
          </ul>

        </div>
      </div>
    </nav>
  )
}
