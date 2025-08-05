import React, { use, useEffect, useState } from "react";

const User = ({ user }) => {

const [cards , setCards] = useState([])

useEffect(()=>{

//   const sorted = user.cards.sort((x ,y)=>{
// const [charX , numX] = x.split("-")
// const [charY , numY] = y.split("-")
    
// if()
//        return x.localeCompare(y)

//     else
//        return x.localeCompare(y)
//     })

//     console.log("sirted" ,sorted ) 

},[user ])

  return (
    <div className="user">
      {user.userName || ""}
      {user.cards.length && (
        <div className="mainWrapper">
          {user.cards?.map((card) => {

            const [siut , number] =  card.split("-")

            return (
            <div key={card} className={`${siut} mainCards`}>{ card}</div>
          )
          })}
        </div>
      )}
    </div>
  );
};

export default User;
