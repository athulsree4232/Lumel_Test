import React from "react";
import Row from "./Row"
import './Table.css'

const Table = ( {data, onValueChange , calculateVariance}) => {
    return (
        <table className="hierarchical-table">
            <thead>
                <tr>
                    <th>Label</th>
                    <th>Value</th>
                    <th>Input</th>
                    <th>Allocation %</th>
                    <th>Allocation Val</th>
                    <th>Variance %</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item) => (
                    <Row key={item.id} item={item} onValueChange={onValueChange} calculateVariance={calculateVariance}/>
                ))}
            </tbody>
        </table>
    )
}

export default Table