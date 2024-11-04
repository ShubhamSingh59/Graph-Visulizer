import React, { useState } from 'react';

function GraphType({ graphType, setGraphType }) {  
    return (
        <div className="graph_type">
            <label>Select Graph Type</label>
            <select value={graphType} onChange={(e) => setGraphType(e.target.value)}>
                <option value="Directed">Directed</option>
                <option value="unDirected">Un-Directed</option>
            </select>
        </div>
    );
}

export default GraphType;
