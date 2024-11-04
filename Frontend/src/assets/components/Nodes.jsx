import React, { useState } from 'react';

function Nodes({ setAdjList }) { 
    const [nodeCount, setNodeCount] = useState(1);
    const [nodeConnections, setNodeConnections] = useState({});

    const handleConnectionsInput = (e) => {
        const { name, value } = e.target;
        setNodeConnections({ ...nodeConnections, [name]: value });
    };

    const createAdjList = () => {
        let list = {};
        for (let i = 1; i <= nodeCount; i++) {
            list[i] = [];
        }

        for (const node in nodeConnections) {
            const connections = nodeConnections[node]
                .split(',')
                .map((connection) => parseInt(connection.trim()));

            list[node] = connections;
        }

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
            <pre>{JSON.stringify(nodeConnections, null, 2)}</pre>
        </div>
    );
}

export default Nodes;
