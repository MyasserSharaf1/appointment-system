const generateTimeSlots = (date) => {
    const slots = [];
    const hours = [9, 10, 11, 14, 15]; // 9AM-11AM, 2PM-3PM
    
    hours.forEach(hour => {
      const time = new Date(date);
      time.setHours(hour, 0, 0, 0);
      slots.push(time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    });
    
    return slots;
  };
  
  const isTimeSlotValid = (timeSlot, date) => {
    const validSlots = generateTimeSlots(date);
    return validSlots.includes(timeSlot);
  };
  
  module.exports = { generateTimeSlots, isTimeSlotValid };