import React, { useContext } from 'react'
import { AuthContext } from 'contexts/AuthContext'
import { WorkoutDataContext } from 'contexts/WorkoutDataContext'
import { date as date_planned, complete, id } from 'constants/workout'
import WorkoutSummary from 'components/Common/WorkoutSummary/WorkoutSummary'
import { FaUmbrellaBeach } from 'react-icons/fa'
import moment from 'moment'

function Home() {

  const user = useContext(AuthContext)
  const { workoutData } = useContext(WorkoutDataContext)

  const todayWorkouts = workoutData.filter(x=>
    moment(x[date_planned]).isSame(moment(), 'day') && x[complete] === false
  )
  const upcomingWorkouts = workoutData.filter(x=>moment(x[date_planned]).isAfter(moment()))
  const completedWorkouts = workoutData.filter(x=>x[complete])
  completedWorkouts.sort((a,b)=>a[date_planned]>b[date_planned]?-1:1)

  const umbrella = <div className='text-center'>
      <FaUmbrellaBeach className='text-secondary' size='2em'/>
    </div>

  return(
    <div>
      <h2 className='text-secondary'>Welcome, {user.user.first_name}!</h2>
      <h3>Up for Today</h3>
      <div className='mb-2'>
      {todayWorkouts.length===0?umbrella:todayWorkouts.map(x=>
        <WorkoutSummary
          key={x[id]}
          workout={x}
          goButton={true}
          dateHeader={false}
        />
      )}
      </div>
      <h3>Upcoming</h3>
      <div className='mb-2'>
        {upcomingWorkouts.length===0?umbrella:upcomingWorkouts.map(x=>
          <WorkoutSummary
            key={x[id]}
            workout={x}
            dateHeader
          />
        )}
      </div>
      <h3>Recently completed</h3>
      <div className='mb-2'>
      {completedWorkouts.length===0?umbrella:completedWorkouts.map(x=>
        <WorkoutSummary
          key={x[id]}
          workout={x}
          dateHeader
        />
      )}
      </div>
    </div>
  );
}

export default Home;
