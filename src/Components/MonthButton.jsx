import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const MonthButton = ({ onDateChange }) => {
  // Başlangıç tarihi olarak mevcut ay ve yılı ayarla
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    // Sayfa yüklendiğinde mevcut ayı ve yılı üst bileşene geçir
    onDateChange(selectedDate);
  }, [selectedDate, onDateChange]);

  const handleChange = (date) => {
    setSelectedDate(date);
    onDateChange(date); // Üst bileşene seçilen tarihi geçiyoruz
  };

  return (
    <DatePicker
      className='monthButton'
      selected={selectedDate}
      onChange={handleChange}
      dateFormat="MM/yyyy"
      showMonthYearPicker
      showFullMonthYearPicker
      showTwoColumnMonthYearPicker
      customInput={
        <button>
          {selectedDate ? selectedDate.toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' }) : 'Ay Seç'}
        </button>
      }
    />
  );
};

export default MonthButton;
