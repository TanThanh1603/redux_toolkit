import React, { useEffect } from 'react'

const User = (props) => {
  const { listUsers } = useSelector((state) => state.user)


  useEffect(() => {
    dispatch(fetchAllUsers())

  },[])
  return (
    <div>{props.id}</div>
  )
}

export default User