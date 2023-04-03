import {useState,useEffect} from 'react'
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'

const Home = () =>{
    const [workouts,setWorkouts] = useState(null)

    useEffect(()=>{
        const fetchWorkouts = async () =>{
            const response = await fetch("http://localhost:4000/api/workouts")
            const data = await response.json()
            
            if(response.ok){
                setWorkouts(data)
            }
        }

        fetchWorkouts()
    },[workouts])

    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map(workout =>{
                    return(
                        <WorkoutDetails key={workout._id} workout={workout}/>
                    )
                })}
            </div>
            <WorkoutForm/>
        </div>
    )
}

export default Home