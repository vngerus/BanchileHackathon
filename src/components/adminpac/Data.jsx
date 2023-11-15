import React, { useState, useEffect } from 'react';

function Data({ datos, selectAll }) {
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    if (selectAll) {
      setSelectedItems(datos.map((_, index) => index));
    } else {
      setSelectedItems([]);
    }
  }, [selectAll, datos]);

  const toggleItemSelection = (index) => {
    setSelectedItems((prevSelected) => {
      if (prevSelected.includes(index)) {
        return prevSelected.filter((item) => item !== index);
      } else {
        return [...prevSelected, index];
      }
    });
  };

  return (
    <div>
      <div className='form-data'>
        {datos.map((item, index) => (
          <div key={index} className='form-row'>
            <input
              type='checkbox'
              style={{ marginRight: '10px' }}
              checked={selectAll || selectedItems.includes(index)}
              onChange={() => toggleItemSelection(index)}
            />

            {Object.keys(item).map((key, subIndex) => (
              <div key={subIndex} className='form-field'>
                {item[key]}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Data;
