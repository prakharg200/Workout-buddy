import formatDistanceToNow from "date-fns/formatDistanceToNow"

const WorkoutDetails = ({workout}) =>{
    const handleClick = async () =>{
        const res = await fetch("http://localhost:4000/api/workouts/"+workout._id,{
            method: 'DELETE',
        })

        const data =  await res.json()

        if(res.ok){
            console.log("Workout deleted successfully",data)
        }else{
            console.log(res.error)
        }
    }

    return(
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg): </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}</p>
            <span onClick={handleClick} className="material-symbols-outlined">Delete</span>
            <br />
        </div>
    )
}

export default WorkoutDetails