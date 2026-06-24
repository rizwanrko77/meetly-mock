import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BookingProfileSidebar } from '../components/public/BookingProfileSidebar';
import { EventSelectionStep } from '../components/public/EventSelectionStep';
import { BookingFormStep } from '../components/public/BookingFormStep';

export function PublicBookingPage() {
  const { username } = useParams();
  const navigate = useNavigate();
  
  // Mock settings that would normally be fetched based on username
  const mockSettings = {
    pageTitle: 'My Scheduling Page',
    welcomeMessage: 'Welcome to my scheduling page. Please follow the instructions to add an event to my calendar.',
    themeColor: '#4f46e5'
  };

  const [step, setStep] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
    setStep(3); // Skip step 2, go straight to confirmation modal
  };

  const handleConfirm = () => {
    // Navigate back to home or a distinct success page
    navigate('/');
  };

  const handleCancelModal = () => {
    setStep(1);
    setSelectedEvent(null);
  };

  const handleBack = () => {
    if (step === 3) {
      setStep(1);
      setSelectedEvent(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 sm:p-6 font-sans">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200 flex flex-col md:flex-row min-h-[600px] relative">
        <BookingProfileSidebar 
          step={step}
          onBack={handleBack}
          selectedEvent={selectedEvent}
          selectedTime={selectedEvent?.time}
          settings={mockSettings}
        />
        
        {/* We always render EventSelectionStep so it stays in the background when the modal is open */}
        <EventSelectionStep 
          onSelect={handleEventSelect} 
          themeColor={mockSettings.themeColor} 
        />
        
        {step === 3 && (
          <BookingFormStep 
            onConfirm={handleConfirm}
            onCancel={handleCancelModal}
            themeColor={mockSettings.themeColor}
            selectedEvent={selectedEvent}
          />
        )}
      </div>
    </div>
  );
}
