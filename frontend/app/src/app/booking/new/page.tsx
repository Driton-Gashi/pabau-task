"use client"; 
import {useRef } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation'
const AddBooking = () => {
  const router = useRouter()
  const Swal = require('sweetalert2')
  const serviceRef = useRef<HTMLInputElement | null>();
  const doctorNameRef = useRef<HTMLInputElement | null>();
  const startTimeRef = useRef<HTMLInputElement | null>();
  const endTimeRef = useRef<HTMLInputElement | null>();
  const dateRef = useRef<HTMLInputElement | null>();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service: serviceRef.current.value,
          doctor_name: doctorNameRef.current.value,
          start_time: startTimeRef.current.value,
          end_time: endTimeRef.current.value,
          date: dateRef.current.value
        }),
      });

      if (!response.ok) {

        // nese response nuk osht OK shfaqe mesazhin 
        Swal.fire({
          title: "Oops!",
          text: `failed to add booking, try again!`,
          icon: "error"
        });
      }else{

        // nese response osht OK shfaqe mesazhin 
        Swal.fire({
          title: "Booking Was Added!",
          text: `Booking with ${doctorNameRef.current.value} for ${serviceRef.current.value} and it starts on ${startTimeRef.current.value} and it ends on ${endTimeRef.current.value}.`,
          icon: "success"
        });
        router.push('/');
      }

      if(serviceRef.current) serviceRef.current.value = "";
      if(doctorNameRef.current) doctorNameRef.current.value = "";
      if(startTimeRef.current) startTimeRef.current.value = "";
      if(endTimeRef.current) endTimeRef.current.value = "";
      if(dateRef.current) dateRef.current.value = "";

    } catch (error: any) {

        // nese ka error shfaqe errorin 
      Swal.fire({
        title: "Oops!",
        text: error.message,
        icon: "error"
      });
    }
  };

  return (
    <div className="container">
      <div className="box form">
        <h2>
          <span>Pabau Task</span> 
          <Link href="/"><button>Go Back</button></Link>
        </h2>
       
        <ul>
          <li>
          <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Service</label>
          <input
            type="text"
            id="service"
            ref={serviceRef}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="doctor_name">Doctor Name</label>
          <input
            type="text"
            id="doctor_name"
           ref={doctorNameRef}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="start_time">Start Time</label>
          <input
            type="time"
            id="start_time"
           ref={startTimeRef}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="end_time">End Time</label>
          <input
            type="time"
            id="end_time"
            ref={endTimeRef}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            ref={dateRef}
            required
          />
        </div>
    <div className="form-group center">
        <button className="submitButton" type="submit">Add Booking</button>
    </div>
      </form>
          </li>
        </ul>
      </div>
      
    </div>
  );
};

export default AddBooking;
