import React from 'react';
import Dropdown from './Dropdown';
import useToken from '../hooks/useToken';
import { useNavigate } from 'react-router-dom';

const Header = (props) => {
    const { handleChange } = props;
    const navigate = useNavigate();
    const { token, setToken } = useToken();

    const logout = () => {
        localStorage.removeItem('token');
        handleChange({ value: "" });
        navigate("/login");
    };

    return (
        <header>
            <Dropdown handleChange={handleChange} />
            {token && <div className="loginBtn"><a onClick={logout} href="javascript:;">Logout</a></div>}
        </header>
    );
};

export default Header;