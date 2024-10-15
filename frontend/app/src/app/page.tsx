"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const Home: React.FC = () => {
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const res = await fetch('http://localhost:5000/api/bookings', { cache: 'no-store' });
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await res.json();
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    }

    fetchBookings();
  }, []); 

  function formatDate(isoDate: string) {
    const date = new Date(isoDate);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  }

  return (
    <div className="container">
      <div className="box">
        <h2>
          <span>Pabau Task</span> <Link href="/booking/new"><button>Book Now</button></Link>
        </h2>
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id}>
              <Link href={`/booking/${booking.id}`}>
              <span>{booking.id}</span>
              A Booking on {formatDate(booking.date)} starting at {booking.start_time}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
