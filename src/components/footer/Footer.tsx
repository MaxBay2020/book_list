import styles from './footer.module.css'

const Footer = () => {
    return (
        <footer className={styles.container}>
            Copyright &copy; Max Wong - {new Date().getFullYear()}
        </footer>
    );
};

export default Footer;
