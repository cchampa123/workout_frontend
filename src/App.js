import React from 'react'
import { usePersistedState } from 'utils/stateHandlers'
import UnauthenticatedApp from './components/unauthenticatedApp'
import AuthenticatedApp from './components/authenticatedApp'
import { AuthContext } from 'contexts/AuthContext'
import './custom.scss'

function App() {

  const [userState, setUserState] = usePersistedState('user', null)

  return (
    <AuthContext.Provider value={{user:userState, setUser:setUserState}}>
      {
        userState ?
        <AuthenticatedApp/> :
        <UnauthenticatedApp/>
      }
    </AuthContext.Provider>
  );
}

export default App;
