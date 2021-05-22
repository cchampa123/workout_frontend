import React, { useState } from 'react'
import UnauthenticatedApp from './components/unauthenticatedApp'
import AuthenticatedApp from './components/authenticatedApp'
import './custom.scss'

function App() {

  const [user, setUser] = useState(null)

  return (
    <div>
      {
        user ? 
        <AuthenticatedApp user={user}/> :
        <UnauthenticatedApp setUser={setUser}/>
      }
    </div>
  );
}

export default App;
