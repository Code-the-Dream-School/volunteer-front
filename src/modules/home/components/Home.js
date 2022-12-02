import React, { useContext } from 'react'
import { Postings } from './Postings'
import { LoginButton } from './LoginButton'
import { RegisterButton } from './RegisterButton'
import styles from '../styles/Home.module.css'
import { UserContext } from '../../common/providers/UserContext'

export const Home = () => {
    const { user } = useContext(UserContext)

    return (
        <div>
            <div className={styles.homeHeader}>
                <div className={styles.homeButtons}>
                    {/* TODO: Render Logout Button instead of null */}
                    {user.token ? null : (
                        <>
                            <LoginButton /> <RegisterButton />
                        </>
                    )}
                </div>
            </div>
            <Postings />
        </div>
    )
}
