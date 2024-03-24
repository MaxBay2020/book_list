'use client'
import styles from './page.module.css'
import {useRouter} from "next/navigation";

const HomePage = () => {

    const router = useRouter()

    const gotoBooksPage = () => {
        router.push('/books')
    }

  return (
      <section className={styles.container}>
          <p >
              home page
          </p>
          <button className={styles.gotoButton} onClick={() => gotoBooksPage()}>
              Go to book list page
          </button>

      </section>
  );
};

export default HomePage;
