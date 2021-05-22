import React, { useContext } from 'react'
import { AuthContext } from 'contexts/AuthContext'

function Home() {

  const user = useContext(AuthContext)

  return(
    <div>
      <h3 className='text-secondary'>Welcome, {user.username}!</h3>
    </div>
  );

}

export default Home;
