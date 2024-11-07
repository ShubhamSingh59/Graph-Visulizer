import React, { useState } from 'react';
import '../styles/algorithm.css'
function Algorithm(){
    const[algo, setAlgo] = useState("BFS")
    const handleClick = () =>{
        console.log(algo);
    }
    return(
        <div className="algo">
            <label htmlFor="">Choose Algorithm</label>
             {/* Dropdown to select an algorithm */}
            <select value={algo} onChange={(e) => setAlgo(e.target.value)}>
                <option value="BFS">BFS</option>
                <option value="DFS">DFS</option>
            </select>

            <button onClick={handleClick}>click me</button>
        </div>
    )
}

export default Algorithm;
