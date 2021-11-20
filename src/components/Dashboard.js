import React from 'react';
import Header from './Header';
import useToken from '../hooks/useToken';
import Login from './Login';

const Dashboard = (props) => {

    const { handleChange } = props;

    const { token, setToken } = useToken();

    if (!token) {
        return <Login setToken={setToken} />
    }

    return (
        <>
            <Header handleChange={handleChange} />
            <div className="content">
                <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium, ab
                    porro temporibus neque omnis dignissimos eveniet cupiditate iure nemo
                    quo et aperiam quibusdam provident quia corrupti animi ullam, ea
                    ratione?
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium, ab
                    porro temporibus neque omnis dignissimos eveniet cupiditate iure nemo
                    quo et aperiam quibusdam provident quia corrupti animi ullam, ea
                    ratione?
                </p>
                <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium, ab
                    porro temporibus neque omnis dignissimos eveniet cupiditate iure nemo
                    quo et aperiam quibusdam provident quia corrupti animi ullam, ea
                    ratione?
                </p>
                <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium, ab
                    porro temporibus neque omnis dignissimos eveniet cupiditate iure nemo
                    quo et aperiam quibusdam provident quia corrupti animi ullam, ea
                    ratione?
                </p>
            </div>
        </>
    );
};

export default Dashboard;