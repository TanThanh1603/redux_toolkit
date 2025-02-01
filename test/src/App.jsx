import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { deleteUserById, fetchAllUsers } from './redux/slices/userSlices'
import Table from 'react-bootstrap/Table';

const App = () => {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  const { isLoading, listUsers, isError } = useSelector((state) => state.user)
  
  const handleDelteUser = (user) => {
    dispatch(deleteUserById(user.id))
  }

  useEffect(() => {
    dispatch(fetchAllUsers())
  },[])

    if (isError === false && isLoading === true) {
    return (
      <>
        <hr />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>id</th>
              <th>Email</th>
              <th>Username</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
              <div>Loading...</div>
          </tbody>
        </Table>
      </>
    )
  }
  if (isError === false && isLoading === false) {
    return (
      <>
        <hr />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>id</th>
              <th>Email</th>
              <th>Username</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
              {listUsers && listUsers.length > 0 && listUsers.map((item,index) => {
                  return (
                    <tr key={`users-${index}`}>
                      <td>{item.id}</td>
                      <td>{item.email}</td>
                      <td>{item.username}</td>
                          <td>
                            <button className="btn btn-danger"
                              onClick={() => handleDelteUser(item)}
                            >Delete</button>
                      </td>
                    </tr>
                  )
                })}
          </tbody>
        </Table>
      </>
    )
  }
  if (isError === true && isLoading === false) {
    return (
      <>
        <hr />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>id</th>
              <th>Email</th>
              <th>Username</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
              <div>Something Wrong</div>
          </tbody>
        </Table>
      </>
    )
  }
}

export default App