import styles from './modal.module.css'
import { IoMdClose } from "react-icons/io"

export type ModalProps = {
    show: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

const Modal = ({ show, onClose, children }: ModalProps) => {
    if (!show) return null;

    return (
        <main className={styles.container}>
            <div className={styles.modal}>
                <IoMdClose className={styles.closeButton} onClick={onClose} style={{alignSelf: 'flex-end'}}/>
                {children}
            </div>
        </main>
    );
};

export default Modal;
