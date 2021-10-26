import React, { useState } from 'react'
import ErrorModal from '../UI/ErrorModal'
import Card from '../UI/Card'
import Button from '../UI/Button'

import styles from './AddUser.module.css'


const AddUser = props => {
    // Use state variables
    const [enteredUsername, setEnteredUsername] = useState('')
    const [enteredAge, setEnteredAge] = useState('')
    const [error, setError] = useState()

    const addUserHandler = (event) => {
        event.preventDefault()

        if ((enteredUsername.trim().length === 0) || (enteredAge.trim().length === 0)) {
            setError({
                title: 'Invalid input',
                message: 'Please enter a valid name and age (non-empty values).'
            })
            return;
        } else if (+enteredAge < 1) {
            setError({
                title: 'Invalid age',
                message: 'Please enter a valid age (it should be greater than 0).'
            })
            return;
        } else {
            const userData = {
                id: Math.random().toString(),
                name: enteredUsername,
                age: enteredAge
            }
            props.onAddUser(userData)
            console.log(userData)
            inputCleaner()
        }
    }

    const usernameChangeHandler = event => {
        const { value } = event.target
        setEnteredUsername(value)
    }

    const ageChangeHandler = event => {
        const { value } = event.target
        setEnteredAge(value)
    }

    // input cleaner function who is in charge to clean up the input fields
    const inputCleaner = () => {
        setEnteredUsername('')
        setEnteredAge('')
    }

    const errorHandler = () => {
        setError(null)
    }

    return (
        <div>
            {
                error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler} />
            }
            <Card className={styles.input}>
                <form onSubmit={addUserHandler}>
                    <label htmlFor='username'>User name</label>
                    <input
                        id='username'
                        type='text'
                        value={enteredUsername}
                        onChange={usernameChangeHandler}
                    />

                    <label htmlFor='age'>Age</label>
                    <input
                        id='age'
                        type='number'
                        value={enteredAge}
                        onChange={ageChangeHandler}
                    />

                    <Button type='submit'>Add user</Button>
                </form>
            </Card>
        </div>
    )
}

export default AddUser