import Task from '../Task';
import styles from './styles.module.css';
import { BiLogOut } from 'react-icons/bi';
import { FaUserCircle } from 'react-icons/fa'

const Main = () => {
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };

    return (
        <div className={styles.main_container}>
            <nav className={styles.navbar}>
                <div>
                    <FaUserCircle className={styles.user_photo}/>
                </div>
                
                <button className={styles.white_btn} onClick={handleLogout}>
                    <BiLogOut className={styles.logout_icon}/>
                </button>
            </nav>
            <div className={styles.task_container}>
                <Task/>
            </div>
        </div>
    )
};


export default Main;