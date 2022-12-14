import React, { useState, useContext } from 'react'
import styles from '../styles/Login.module.css'
import ClipLoader from 'react-spinners/ClipLoader'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { homePath } from '../../home/routes/HomeRoute'
import { UserContext } from '../../common/providers/UserContext'

export const Login = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const { setUser } = useContext(UserContext)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        const data = new FormData(e.currentTarget)
        const email = data.get('email')
        const password = data.get('password')

        try {
            const response = await axios.post(
                //TODO: update url once backend is finished
                // eslint-disable-next-line no-undef
                `${process.env.REACT_APP_SERVICE_ENDPOINT}/auth/login`,
                { email, password }
            )

            if (response.data.user) {
                const user = {
                    firstName: response.data.user.firstName,
                    lastName: response.data.user.lastName,
                    username: response.data.user.username,
                    email: response.data.user.email,
                    token: response.data.user.token
                }
                setUser(user)
                navigate(homePath)
            }
        } catch (err) {
            setError('Login unsuccessful')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>
                <input
                    className={styles.input}
                    type="text"
                    name="email"
                    placeholder="Email"
                    required
                />
                <input
                    className={styles.input}
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                />

                {/* TODO: Properly display error message on page  */}
                {error && <span>{error}</span>}

                <button className={styles.loginButton} disabled={isLoading}>
                    {isLoading && (
                        <ClipLoader
                            color={'#ffff'}
                            size={20}
                            aria-label="Loading Spinner"
                        />
                    )}
                    <span>{isLoading ? 'Loading...' : 'Log In'}</span>
                </button>
            </form>

            {/*Insert ForgotPassword route here*/}
            <button className={styles.forgotPasswordButton}>
                Forgot password?
            </button>

            <span>{`Don't have an account?`}</span>
            <Link to="/registration" className={styles.registerButton}>
                Create new account
            </Link>
        </div>
    )
}
