import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import '../styles/GraphVisualizer.css'
// Define color options for nodes
const colors = ['blue', 'orange', 'green']; 
const GraphVisualizer = ({ adjList, graphType }) => {
    const svgRef = useRef(); // Reference to the SVG element
    const [isVisualizing, setIsVisualizing] = useState(false); // State for visualization toggle
    const [algorithm, setAlgorithm] = useState('BFS'); // State for selected algorithm
    const [nodeColors, setNodeColors] = useState({}); // State for node colors

    // useEffect hook to handle graph rendering
    useEffect(() => {
        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove(); // Clear previous SVG elements

        // Exit if the adjacency list is empty
        if (Object.keys(adjList).length === 0) return;

        // Set SVG dimensions and node radius
        const width = 400;
        const height = 500;
        const nodeRadius = 20;

        svg.append('defs').append('marker')
            .attr('id', 'arrowhead')
            .attr('viewBox', '-0 -5 10 10')
            .attr('refX', 10)
            .attr('refY', 0)
            .attr('orient', 'auto')
            .attr('markerWidth', 6)
            .attr('markerHeight', 6)
            .append('path')
            .attr('d', 'M 0,-5 L 10,0 L 0,5')
            .attr('fill', '#000')
            .style('stroke', 'none');

        // Convert adjacency list to nodes and links for D3
        const nodes = Object.keys(adjList).map(node => ({ id: Number(node) }));
        const links = [];

        // Create link objects for each connection
        nodes.forEach(node => {
            adjList[node.id].forEach(neighbor => {
                links.push({
                    source: node.id,
                    target: neighbor,
                });
            });
        });

        const createBinaryTreePositions = (nodes) => {
            const positions = {};
            const heightLevels = Math.ceil(Math.log2(nodes.length + 1));
            const widthPerLevel = width / Math.pow(2, heightLevels - 1);
            
            nodes.forEach((node, index) => {
                const level = Math.floor(Math.log2(index + 1));
                const positionInLevel = index - Math.pow(2, level) + 1;
                const x = (positionInLevel + 0.5) * widthPerLevel;
                const y = level * (height / heightLevels) + 40; 
                positions[node.id] = { x, y };
            });

            return positions;
        };

        const positions = createBinaryTreePositions(nodes);

        // D3 force simulation for dynamic graph layout
        const simulation = d3.forceSimulation(nodes)
            .force("link", d3.forceLink(links).id(d => d.id).distance(100))
            .force("charge", d3.forceManyBody().strength(-400))
            .force("center", d3.forceCenter(width / 2, height / 2));

      
        const linkElements = svg.append('g')
            .selectAll('line')
            .data(links)
            .enter()
            .append('line')
            .attr('stroke', 'black')
            .attr('stroke-width', 2);

        // Draw node circles
        const nodeElements = svg.append('g')
            .selectAll('circle')
            .data(nodes)
            .enter()
            .append('circle')
            .attr('r', nodeRadius)
            .attr('fill', d => nodeColors[d.id] || 'lightblue'); 

        // Add text labels to nodes
        const textElements = svg.append('g')
            .selectAll('text')
            .data(nodes)
            .enter()
            .append('text')
            .text(node => node.id)
            .attr('font-size', 15)
            .attr('dx', -10)
            .attr('dy', 5);

        // Update positions during simulation
        simulation.on('tick', () => {
            linkElements
                .attr('x1', d => positions[d.source.id].x)
                .attr('y1', d => positions[d.source.id].y)
                .attr('x2', d => positions[d.target.id].x)
                .attr('y2', d => positions[d.target.id].y);

            nodeElements
                .attr('cx', d => positions[d.id].x)
                .attr('cy', d => positions[d.id].y);

            textElements
                .attr('x', d => positions[d.id].x)
                .attr('y', d => positions[d.id].y);
        });
    }, [adjList, graphType, nodeColors]);

    // Function to visualize and color graph nodes
    const visualizeAndColorGraph = () => {
        if (!isVisualizing) {
            setIsVisualizing(true);
            const nodes = Object.keys(adjList).map(node => ({ id: Number(node) }));
            const colorAssignment = {};
            const visited = new Set();
            const startNode = 1; // Starting node for traversal
            const queue = algorithm === 'BFS' ? [startNode] : [startNode]; 

            const colorNode = (nodeId) => {
                const neighborColors = new Set(); 

                adjList[nodeId].forEach(neighbor => {
                    if (colorAssignment[neighbor] !== undefined) {
                        neighborColors.add(colorAssignment[neighbor]);
                    }
                });

                for (let color of colors) {
                    if (!neighborColors.has(color)) {
                        colorAssignment[nodeId] = color; 
                        break;
                    }
                }

                setNodeColors(prevColors => ({
                    ...prevColors,
                    [nodeId]: colorAssignment[nodeId]
                }));

                d3.select(svgRef.current)
                    .selectAll('circle')
                    .filter(node => node.id === nodeId)
                    .transition()
                    .duration(500)
                    .attr('fill', colorAssignment[nodeId]);
            };

          
            const step = () => {
                if ((algorithm === 'BFS' && queue.length === 0) || (algorithm === 'DFS' && queue.length === 0)) {
                    setIsVisualizing(false);
                    return;
                }

                const currentNode = algorithm === 'BFS' ? queue.shift() : queue.pop(); 
                visited.add(currentNode);

                colorNode(currentNode); 

                adjList[currentNode].forEach(neighbor => {
                    if (!visited.has(neighbor)) {
                        queue.push(neighbor);
                    }
                });

                setTimeout(step, 1000);  // Delay for each step
            };

            step();
        }
    };

    return (
        <div className='main-div'>
            <select value={algorithm} onChange={e => setAlgorithm(e.target.value)} disabled={isVisualizing}>
                <option value="BFS">BFS</option>
                <option value="DFS">DFS</option>
            </select>
            <button onClick={visualizeAndColorGraph} disabled={isVisualizing}>
                {algorithm} Visualization and Coloring
            </button>
            {/* // SVG element for rendering the graph */}
            <svg ref={svgRef} />
        </div>
    );
};

export default GraphVisualizer;
