import { useState } from 'react'
import './App.css';


function App() {
  function addScoop(id) {
    if(totalScoops<scoopLimit)
    {
      setFlavors(flavors =>
      flavors.map(flavor => {
        if (flavor.id === id && !flavor.isSoldOut) {
          return {
            ...flavor,
            scoopsSelected: flavor.scoopsSelected + 1
          };
        }

        return flavor;
      })
    );

    }
    
  }

 function removeScoop(id) {
  setFlavors(flavors =>
    flavors.map(flavor => {
      if (flavor.id === id&&!flavor.isSoldOut) {
        if (flavor.scoopsSelected > 0) {
          return {
            ...flavor,
            scoopsSelected: flavor.scoopsSelected - 1
          };
        }
      }
      return flavor;
    })
  );
}

  const [flavors, setFlavors] = useState([
  {
     id:1,
     name: "Vanilla",
     isSoldOut:false,
     scoopsSelected:0
  },
  {
    id:2,
    name: "Chocolate",
    isSoldOut:true,
    scoopsSelected:0
  },
  {
  id: 3,
  name: "Strawberry",
  isSoldOut: false,
  scoopsSelected: 0
},
{
  id: 4,
  name: "Pistachio",
  isSoldOut: false,
  scoopsSelected: 0
},
{
  id: 5,
  name: "Mango",
  isSoldOut: true,
  scoopsSelected: 0
}
  ]);
  const [scoopLimit, setScoopLimit] = useState(5);
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);

  const totalScoops = flavors.reduce(
  (sum, flavor) => sum + flavor.scoopsSelected,
  0
);

const visibleFlavors = showOnlyAvailable? flavors.filter(flavor => !flavor.isSoldOut): flavors;

  const totalPrice=totalScoops*5;
 return (
  <div className="app">
    <h1 className="title">Ice-Cream Kiosk</h1>
    <button onClick={() => setShowOnlyAvailable(!showOnlyAvailable)}>
      Show Only Available
    </button>
    {visibleFlavors.length === 0 && <p>No flavors to show</p>}

    <div className="flavors-grid">
      {visibleFlavors.map((flavor) => {
        return (
          <div
            key={flavor.id}
            className={`flavor-card ${flavor.isSoldOut ? "sold-out" : ""}`}
          >
            <h2>{flavor.name}</h2>
            {flavor.isSoldOut && <p>Sold Out</p>}
            <p>Scoops: {flavor.scoopsSelected}</p>
            <button
              disabled={flavor.isSoldOut || totalScoops >= scoopLimit}
              onClick={() => addScoop(flavor.id)}>+</button>
            <button
              disabled={flavor.isSoldOut || flavor.scoopsSelected === 0}
              onClick={() => removeScoop(flavor.id)}>-</button>
          </div>
        );
      })}
    </div>
   <div className="order-summary">
   <h3>Order Summary</h3>
   <p>Total Scoops: {totalScoops}</p>
   <p>Total Price: {totalPrice}</p>
   </div>
    {totalScoops >= scoopLimit && <p>Scoop limit reached!</p>}
    {totalScoops === 0 && <p>Your order is empty</p>}
  </div>
);
}
export default App;