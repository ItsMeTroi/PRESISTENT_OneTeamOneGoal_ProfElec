import React, { useState } from 'react';
import flops from './data';
import './App.css';
import logo from './assets/bananapeel-loaders.png';

const allTypes = ['all', ...new Set(flops.map((flop) => flop.type))];

function App() {
  const [flopItems, setFlopItems] = useState(flops);
  const [types, setTypes] = useState(allTypes);

  const filterItems = (type) => {
    if (type === 'all') {
      setFlopItems(flops);
      return;
    }
    const newItems = flops.filter((flop) => flop.type === type);
    setFlopItems(newItems);
  };


  return (
    <main>
      <section className="nav-bar">
        <div className='nav-container'>
          <img className='logo' src={logo} alt='logo'></img>
          <Types types={types} filterItems={filterItems} />
          <button className='cart'>Cart</button>
        </div>
      </section>  
      <section className="products-container">
        <Products flopItems={flopItems} />
      </section>
    </main>
  );
}

const Types = ({ types, filterItems }) => {
  return (
    <div className="btn-container">
      {types.map((type, index) => {
        return (
          <button
            type="button"
            className="filter-btn"
            key={index}
            onClick={() => filterItems(type)}
          >
            {type}
          </button>
        );
      })}
    </div>
  );
};

const Products = ({ flopItems }) => {
  return (
    <div className="products-section">
      {flopItems.map((flopItem) => {
        const { id, title, img, desc } = flopItem;
        return (
          <article key={id} className="product-item">
            <img src={img} alt={title} className="item-img" />
            <div className="item-info">
              <header>
                <h4>{title}</h4>
                <h4 className="price">$15</h4>
              </header>
              <p className="item-text">{desc}</p>
              <button className='item-detail'>
                BUY NOW
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default App;
