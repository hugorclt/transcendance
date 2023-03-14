import React from 'react';
import { nanoid } from 'nanoid';

interface RegularListProps<T> {
  items: T[];
  resourceName: string;
  ItemComponent: React.ComponentType;
}

function RegularList<T>({ items, resourceName, ItemComponent }: RegularListProps<T>) {

  return (
    <>
      {items.map((val) => (
        <ItemComponent {...{ [resourceName]: val }} />
      ))}
    </>
  );
}

export default RegularList;