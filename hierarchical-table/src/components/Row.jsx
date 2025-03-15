import React, { useState } from "react";

const Row = ({ item, onValueChange, calculateVariance,level = 0  }) => {
    const [inputValue, setInputValue] = useState("");

    const onHandleValueChange = () => {
        const value = parseFloat(inputValue);
        if (!isNaN(value)) {
            onValueChange(item.id, value, false);
            setInputValue('');
        }
    };

    const onHandlePercentageChange = () => {
        const percentage = parseFloat(inputValue);
        if (!isNaN(percentage)) {
            onValueChange(item.id, percentage, true);
            setInputValue('');
        }
    };

    return (
        < >
            <tr>
                <td style={{ paddingLeft: `${level * 20}px` }}>{item.label}</td>
                <td>{item?.value?.toFixed(2)}</td>
                <td>
                    <input
                        type="number"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                </td>
                <td>
                    <button onClick={onHandlePercentageChange}>Allocation %</button>
                </td>
                <td>
                    <button onClick={onHandleValueChange}>Allocation Val</button>
                </td>
                <td>{calculateVariance(item)}%</td>
            </tr>
            {item.children &&
                item.children.map((child) => (
                    <Row
                        key={child.id}
                        item={child}
                        onValueChange={onValueChange}
                        calculateVariance={calculateVariance}
                        level={level + 1}
                    />
                ))}
        </>
    )
}

export default Row