import React, { useContext, useState } from 'react'
import styles from '../styles/Apply.module.css'
import axios from 'axios'
import { LoadingSpinner } from '../../common/components/LoadingSpinner'
import { UserContext } from '../../common/providers/UserContext'
import { useNavigate, useParams } from 'react-router-dom'
import { applySuccessPath } from '../routes/ApplySuccessRoute'

export const Apply = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [isError, setIsError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { user } = useContext(UserContext)

    const handleSubmit = async (event) => {
        event.preventDefault()

        const formData = new FormData(event.target)
        const data = Object.fromEntries(formData)
        const applyData = {
            ...data,
            username: user.username,
            id: params.id
        }

        setIsError(false)
        setIsLoading(true)
        try {
            const response = await axios.post(
                'http://localhost:3001/post/apply',
                {
                    ...applyData
                },
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                        'Content-Type': 'application/json'
                    }
                }
            )
            if (response.data) {
                navigate(applySuccessPath)
            }
        } catch (error) {
            setIsError(true)
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    name="username"
                    className={styles.input}
                    type="text"
                    placeholder="Username"
                    required
                />

                <textarea
                    name="message"
                    className={styles.input}
                    type="text"
                    placeholder="Message"
                    required
                />

                <button
                    disabled={isLoading}
                    className={styles.submitButton}
                    type="submit"
                >
                    Submit Application
                </button>

                {isLoading && <LoadingSpinner loading={isLoading} />}

                {isError && (
                    <p className={styles.error}>
                        APPLICATION NOT SUBMITTED. Please try again.
                    </p>
                )}
            </form>
        </div>
    )
}