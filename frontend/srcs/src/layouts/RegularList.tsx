import React, { CSSProperties } from 'react';
import { nanoid } from 'nanoid';

interface RegularListProps<T> {
  items: T[];
  resourceName: string;
  ItemComponent: React.ComponentType;
  style: CSSProperties;
}

function RegularList<T>({ items, resourceName, ItemComponent, style }: RegularListProps<T>) {

  return (
    <div style={style}>
      {items.map((val) => (
        <ItemComponent {...{ [resourceName]: val }} />
      ))}
    </div>
  );
}

export default RegularList;