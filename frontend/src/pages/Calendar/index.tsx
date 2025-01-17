import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import {
  CalendarDaysIcon,
  ClockIcon,
  VideoCameraIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  GlobeAltIcon,
  CheckCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';

interface BookingDetails {
  date: string;
  time: string;
  companyName: string;
  teamSize: string;
  industry: string;
  customIndustry: string;
  useCase: string;
  name: string;
  email: string;
  phone: string;
}

const Calendar = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>({
    date: '',
    time: '',
    companyName: '',
    teamSize: '',
    industry: '',
    customIndustry: '',
    useCase: '',
    name: '',
    email: '',
    phone: '',
  });

  // Available time slots for each day
  const getAvailableTimeSlots = (selectedDate: Date) => {
    const currentTime = new Date('2025-01-16T11:17:39-06:00');
    const allTimeSlots = [
      { display: '9:00 AM', value: 9 },
      { display: '10:00 AM', value: 10 },
      { display: '11:00 AM', value: 11 },
      { display: '1:00 PM', value: 13 },
      { display: '2:00 PM', value: 14 },
      { display: '3:00 PM', value: 15 },
      { display: '4:00 PM', value: 16 },
    ];

    // If selected date is today, filter out past times
    if (selectedDate.toDateString() === currentTime.toDateString()) {
      const currentHour = currentTime.getHours();
      // Add 1 hour buffer for scheduling
      return allTimeSlots.filter(slot => slot.value > currentHour + 1).map(slot => slot.display);
    }

    // For future dates, show all time slots
    return allTimeSlots.map(slot => slot.display);
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    const days = [];
    // Add empty slots for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time: string) => {
    if (selectedDate) {
      const formattedDate = selectedDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      setBookingDetails({
        ...bookingDetails,
        date: formattedDate,
        time: time,
      });
      setStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBookingDetails({ ...bookingDetails, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Here you would typically send the booking details to your backend
    console.log('Booking details:', bookingDetails);
  };

  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  const isPastDate = (date: Date) => {
    const currentTime = new Date('2025-01-16T11:17:39-06:00');
    const today = new Date(currentTime);
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4">
              <div className={`flex items-center ${step >= 1 ? 'text-primary' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                  step >= 1 ? 'border-primary bg-primary text-white' : 'border-gray-300'
                }`}>
                  1
                </div>
                <span className="ml-2">Select Time</span>
              </div>
              <div className={`w-16 h-0.5 ${step >= 2 ? 'bg-primary' : 'bg-gray-300'}`} />
              <div className={`flex items-center ${step >= 2 ? 'text-primary' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                  step >= 2 ? 'border-primary bg-primary text-white' : 'border-gray-300'
                }`}>
                  2
                </div>
                <span className="ml-2">Company Details</span>
              </div>
              <div className={`w-16 h-0.5 ${step >= 3 ? 'bg-primary' : 'bg-gray-300'}`} />
              <div className={`flex items-center ${step >= 3 ? 'text-primary' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                  step >= 3 ? 'border-primary bg-primary text-white' : 'border-gray-300'
                }`}>
                  3
                </div>
                <span className="ml-2">Confirmation</span>
              </div>
            </div>
          </div>

          {step === 1 && (
            <>
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Schedule a Call with Our Team</h1>
                <p className="text-lg text-gray-600">
                  Choose a time that works best for you to learn more about AI Agents
                </p>
              </div>

              {/* Meeting Info */}
              <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
                <h2 className="text-xl font-semibold mb-4">Meeting Details</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-600">
                    <VideoCameraIcon className="w-6 h-6 text-primary" />
                    <span>30-minute video call with our AI Solutions Team</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <CalendarDaysIcon className="w-6 h-6 text-primary" />
                    <span>Available times shown in your local timezone</span>
                  </div>
                </div>
              </div>

              {/* Calendar */}
              <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={handlePreviousMonth}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <ChevronLeftIcon className="w-5 h-5" />
                  </button>
                  <h2 className="text-lg font-semibold">
                    {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </h2>
                  <button
                    onClick={handleNextMonth}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <ChevronRightIcon className="w-5 h-5" />
                  </button>
                </div>
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {getDaysInMonth(currentMonth).map((date, index) => (
                    <div key={index} className="aspect-square">
                      {date && (
                        <button
                          onClick={() => handleDateSelect(date)}
                          disabled={isWeekend(date) || isPastDate(date)}
                          className={`w-full h-full flex items-center justify-center rounded-lg text-sm
                            ${isWeekend(date) || isPastDate(date)
                              ? 'text-gray-300 cursor-not-allowed'
                              : selectedDate?.toDateString() === date.toDateString()
                              ? 'bg-primary text-white'
                              : 'hover:bg-primary/10'
                            }
                          `}
                        >
                          {date.getDate()}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Time Slots */}
              {selectedDate && (
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-lg font-semibold mb-4">
                    Available Times for {selectedDate.toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    {getAvailableTimeSlots(selectedDate).map((time) => (
                      <button
                        key={time}
                        onClick={() => handleTimeSelect(time)}
                        className="px-4 py-3 text-center border border-gray-200 rounded-lg hover:border-primary hover:bg-primary hover:text-white transition-all duration-200"
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                  {getAvailableTimeSlots(selectedDate).length === 0 && (
                    <p className="text-center text-gray-500 mt-4">
                      No available time slots for this date. Please select another date.
                    </p>
                  )}
                </div>
              )}
            </>
          )}

          {step === 2 && (
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Tell us about your company</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      value={bookingDetails.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                    <input
                      type="text"
                      name="companyName"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      value={bookingDetails.companyName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      value={bookingDetails.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      value={bookingDetails.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                  <select
                    name="industry"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    value={bookingDetails.industry}
                    onChange={handleInputChange}
                  >
                    <option value="">Select your industry</option>
                    <option value="technology">Technology</option>
                    <option value="finance">Finance</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="retail">Retail</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="other">Other</option>
                  </select>
                  {bookingDetails.industry === 'other' && (
                    <input
                      type="text"
                      name="customIndustry"
                      placeholder="Please specify your industry"
                      required
                      className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      value={bookingDetails.customIndustry}
                      onChange={handleInputChange}
                    />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Team Size</label>
                  <select
                    name="teamSize"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    value={bookingDetails.teamSize}
                    onChange={handleInputChange}
                  >
                    <option value="">Select team size</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-500">201-500 employees</option>
                    <option value="501+">501+ employees</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    What would you like to achieve with AI Agents?
                  </label>
                  <textarea
                    name="useCase"
                    required
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    value={bookingDetails.useCase}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="flex justify-between items-center pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setStep(1);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-6 py-2 text-gray-600 hover:text-gray-900"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === 3 && (
            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircleIcon className="w-8 h-8 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Booking Confirmed!</h2>
              <p className="text-gray-600 mb-6">
                Your meeting is scheduled for {bookingDetails.date} at {bookingDetails.time}
              </p>
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold mb-2">Next Steps</h3>
                <p className="text-gray-600">
                  You'll receive a calendar invitation and meeting details shortly. Our team is looking forward to meeting with you!
                </p>
              </div>
              <button
                onClick={() => navigate('/')}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
              >
                Return to Home
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Calendar;
