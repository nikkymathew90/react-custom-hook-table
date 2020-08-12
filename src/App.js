import React, { useState } from "react";
import "./App.css";
import { tableData } from "./data";

const useSortTableData = (items, config = null) => {
  const [sortedConfig, setsortedConfig] = useState(config);

  const sortedItems = React.useMemo(() => {
    let sortedProducts = [...items];
    if (sortedConfig !== null) {
      sortedProducts.sort((a, b) => {
        if (a[sortedConfig.name] < b[sortedConfig.name]) {
          return sortedConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortedConfig.name] > b[sortedConfig.name]) {
          return sortedConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    console.log("sortedProducts---", sortedProducts);
    return sortedProducts;
  }, [items, sortedConfig]);

  const requestSort = name => {
    let direction = "ascending";
    if (
      sortedConfig &&
      sortedConfig.name === name &&
      sortedConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setsortedConfig({ name, direction });
  };

  return { items: sortedItems, requestSort, sortedConfig };
};

const ProductTable = props => {
  const { products } = props;
  const { items, requestSort, sortedConfig } = useSortTableData(products);

  const setDirectionClass = key => {
    if (!sortedConfig) {
      return;
    }

    return sortedConfig.name === key ? sortedConfig.direction : undefined;
  };

  return (
    <table>
      <caption>Product Table</caption>
      <thead>
        <tr>
          <th>
            <button
              type="button"
              onClick={() => requestSort("name")}
              className={setDirectionClass("name")}
            >
              Name
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort("price")}
              className={setDirectionClass("price")}
            >
              Price
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort("stock")}
              className={setDirectionClass("stock")}
            >
              Stock
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {items.map(product => (
          <tr key={product.id}>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.stock}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

function App() {
  return (
    <div className="App">
      <ProductTable products={tableData} />
    </div>
  );
}

export default App;
