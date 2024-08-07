

'use client';


import { doc,addDoc,deleteDoc, collection, onSnapshot, query } from 'firebase/firestore';
import { useEffect, useState } from "react";
import { db } from './firebase';


export default function Home() {
  const [items,setItem]
 = useState([
  {name: 'Coffe', price: 4.67},
  {name: 'movie', price: 2.95},
  {name: 'Candy', price: 5.34},
  {name: 'stars', price: 4}

 ]);

 const [total, setTotal] = useState(0)
 
const [newItem,setNewItem] = useState({name:'' , price:''})

 // Add Item to dataBAse
const addItem = async (e) =>{
  e.preventDefault();
  if( newItem.name !== '' && newItem.price !== ''){
    // setItem([...items,newItem]);
    await addDoc(collection(db,'items'),{
      name: newItem.name.trim(),
      price: newItem.price,
    });
    setNewItem ({name:'',price:''})

  }

};


 // Read item From DataBase 
useEffect(() =>{
    const q = query(collection(db,'items'));
    const unsubscribe = onSnapshot(q,(querySnapshot) =>
    {let itemArr = []
      querySnapshot.forEach((doc) =>{
        itemArr.push({...doc.data(),id:doc.id})
      });
      setItem(itemArr);
// Read Total from DataBase
      const CalculateTotal = ()=>{
        const totalPrice = itemArr.reduce(
          (sum,item) => sum + parseFloat(item.price),
          0
        );
        setTotal(totalPrice);
      };
      CalculateTotal();
      return () => unsubscribe();




    } );
}
  ,[]);



// Delete Item from DataBase

const deleteItem = async (id) =>{
  await deleteDoc(doc(db,'items',id));
};






 
 
 return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
         <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
           <h1 className="text-4xl p-4 text-center">Expense Tracker</h1>
           <div className="bg-slate-800 p-4 rounded-lg">
             <form className="grid grid-cols-6 items-center text-black"> 
              <input
              value={newItem.name}
              onChange={(e)=>setNewItem({ ...newItem, name: e.target.value})}
              className="col-span-3 p-3 border"
              type="text"
              placeholder="Enter Item"
              />
              <input
              value={newItem.price}
              onChange={(e)=>setNewItem({ ...newItem, price: e.target.value})}


              className="col-span-2 p-3 border mx-3"
              type="number"
              placeholder="Enter $"
              />
              <button
              onClick={addItem}
              className="text-white bg-slate-800 hover:bg-slate-900 p-3 text-xl "
              type="submit"
              > + </button>
             </form>
             <ul>
              {items.map((item,id)=>(
                <li key={id} className="my-4 w-flex flex justify-between bg-slate-900 p-4 rounded-lg  text-white ">
                  <span className="capitalize p-4">{item.name}</span>
                  <span className='p-4'>{item.price}</span>
                  <button onClick={() => deleteItem(item.id)} className="ml-8 p-4 border-l-2 border-slate-900 hover:bg-slate-900 w-16">X</button>
                </li>
              ))}
             </ul>
             <ul className="flex justify-between items-center col-span-6">
              {items.length < 1 ? (
                ''
              ) : (
                <li className="flex justify-between p-3">
                  <span >Total: </span>
                  <span >${total}</span>
                </li>
              )}
             </ul>
           </div>
         </div>
    </main>
  );
}
