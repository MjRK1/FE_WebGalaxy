import React from 'react';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';

const NAV_ITEMS = [
  {
    id: nanoid(3),
    name: 'Automatization',
    title: 'Автоматизация',
  },
  {
    id: nanoid(3),
    name: 'PO',
    title: 'ПО',
  },
  {
    id: nanoid(3),
    name: 'services',
    title: 'Услуги',
  },
];

export function Nav() {
  const navigator = useNavigate();

  return (
    <div className="nav">
      <div className="tabs-wrapper">
        {NAV_ITEMS.map((item) => (
          <div
            key={item?.id}
            className="tabs-wrapper__tab"
            onClick={() => navigator(`/products/${item?.name}`)}
          >
            {item?.title}
          </div>
        ))}
      </div>
    </div>
  );
}
