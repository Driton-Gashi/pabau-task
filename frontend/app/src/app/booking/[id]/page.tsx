"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const BookingPage = () => {
  const [booking, setBooking] = useState<any>(null); 
  const [error, setError] = useState<string | null>(null); 
 const params = useParams();

  const id = params.id; 
  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/booking/${id}`, { cache: 'no-store' });
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await res.json();
        setBooking(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchBooking();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!booking) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="container">
      <div className="box">
        <h2>
          <span>Pabau Task</span>
          <Link href="/">
            <button>Go Back</button>
          </Link>
        </h2>
        <ul>
          <li>
            This Booking is with {booking.doctor_name} for {booking.service} and it ends on {booking.end_time}.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BookingPage;
