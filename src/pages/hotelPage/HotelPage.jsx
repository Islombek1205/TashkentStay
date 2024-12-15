// HotelPage.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../firebase/config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import "./HotelPage.css";

function HotelPage() {
  const { hotelId } = useParams(); // Tanlangan mehmonxona ID sini olish
  const [hotel, setHotel] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const hotelRef = doc(db, 'hotels', hotelId);
        const hotelSnap = await getDoc(hotelRef);

        if (hotelSnap.exists()) {
          setHotel(hotelSnap.data());
        } else {
          setError('Mehmonxona topilmadi');
        }
      } catch (err) {
        setError('Xatolik yuz berdi: ' + err.message);
      }
    };
    fetchHotel();
  }, [hotelId]);

  const handleBooking = async (roomKey) => {
    if (!hotel.rooms[roomKey].isBooked) {
      try {
        const roomRef = doc(db, 'hotels', hotelId);
        await updateDoc(roomRef, {
          [`rooms.${roomKey}.isBooked`]: true
        });
        alert('Xona bron qilindi!');
        navigate('/');
      } catch (error) {
        setError('Bron qilishda xatolik yuz berdi');
      }
    } else {
      alert('Bu xona allaqachon bron qilingan');
    }
  };

  if (error) return <p>{error}</p>;
  if (!hotel) return <p className='loader'></p>;

  return (
    <div className='hotelContainer'>
      <h1>{hotel.name}</h1>
      <p className='aboutHotel'>{hotel.aboutHotel}</p>
      <h2>Xonalar</h2>
      <p className='aboutRooms'>{hotel.aboutRooms}</p>
      <div className="roomsContainer">
        {Object.keys(hotel.rooms).map((roomKey) => {
          const room = hotel.rooms[roomKey];
          return (
            <div 
              className="roomCard" 
              key={roomKey} 
              style={{ backgroundImage: `url(${room.image})` }}
            >
              <div className="roomDetails">
                <div className="roomDetailsTxt">
                  <h4>{room.type}</h4>
                  <p>Price: ${room.price}</p>
                  <p>Status: {room.isBooked ? 'Bron qilingan' : 'Mavjud'}</p>
                </div>
                {!room.isBooked && (
                  <button onClick={() => handleBooking(roomKey)}>Bron qilish</button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <p className='address'>Bizning manzil : {hotel.address}</p>
    </div>
  );
}

export default HotelPage;
