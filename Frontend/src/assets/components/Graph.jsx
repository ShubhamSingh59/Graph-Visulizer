import React from 'react';
import GraphVisualizer from './GraphVisualizer'; 

function Graph({ adjList, graphType}) {
    return (
        <div>
            <GraphVisualizer adjList={adjList} graphType={graphType}/>
        </div>
    );
}

export default Graph;
