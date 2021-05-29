import React from 'react'
import { usePersistedState } from 'utils/stateHandlers'
import UnauthenticatedApp from './components/unauthenticatedApp'
import AuthenticatedApp from './components/authenticatedApp'
import './custom.scss'

function App() {

  const [user, setUser] = usePersistedState('user', null)

  return (
    <div>
      {
        user ?
        <AuthenticatedApp setUser={setUser} user={user}/> :
        <UnauthenticatedApp setUser={setUser}/>
      }
    </div>
  );
}

export default App;
