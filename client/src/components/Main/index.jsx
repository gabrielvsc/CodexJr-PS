import styles from './styles.module.css';

const Main = () => {
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };

    return (
        <div className={styles.main_container}>
            <nav className={styles.navbar} >
                <div className={styles.user_photo}></div>
                <button className={styles.white_btn} onClick={handleLogout}>
                    <span className={styles.logout_icon}></span>
                </button>
            </nav>
        </div>
    )
};


export default Main;