'use client'
import styles from './navbar.module.css'
import Link from "next/link";
import {navLinks} from "@/data";
import {usePathname} from "next/navigation";
import Image from 'next/image'

const Navbar = () => {
    const pathname = usePathname()

    return (
        <nav className={styles.container}>
            <ul className={styles.nav}>
                <li className={styles.logo}>
                    <Image
                        src='https://www.blazesoft.ca/wp-content/themes/blazesoft/images/logo.svg'
                        width={140}
                        height={140}
                        alt='logo'
                    />
                </li>
                {
                    navLinks.map(link => (
                        <li key={link.name}>
                            <Link href={link.path}>
                                {link.name}
                                {
                                    pathname === link.path
                                        &&
                                    <p className={styles.underscore} />
                                }
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </nav>
    );
};

export default Navbar;
