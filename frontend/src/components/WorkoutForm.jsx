import { useState } from "react"

const WorkoutForm = () =>{
    const [title,setTitle] = useState("")
    const [reps,setReps] = useState("")
    const [load,setLoad] = useState("")
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) =>{
        e.preventDefault()

        const workout = {title,load,reps}

        const res = await fetch("https://workout-buddy-api-3kq2.onrender.com/api/workouts",{
            method:"POST",
            body: JSON.stringify(workout),
            headers:{
                'Content-type': 'application/json'
            }
        })
        const data = await res.json()

        if(!res.ok){
            setError(data.error)
            setEmptyFields(data.emptyFields)
        }else{
            setError(null)
            setEmptyFields([])
            console.log("New workout added!",data)
            setLoad('')
            setReps('')
            setLoad('')
        }

    }

    return(
        <form className="create" onSubmit={handleSubmit}>
            <label>Enter Workout Title: </label>
            <input 
                type="text" 
                onChange={e => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Load (in Kg): </label>
            <input 
                type="number" 
                onChange={e => setLoad(e.target.value)}
                value={load}
                className={emptyFields.includes('load') ? 'error' : ''}
            />

            <label>Reps: </label>
            <input 
                type="number" 
                onChange={e => setReps(e.target.value)}
                value={reps}
                className={emptyFields.includes('reps') ? 'error' : ''}
            />

            <button>Add workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default WorkoutForm