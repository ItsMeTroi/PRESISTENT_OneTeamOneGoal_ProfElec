import React, { useState } from 'react';
import flops from './data';
import './Dashboard.css';
import logo from './assets/bananapeel-loaders.png';

const allTypes = ['all', ...new Set(flops.map((flop) => flop.type))];

function Dashboard() {
  const [flopItems, setFlopItems] = useState(flops);
  const [showItemDetail, setShowItemDetail] = useState(false);
  const [currID, setCurrID] = useState(0);
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

      { showItemDetail &&

          <div>
            <img src={flopItems[currID].img} alt={flopItems[currID].title} className="item-img" />
            <div className="item-info">
                <header>
                <h4>{flopItems[currID].title}</h4>
                <h4 className="price">${flopItems[currID].price}</h4>
                </header>
                <p className="item-text">{flopItems[currID].desc}</p>
            </div>
          </div>
      }


      <section className="products-container">
        <Products flopItems={flopItems} setCurrID={setCurrID} setShowItemDetail={setShowItemDetail}/>
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







const Products = ({ flopItems, setCurrID, setShowItemDetail }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="products-section">
      {flopItems.map((flopItem) => {
        const { id, title, img, price } = flopItem;
        return (
          <article key={id} className="product-item" onMouseOver={()=>setIsHovered(true)} onMouseLeave={()=>setIsHovered(false)}>
            <div>
            <img src={img} alt={title} className="item-img" />
            <div className="item-info">
              <header>
                <h4>{title}</h4>
                <h4 className="price">${price}</h4>
              </header>
              {/* <p className="item-text">{desc}</p> */}
            </div>
            {
              isHovered && <button className= 'item-button' onClick={()=>{setCurrID(id-1); setShowItemDetail(true);}}> BUY NOW </button>
            }
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default Dashboard;
