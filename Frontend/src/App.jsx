import React, { useState } from 'react';
import Nodes from './assets/components/Nodes';
import GraphType from './assets/components/graphType';
import Graph from './assets/components/Graph';

function App() {
    const [adjList, setAdjList] = useState({});
    const [graphType, setGraphType] = useState("unDirected");
    const [algorithm, setAlgorithm] = useState("BFS");

    return (
        <>
            <div>
                <h1>BFS and DFS Visualizer</h1>
                <Nodes setAdjList={setAdjList} />
                {/*<GraphType setGraphType={setGraphType} />*/}
                <Graph adjList={adjList} graphType={graphType}/>
            </div>
        </>
    );
}

export default App;