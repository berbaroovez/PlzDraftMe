import React, {useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { auth } from "../services/firebase";
import { db } from "../services/firebase"

export default function Dashboard(){

    const [name, setName] = useState('')
    const [players, setPlayers] = useState(["TEST","WOW"])
    const [error, setError] = useState(null)
    const handleChange = (event)=>{
        setName(event.target.value)
    }

    // [{
    //     name: 'berbaroovez',
    //     char: 'Omen',
    //     rank:'Gold 2'
    // },
    // {
    //     name: 'Atrioc',
    //     char: 'Diva',
    //     rank:'Silver 2'
    // }]

    useEffect(()=>{
        setPlayers([...players, 'TEST'])

        
    } ,[])
    const handleSubmit = async event =>{


       // setPlayers(prevPlayers => [prevPlayers, 'Hello'])
        // setPlayers(prevPlayers => [prevPlayers, 'Dad'])
        event.preventDefault()

        try {
            await db.ref("drafts").push({
                name: name,
                timestamp: Date.now(),
                players: players
            })
            setName('')
        }
        catch(error){
            console.log(error)
        }

    }

    // const handleSubmit= async event => {
    //     event.preventDefault();
    //     setError(null)
    //     try {
    //       await db.ref("drafts").push({
    //         content: 'hello',
    //         url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png",
    //         timestamp: Date.now(),
            
    //       });
    //       setName('')
    //     } catch (error) {
    //      setError(error.message) 
    //     }
    //   }

 

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Create A Draft</h1>
                <p>Fill In The Name</p>
                <div>
                <input placeholder="Draft Name" name="draftName" type="text" onChange={handleChange} value={name}></input>
                </div>
                <div>
                {error ? <p>{error}</p> : null}
                    <button type="submit">Create</button>
                </div>
                <hr></hr>
            </form>
        </div>
    )
}