import { useState } from 'react';
import Table from './components/Table';
import './App.css';



const initialTableData = [
  {
    id: "electronics",
    label: "Electronics",
    value: 1500,
    originalValue: 1500,
    children: [
      { id: "phones", label: "Phones", value: 800, originalValue: 800 },
      { id: "laptops", label: "Laptops", value: 700, originalValue: 700 },
    ],
  },
  {
    id: "furniture",
    label: "Furniture",
    value: 1000,
    originalValue: 1000,
    children: [
      { id: "tables", label: "Tables", value: 300, originalValue: 300 },
      { id: "chairs", label: "Chairs", value: 700, originalValue: 700 },
    ],
  },
];

function App() {
  const [tableData , setTableData] = useState(initialTableData)

  const onUpdateValue= (id, newValue, isPercentage = false) => {
    const updateNode = (nodes) => {
      return nodes.map((node) => {
        if (node.id === id) {
          if (isPercentage) {
            node.value += (node.value * newValue) / 100;
          } else {
            const delta = newValue - node.value;
            node.value = newValue;

           
            if (node.children) {
              const totalChildValue = node.children.reduce(
                (sum, child) => sum + child.value,
                0
              );

              node.children = node.children.map((child) => {
                const contribution = child.value / totalChildValue;
                child.value += delta * contribution;
                return child;
              });
            }
          }
        }

        if (node.children) {
          node.children = updateNode(node.children);
          node.value = node.children.reduce((sum, child) => sum + child.value, 0);
        }

        return node;
      });
    };

    setTableData(updateNode(tableData));
  };

  const calculateVariance = (item) => {
    return (((item.value - item.originalValue) / item.originalValue) * 100).toFixed(2);
  };



  return (
    <div style={{margin: '10px'}}>
      <h1 style={{textAlign: 'center'}}>Hierarchical Allocation Table</h1>
      <Table data={tableData} onValueChange={onUpdateValue} calculateVariance={calculateVariance}/>
    </div>
  );
}

export default App;
