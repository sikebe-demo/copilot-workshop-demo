export function validateBooking(input) {
  const errors = [];

  if (!input || typeof input !== 'object') {
    return ['booking is required'];
  }

  if (!input.guestName || input.guestName.trim().length === 0) {
    errors.push('guestName is required');
  }

  if (!input.checkInDate) {
    errors.push('checkInDate is required');
  }

  if (!input.checkOutDate) {
    errors.push('checkOutDate is required');
  }

  if (input.checkInDate && input.checkOutDate && new Date(input.checkOutDate) <= new Date(input.checkInDate)) {
    errors.push('checkOutDate must be after checkInDate');
  }

  if (!Number.isInteger(input.guests) || input.guests < 1) {
    errors.push('guests must be at least 1');
  }

  return errors;
}

export function summarizeBooking(input) {
  const nights = Math.max(1, Math.ceil((new Date(input.checkOutDate) - new Date(input.checkInDate)) / 86400000));
  return `${input.guestName}: ${nights} night(s), ${input.guests} guest(s)`;
}