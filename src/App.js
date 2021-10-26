import React, { useState, Fragment} from 'react';
import AddUser from './components/Users/AddUser';
import UsersList from './components/Users/UsersList';


function App() {
  const [usersList, setUserList] = useState([])

  const addUserHandler = userData => {
    setUserList(prevState => {
      return [...prevState, userData]
    })
  }


  return (
    <Fragment>
      <AddUser onAddUser={addUserHandler}/>
      <UsersList users={usersList}/>
    </Fragment>
  );
}

export default App;
