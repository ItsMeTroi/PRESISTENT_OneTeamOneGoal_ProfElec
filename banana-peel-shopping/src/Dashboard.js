import React, { useRef, useState } from "react";
import flops from "./data";
import "./Dashboard.css";
import logo from "./assets/logo-bp.png";
// import Cart from './Cart';

const allTypes = ["all", ...new Set(flops.map((flop) => flop.type))];

const Dashboard = () => {
  const [flopItems, setFlopItems] = useState(flops);
  const [showItemDetail, setShowItemDetail] = useState(false);
  const [currID, setCurrID] = useState(0);
  const [types, setTypes] = useState(allTypes);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [qty, setQty] = useState(0);
  const count = useRef();

  const filterItems = (type) => {
    if (type === "all") {
      setFlopItems(flops);
      return;
    }
    const newItems = flops.filter((flop) => flop.type === type);
    setFlopItems(newItems);
  };

  const addCartItems = () => {
    flopItems[currID].qty = flopItems[currID].qty + qty;

    cartItems.map((item) =>
      item.id === flopItems[currID].id
        ? (flopItems[currID].status = true)
        : flopItems[currID].status
    );
    console.log(flopItems[currID].status);
    flopItems[currID].qty !== 0 && !flopItems[currID].status
      ? setCartItems([...cartItems, flopItems[currID]])
      : setCartItems([...cartItems]);
  };
  console.log(cartItems);

  return (
    <main>
      <section className="nav-bar">
        <div className="nav-container">
          <img className="logo" src={logo} alt="logo"></img>
          <Types types={types} filterItems={filterItems} />
          <button className="cart" data-testid="cart-btn">
            Cart
          </button>
        </div>
      </section>

      {showItemDetail && (
        <div className="lightbox">
          <button
            className="exitItem"
            onClick={() => {
              setQty(0);
              setShowItemDetail(false);
            }}
          >
            X
          </button>
          <img
            src={flopItems[currID].img}
            alt={flopItems[currID].title}
            className="item-img"
          />
          <div className="item-info">
            <header>
              <h4>{flopItems[currID].title}</h4>
              <h4 className="price">Unit Price: ${flopItems[currID].price}</h4>
              <h4 className="price">
                Subtotal: ${flopItems[currID].price * qty}
              </h4>
              <h4 className="price">
                Total: ${flopItems[currID].price * flopItems[currID].qty}
              </h4>
            </header>
            <p className="item-text">{flopItems[currID].desc}</p>
            <h4>Current item: {flopItems[currID].qty}</h4>
            <button
              className="decItem"
              onClick={() => setQty(qty > 0 ? qty - 1 : 0)}
            >
              -
            </button>
            <input
              type="text"
              className="itemQty"
              value={qty}
              ref={count}
              onChange={() => {
                //to be worked on, needs to set placeholder to 0 automatically
                setQty(parseInt(count.current.value));
              }}
            />
            <button className="addItem" onClick={() => setQty(qty + 1)}>
              +
            </button>
            <button
              className="buyItem"
              onClick={addCartItems}
              data-testid="buy-btn"
            >
              Buy
            </button>
          </div>
        </div>
      )}

      {/* {
        showCart &&
        <Cart cartItems={cartItems} setCartItems={setCartItems}/>
      } */}

      <section className="products-container">
        <Products
          flopItems={flopItems}
          setCurrID={setCurrID}
          setShowItemDetail={setShowItemDetail}
        />
      </section>
    </main>
  );
};

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
          <article
            key={id}
            id={`${id}`}
            className="product-item"
            onMouseOver={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div>
              <img src={img} alt={title} className="item-img" />
              <div className="item-info">
                <header>
                  <h4>{title}</h4>
                  <h4 className="price">${price}</h4>
                </header>
                {/* <p className="item-text">{desc}</p> */}
              </div>
              {isHovered && (
                <button
                  className="item-button"
                  onClick={() => {
                    setCurrID(id - 1);
                    setShowItemDetail(true);
                  }}
                >
                  {" "}
                  Quick Look{" "}
                </button>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default Dashboard;
