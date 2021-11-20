import React, { useEffect, useState } from 'react';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import themes from './utils/themes';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import useToken from './hooks/useToken';
import { useCallback } from 'react';

const App = () => {
    const [theme, setTheme] = useState('');
    const { token, setToken } = useToken();
    console.log(token);

    const saveThemeInDB = useCallback((theme) => {
        try {
            const userToken = JSON.parse(localStorage.getItem('token'));
            const res = fetch('http://localhost:8080/api/user/setTheme', {
                method: 'POST',
                headers: new Headers({
                    'Authorization': `Bearer ${userToken.token}`,
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify({ theme })
            }).then(res => res.json());
            console.log(res);
        } catch (err) {
            console.log(err)
        }
    }, []);

    const getProfile = useCallback(async () => {
        try {
            const userToken = JSON.parse(localStorage.getItem('token'));
            const response = await fetch('http://localhost:8080/api/user/profile', {
                method: 'GET',
                headers: new Headers({
                    'Authorization': `Bearer ${userToken.token}`,
                    'Content-Type': 'application/json'
                }),
            }).then(res => res.json());
            setTheme(themes[response.theme]);
        } catch (err) {
            console.log(err)
        }
    }, []);

    useEffect(() => {
        getProfile();
    }, [getProfile]);


    const handleChange = (selectedTheme) => {
        if (selectedTheme && selectedTheme.value) {
            setTheme(themes[selectedTheme.value]);
        } else {
            setTheme(themes.default);
        }
        saveThemeInDB(selectedTheme.value)
    };

    const refCallback = (node) => {
        if (node) {
            theme &&
                Object.keys(theme).forEach((element) => {
                    node.style.setProperty(element, theme[element], 'important');
                    if (element === 'background-color' || element === 'background') {
                        // apply the same background mentioned for theme to the body of the website
                        document.body.style.background = theme[element];
                    }
                });
        }
    };

    return (
        <div ref={refCallback} className="main-section">
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Dashboard handleChange={handleChange} />} />
                    <Route path='/dashboard' element={<Dashboard handleChange={handleChange} />} />
                    <Route path='/login' element={<Login setToken={setToken} handleChange={handleChange} />} />
                    <Route path='/signup' element={<Signup />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;