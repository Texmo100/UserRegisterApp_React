import React, { useState, useRef } from 'react'
import Wrapper from '../Helpers/Wrapper'
import ErrorModal from '../UI/ErrorModal'
import Card from '../UI/Card'
import Button from '../UI/Button'

import styles from './AddUser.module.css'


const AddUser = props => {
    // Use Ref references
    const nameInputRef = useRef()
    const ageInputRef = useRef()

    // Use state variables
    const [error, setError] = useState()

    const addUserHandler = (event) => {
        event.preventDefault()

        const enteredName = nameInputRef.current.value
        const enteredUserAge = ageInputRef.current.value

        if ((enteredName.trim().length === 0) || (enteredUserAge.trim().length === 0)) {
            setError({
                title: 'Invalid input',
                message: 'Please enter a valid name and age (non-empty values).'
            })
            return;
        } else if (+enteredUserAge < 1) {
            setError({
                title: 'Invalid age',
                message: 'Please enter a valid age (it should be greater than 0).'
            })
            return;
        } else {
            const userData = {
                id: Math.random().toString(),
                name: enteredName,
                age: enteredUserAge
            }
            props.onAddUser(userData)
            console.log(userData)
            inputCleaner()
        }
    }

    const errorHandler = () => {
        setError(null)
    }

    const inputCleaner = () => {
        nameInputRef.current.value = ''
        ageInputRef.current.value = ''
    }

    return (
        <Wrapper>
            {
                error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler} />
            }
            <Card className={styles.input}>
                <form onSubmit={addUserHandler}>
                    <label htmlFor='username'>User name</label>
                    <input
                        id='username'
                        type='text'
                        ref={nameInputRef}
                    />

                    <label htmlFor='age'>Age</label>
                    <input
                        id='age'
                        type='number'
                        ref={ageInputRef}
                    />

                    <Button type='submit'>Add user</Button>
                </form>
            </Card>
        </Wrapper>
    )
}

export default AddUser