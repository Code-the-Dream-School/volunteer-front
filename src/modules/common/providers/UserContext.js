import React, { createContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

export const UserContext = createContext({})

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        token: ''
    })

    useEffect(() => {
        async function validateToken() {
            if (user.token) {
                try {
                    const token = localStorage.getItem('userToken')
                    const response = await axios.get(
                        'http://localhost:3001/auth/validateToken',

                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                                'Content-Type': 'application/json'
                            }
                        }
                    )

                    if (response.data.user && setUser(response.data.user)) {
                        setUser(response.data.user)
                    }
                } catch (error) {
                    if (error.response.status === 401) {
                        logout()
                    }
                }
            }
        }
        validateToken()
    }, [])

    const logout = () => {
        setUser({
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            token: ''
        })
        localStorage.clear()
    }

    return (
        <UserContext.Provider value={{ user, setUser, logout }}>
            {children}
        </UserContext.Provider>
    )
}

UserProvider.propTypes = {
    children: PropTypes.object
}
