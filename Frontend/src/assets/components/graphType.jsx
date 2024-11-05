
import React, { useState } from 'react';

function GraphType({ graphType, setGraphType }) {  
    return (
        <div className="graph_type">
            <label>Select Graph Type</label>
            // Dropdown for selecting graph type 
            <select value={graphType} onChange={(e) => setGraphType(e.target.value)}>
                // Options for directed and undirected graph types 
                <option value="Directed">Directed</option>
                <option value="unDirected">Un-Directed</option>
            </select>
        </div>
    );
}

export default GraphType;
