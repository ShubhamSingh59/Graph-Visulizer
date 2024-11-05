import React, { useState } from 'react'
function Nodes({ setAdjList }) { 
   
    const [nodeCount, setNodeCount] = useState(1);
   
    const [nodeConnections, setNodeConnections] = useState({});

    // Handle input for each node's connections
    const handleConnectionsInput = (e) => {
        const { name, value } = e.target;
        
        setNodeConnections({ ...nodeConnections, [name]: value });
    };

    const createAdjList = () => {
        let list = {};
        // Initialize an empty array for each node
        for (let i = 1; i <= nodeCount; i++) {
            list[i] = [];
        }

        // Populate adjacency list with connections
        for (const node in nodeConnections) {
            const connections = nodeConnections[node]
                .split(',') 
                .map((connection) => parseInt(connection.trim())); // Parse each connection as an integer

            list[node] = connections;
        }

        // Update the adjacency list in parent component
        setAdjList(list);  
    };

    return (
        <div className="nodes_number">
            <label>Number of Nodes In the graph</label>
           
            <input
                value={nodeCount}
                type="number"
                min="1"
                max="10"
                onChange={(e) => setNodeCount(Number(e.target.value))}
            />
            <h3>Graph Input</h3>

            // Render input fields for each node's connections 
            {Array.from({ length: nodeCount }, (_, index) => (
                <div key={index + 1}>
                    <label>Node {index + 1} connections: </label>
                    <input
                        type="text"
                        name={index + 1}
                        placeholder="e.g., 2, 3"
                        onChange={handleConnectionsInput}
                    />
                </div>
            ))}

            <button onClick={createAdjList}>Create Graph</button>

            <h4>Adjacency List</h4>
             Display the current connections entered by the user 
            <pre>{JSON.stringify(nodeConnections, null, 2)}</pre>
        </div>
    );
}

export default Nodes;
