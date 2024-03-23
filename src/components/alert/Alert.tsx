import styles from './alert.module.css'
import { MdErrorOutline } from "react-icons/md"
import { GrStatusGood } from "react-icons/gr"

export type AlertProps = {
    severity: 'success' | 'info' | 'warning' | 'error',
    children: React.ReactNode
}

const Alert = ({ severity = 'success', children }: AlertProps) => {

    const getClassName = () => {
        switch(severity) {
        case'success':
            return styles.success
        case 'error':
            return styles.error
            default:
                return styles.success
        }
    }

    const renderIconUI = () => {
        switch(severity) {
        case'success':
            return <GrStatusGood className={styles.icon} />
        case 'error':
            return <MdErrorOutline className={styles.icon}  />
            default:
                return <MdErrorOutline className={styles.icon}  />
        }
    }

    return (
        <section className={`${styles.container} ${getClassName()}`}>
            { renderIconUI() }
            {children}
        </section>
    );
};

export default Alert;
