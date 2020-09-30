import React, {useState} from 'react'
import { db } from "../services/firebase"

const ranks = require('../data/ranks.json');

export default function DraftForm(){

    const[draftDetails,setDraftDetails]   = useState(
        {
            draftName: '',
            description: '',
        }
    )

    const handleDraftChange=(event) =>setDraftDetails({
        ...draftDetails, //you spread here so only the detail your updating gets replaced
                        //hooks dont merge they only wipe and replace so you spread to keep the name when you change desciption

        [event.target.name]: [event.target.value],
    })
        
    

    const blankPlayer = {playerName: '',
                        playerRank: 'Iron 1'   
                        }
    const [playerArray, setPlayerArray] = useState([
        blankPlayer
    ])

    const handlePlayerChange =(event)=>{
        const updatePlayer = [...playerArray]
        console.log("HELLO ",updatePlayer)
        updatePlayer[event.target.dataset.idx][event.target.className] = event.target.value;
        setPlayerArray(updatePlayer)
    }

    const addPlayer=()=>{
        setPlayerArray([...playerArray,{...blankPlayer}]) //we do a ... on blankplayer to create a new object and not reference the original

    }

    const removePlayer=(event)=>{
        const deletePlayer = [...playerArray]
        deletePlayer.splice(event.target.dataset.idx,1)
        setPlayerArray(deletePlayer)
    }

    const handleSubmit = async event =>{


        // setPlayers(prevPlayers => [prevPlayers, 'Hello'])
         // setPlayers(prevPlayers => [prevPlayers, 'Dad'])
         event.preventDefault()
 
         try {
             await db.ref("drafts").push({
                 name: draftDetails.draftName,
                 timestamp: Date.now(),
                 players: playerArray
             })
             setDraftDetails({
                draftName: '',
                description: '',
            })
         }
         catch(error){
             console.log(error)
         }
 
     }
    return(
    <form onSubmit={handleSubmit}>            
        <label htmlFor="draftName">Draft Name</label>   
        <input 
            type="text" 
            name="draftName" 
            id="draftName" 
            value={draftDetails.draftName}
            onChange={handleDraftChange}
        /> 
        <label htmlFor="description">Description</label> 
        <input 
            type="text" 
            name="description" 
            id="description" 
            value={draftDetails.description}
            onChange={handleDraftChange}
        />

        <input type="button" onClick={addPlayer} value="Add Player" />         

        {
            playerArray.map((val, idx)=>{
                const playerId = `player-${idx}`
                const rankId = `rank-${idx}`
                return (

                    <div key ={`player-${idx}`}>
                        <label htmlFor={playerId}>{`Player #${idx + 1}`}</label>
                            <input
                                type="text"
                                name={playerId}
                                data-idx={idx}
                                id={playerId}
                                className="playerName" 
                                value={playerArray[idx].playerName}
                                onChange={handlePlayerChange}
                            />
                            <label htmlFor={rankId}>Rank</label>
                            <select
                                name={rankId}
                                data-idx={idx}
                                id={rankId}
                                className="playerRank"
                                value={playerArray[idx].playerRank}
                                onChange={handlePlayerChange}
                            >
                               
                               {ranks.map(rank=>{
                                   return (<option key={rank} value={rank}>{rank}</option>)
                               })}
                               {/* <option value="grapefruit">Grapefruit</option>
                                <option value="lime">Lime</option>
                                <option selected value="coconut">Coconut</option>
                                <option value="mango">Mango</option> */}

                            </select>
                            <input type="button" data-idx={idx} onClick={removePlayer} value="X" />      
                    </div>
                )
            })
        }   
        <input type="submit" value="Submit" />        
    </form> 
      )
    
}