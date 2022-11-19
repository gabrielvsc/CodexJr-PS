import { Link } from 'react-router-dom'; 
import { useState } from 'react';
import axios from 'axios';

import styles from './styles.module.css';

const Login = () => {
    const[data, setData] = useState ({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");

    const handleChange = ({ currentTarget: input }) => {
        setData({...data, [input.name]: input.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:8080/api/auth";
            const { data: res } = await axios.post(url, data);
            localStorage.setItem("token", JSON.stringify(res.data));
            window.location = "/"

        } catch(error) {
            if(error.response && error.response.status >= 400 && error.response.status <= 500)
            {
                setError(error.response.data.message)
            }
        }
    }
 
    return (
        <div className={styles.login_container}>
            <div className={styles.login_form_container}>
                <form className={styles.form_container} onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <input
                        type='email'
                        placeholder='E-mail'
                        name='email'
                        onChange={handleChange}
                        value={data.email}
                        required
                        className={styles.input}
                    />
                    <input
                        type='password'
                        placeholder='Password'
                        name='password'
                        onChange={handleChange}
                        value={data.password}
                        required
                        className={styles.input}
                    />
                    {error && <div className={styles.error_msg}>{error}</div>}
                    <button type='submit' className={styles.blue_btn}>
                        Sign In
                    </button>

                    <p>New Here?
                        <Link to="/signup">
                            <a className={styles.link}>Create your account here</a>
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
};

export default Login;