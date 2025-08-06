"use client";

import { auth, database, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

//import { database } from '../lib/firebase';
import { ref, push, set, get, update } from 'firebase/database';

const Welcome = () => {
  const [userDetails, setUserDetails] = useState({
    isFetching: true,
  });

  const router = useRouter();

  async function fetchuser() {
    auth.onAuthStateChanged(async (user) => {
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails({
          ...user,
          ...docSnap.data(),
          isFetching: false,
          error: "",
        });
      } else {
        setUserDetails({
          uid: null,
          isFetching: false,
          error: "user not found",
        });
        router.push("/login");
      }
    });
  }

  useEffect(() => {
    fetchuser();
  }, []);

  const [playerName, setPlayerName] = useState('');
  const [roomId, setRoomId] = useState('');
  const [joinedRoomData, setJoinedRoomData] = useState(null);
  const [error, setError] = useState('');

  // Create a new room
  const handleCreateRoom = async () => {
    if (!playerName) return alert('Enter your name');

    const roomsRef = ref(database, 'rooms');
    const newRoomRef = push(roomsRef); // unique ID

    await set(newRoomRef, {
      players: {
        host: { name: playerName }
      },
      gameState: 'waiting'
    });

    setRoomId(newRoomRef.key);
    setJoinedRoomData({ roomId: newRoomRef.key, host: playerName });
    setError('');
  };

  // Join an existing room
  const handleJoinRoom = async () => {
    if (!playerName || !roomId) return alert('Enter your name and room ID');

    const roomRef = ref(database, `rooms/${roomId}`);
    const snapshot = await get(roomRef);

    if (snapshot.exists()) {
      const timestamp = Date.now().toString();
      await update(roomRef, {
        [`players/${timestamp}`]: { name: playerName }
      });
      setJoinedRoomData({ roomId, player: playerName });
      setError('');
    } else {
      setError('Room not found');
    }
  };

  console.log("check user details", userDetails);

  if (userDetails.isFetching)
    return (
      <>
        <div>Fetching user please wait</div>
      </>
    );
  if (userDetails.uid) {
    return (
      <>
        <div>
          Hi {userDetails.fName} Welcome
          <br />
          I already have a room id?
          <br />
          Create Room And Play


           <div style={{ padding: 20 }}>
      <h1> Game Room Lobby</h1>

      <input
        type="text"
        placeholder="Your Name"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        style={{ marginBottom: 10, display: 'block' }}
      />

      <button onClick={handleCreateRoom}>Create Room</button>

      <hr style={{ margin: '20px 0' }} />

      <input
        type="text"
        placeholder="Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        style={{ marginBottom: 10, display: 'block' }}
      />

      <button onClick={handleJoinRoom}>Join Room</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {joinedRoomData && (
        <div style={{ marginTop: 20 }}>
          <h3>✅ Joined Room</h3>
          <p><strong>Room ID:</strong> {joinedRoomData.roomId}</p>
          <p><strong>Your Name:</strong> {playerName}</p>
        </div>
      )}
    </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div>Hi Player , play with computer</div>
      </>
    );
  }
};

export default Welcome;
