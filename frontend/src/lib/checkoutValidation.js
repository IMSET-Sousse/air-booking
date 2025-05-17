export const validateCheckoutForm = (formData) => {
  const errors = {};
  if (!formData.name.trim()) errors.name = "Name is required.";
  if (!formData.email.trim()) errors.email = "Email is required.";
  else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Email is invalid.";
  if (!formData.address.trim()) errors.address = "Address is required.";
  if (!formData.city.trim()) errors.city = "City is required.";
  if (!formData.postalCode.trim()) errors.postalCode = "Postal code is required.";
  
  if (formData.paymentMethod === 'card') {
    if (!formData.cardNumber.trim()) errors.cardNumber = "Card number is required.";
    else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) errors.cardNumber = "Card number must be 16 digits.";
    if (!formData.expiryDate.trim()) errors.expiryDate = "Expiry date is required.";
    else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) errors.expiryDate = "Expiry date must be MM/YY format.";
    if (!formData.cvv.trim()) errors.cvv = "CVV is required.";
    else if (!/^\d{3,4}$/.test(formData.cvv)) errors.cvv = "CVV must be 3 or 4 digits.";
  }
  
  return errors;
};