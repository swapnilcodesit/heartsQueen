"use client";
import { cards } from "@/constant/constants";
import {
  distribute,
  getNewPosition,
  getShuffledCards,
} from "@/functions/functions";
import React, { createContext, useReducer } from "react";
import User from "./User";

const initialState = {
  mainCards: cards,
  shuffledCards: [],
  assignedCardsPlayer: {},
  hands: [],
  currentHand: {},
  numberOfMembers: [
    { userName: "Abhijit", cards: [], hands: [], points: 0, id: 3 },
    { userName: "Swapnil", cards: [], hands: [], points: 0, id: 4 },
    { userName: "Bhushan", cards: [], hands: [], points: 0, id: 7 },
    { userName: "Prashant", cards: [], hands: [], points: 0, id: 2 },
  ],
  setUser: [],
  currentUserDetails: {
    name: "swapnil",
    id: 4,
    mobile: null,
    emailId: null,
    stats: {},
  },
  initiateduser: {
    name: "Prashant",
    id: 2,
    mobile: null,
    emailId: null,
    stats: {},
  },
  shuffleState: {
    userId: null,
    userName: "",
    direction: "clock",
    round: 1,
    roundId: null,
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "addUserDetails":
      return { ...state, currentUserDetails: { ...action.payload } };
    case "shuffleCards":
      return { ...state, shuffledCards: getShuffledCards(action.payload) };
    case "setUsers":
      const {
        currentUserDetails,
        numberOfMembers,
        initiateduser: mainUser,
      } = state;

      const id = numberOfMembers.findIndex(
        (user) => user.id === currentUserDetails.id
      );

      const initiatedUser = numberOfMembers.findIndex(
        (user) => user.id === mainUser.id
      );

      const initiatedRight = numberOfMembers.slice(initiatedUser); // [3, 5, 6]
      const initiatedLeft = numberOfMembers.slice(0, initiatedUser); // [1]
      const initiatedNewArr = initiatedRight.concat(initiatedLeft);

      const right = numberOfMembers.slice(id); // [3, 5, 6]
      const left = numberOfMembers.slice(0, id); // [1]

      function getPosition(user) {
        return initiatedNewArr.findIndex((inUser) => inUser.id === user.id);
      }

      const newArr = right.concat(left)?.map((user) => {
        const pos = getPosition(user) + 1;
        const cPos = pos - 1 !== 0 ? pos - 1 : numberOfMembers.length 

        return {
          ...user,
          actualPos: pos,
          currentRoundPosition: cPos,
        };
      });

      return {
        ...state,
        setUser: newArr,
        shuffleState: {
          userId: mainUser.id,
          userName: mainUser.name,
          direction: "clock",
          round: 1,
          roundId: 1,
        },
      };

    case "distributeCards":
      const userCards = distribute(
        state.numberOfMembers.length,
        state.shuffledCards
      );

      const roundId = state.shuffleState.roundId + 1;

      const nextRoundId = roundId > state.setUser.length ? 1 : roundId;

      const newUsers = state.setUser?.map((user) => {
        return {
          ...user,
          cards: userCards[user.currentRoundPosition],
          currentRoundPosition: getNewPosition(
            user.actualPos,
            nextRoundId
          ),
        };
      });

      const konPisa = state.setUser?.find(
        (user) => user.actualPos === nextRoundId
      );

      console.log("kon pisa", konPisa);

      return {
        ...state,
        setUser: [...newUsers],
        shuffleState: {
          userName: konPisa.userName,
          userId: konPisa.id,
          direction:
            state.shuffleState.direction === "clock" ? "anti" : "clock",
          roundId: konPisa.actualPos,
        },
      };

    default:
      return { ...state };
  }
};

export const GameContext = createContext();

const Game = () => {
  const [gameState, gameDispatch] = useReducer(reducer, initialState);

  console.log("see user distribution", gameState);

  return (
    <>
      <GameContext.Provider
        value={{
          gameState,
          gameDispatch,
        }}
      >
        Initiated By {gameState.initiateduser.name}
        Kon pisega {gameState.shuffleState.userName}
        Next direction {gameState.shuffleState.direction}
        <button
          onClick={() => {
            gameDispatch({
              type: "setUsers",
              payload:
                gameState.numberOfMembers.length === 4 ? cards : cardsPlayers3,
            });
          }}
        >
          Set Users
        </button>
        <div>
          <div className="parent">
            {gameState.setUser?.map((user, idx) => {
              return (
                <div key={user.id} className={`div${idx}`}>
                 <User user={user}/>
                </div>
              );
            })}

            <div className="div6">
              <button
                onClick={() =>
                  gameDispatch({
                    type: "shuffleCards",
                    payload:
                      gameState.numberOfMembers.length === 4
                        ? cards
                        : cardsPlayers3,
                  })
                }
              >
                Shufle Cards
              </button>
              {gameState.shuffledCards.length && (
                <button
                  onClick={() => {
                    gameDispatch({
                      type: "distributeCards",
                    });
                  }}
                >
                  Distribute Cards
                </button>
              )}
            </div>
          </div>
        </div>
      </GameContext.Provider>
    </>
  );
};

export default Game;
