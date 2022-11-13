
import { Link, useNavigate } from 'react-router-dom'; 
import { useState } from 'react';
import axios from 'axios';

import styles from './styles.module.css';

const Signup = () => {
    const[data, setData] = useState ({
        fullName: "",
        gender: "",
        age: "",
        email: "",
        password: ""
    });

    const [ error, setError ] = useState("");
    const navigate = useNavigate();

    const handleChange = ({ currentTarget: input }) => {
        setData({...data, [input.name]:input.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:8080/api/users";
            const {data: res} = await axios.post(url, data)
            navigate("/login")
            console.log(res.message);

        } catch(error) {
            if(error.response && error.response.status >= 400 && error.response.status <= 500)
            {
                setError(error.response.data.message)
            }
        }
    }
 
    return (
        <div className={styles.signup_container}>
            <div className={styles.signup_form_container}>
                <form className={styles.form_container} onSubmit={handleSubmit}>
                    <h1>Create Account</h1>
                    <input
                        type='text'
                        placeholder='Full Name'
                        name='fullName'
                        onChange={handleChange}
                        value={data.fullName}
                        required
                        className={styles.input}
                    />
                    <input
                        type='text'
                        placeholder='Gender'
                        name='gender'
                        onChange={handleChange}
                        value={data.gender}
                        required
                        className={styles.input}
                    />
                    <input
                        type='number'
                        placeholder='Age'
                        name='age'
                        onChange={handleChange}
                        value={data.age}
                        required
                        className={styles.input}
                    />
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
                        Sign Up
                    </button>

                    <p>Have already an Account? 
                        <Link to="/login">
                            <a className='link'>Login Here</a>
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
};

export default Signup;