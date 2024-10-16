"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const Home: React.FC = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const Swal = require('sweetalert2');
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

  const deleteBooking = async (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You Are about to delete this booking ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`http://localhost:5000/api/booking/${id}`, {
            method: 'DELETE',
          });
    
          if (res.ok) {
            // Me hek elementin qe osht fshij prej Listes
            setBookings(prevBookings => prevBookings.filter(booking => booking.id !== id));
          } else {
            const errorData = await res.json();
            console.error('Failed to delete booking:', errorData.message);
          }
        } catch (error) {
          console.error('Error deleting booking:', error);
        }

        Swal.fire({
          title: "Deleted!",
          text: "This Booking has been deleted.",
          icon: "success"
        });
      }
    });
  };
  
  return (
    <div className="container">
      <div className="box">
        <h2>
          <span>Pabau Task</span> <Link href="/booking/new"><button>Book Now</button></Link>
        </h2>
        <ul>
          {bookings.map((booking, index) => (
            <li key={booking.id}>
              <Link href={`/booking/${booking.id}`}>
              <span>{index + 1}</span>
              A Booking on {formatDate(booking.date)} starting at {booking.start_time}
              </Link>
              <button className="deleteButton" onClick={() => deleteBooking(booking.id)}>x</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
