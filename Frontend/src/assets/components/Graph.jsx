import React from 'react';
import GraphVisualizer from './GraphVisualizer'; 
// Graph component definition
function Graph({ adjList, graphType}) {
    return (
        <div>
          //  Render GraphVisualizer and pass adjList and graphType as props
            <GraphVisualizer adjList={adjList} graphType={graphType}/>
        </div>
    );
}

export default Graph;
