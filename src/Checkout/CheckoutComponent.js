import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../CartModule/CartContext';
import NavbarComp from '../Navbar/NavbarComp';
import FooterComp from '../Footer/FooterComp';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CheckoutComponent.css';
import CreditCardModal from '../PaymentModule/CreditCardModal';
import UPIModal from '../PaymentModule/UPIModal';
import CashOnDeliveryModal from '../PaymentModule/CashOnDeliveryModal';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartCourses, totalAmountCalculation } = useCart();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    country: 'India',
    streetAddress: '',
    apartment: '',
    city: '',
    state: '',
    pinCode: '',
    phone: '',
    email: '',
  });
  const [showModal, setShowModal] = useState(false);
  const [showCreditCardModal, setShowCreditCardModal] = useState(false);
  const [showUPIModal, setShowUPIModal] = useState(false);
  const [showCODModal, setShowCODModal] = useState(false);
  const [sellerAddress] = useState('123 Book Street, Booktown, BK 12345');
  const [deliveryMode, setDeliveryMode] = useState('standard');
  const [paymentType, setPaymentType] = useState('cod');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (cartCourses.length === 0) {
      navigate('/cart');
    }
  }, [cartCourses, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, streetAddress, city, state, pinCode, phone, email } = formData;
    if (!firstName || !lastName || !streetAddress || !city || !state || !pinCode || !phone || !email) {
      setErrorMessage('Please enter all the details');
    } else {
      setErrorMessage('');
      localStorage.setItem('checkoutData', JSON.stringify(formData));
      console.log('Checkout data submitted:', formData);
      setShowModal(true);
    }
  };

  const handleConfirmOrder = () => {
    setShowModal(false);
    if (paymentType === 'cod') {
      setShowCODModal(true);
    } else {
      navigate('/confirmation');
    }
  };

  const handleBackToCart = () => {
    navigate('/cart');
  };

  const handlePaymentTypeChange = (type) => {
    setPaymentType(type);
    if (type === 'credit') {
      setShowCreditCardModal(true);
      setShowUPIModal(false);
      setShowCODModal(false);
    } else if (type === 'upi') {
      setShowUPIModal(true);
      setShowCreditCardModal(false);
      setShowCODModal(false);
    } else if (type === 'cod') {
      setShowCODModal(true);
      setShowCreditCardModal(false);
      setShowUPIModal(false);
    }
  };

  return (
    <div>
      <NavbarComp />
      <div className="checkout-page mt-5 mb-5">
        <h2 className="text-center">Checkout</h2>
        <div className="checkout-container animated-container">
          <div className="checkout-form animated-form">
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>First Name <span className="required">*</span></label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Last Name <span className="required">*</span></label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Country / Region <span className="required">*</span></label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="India">India</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Street Address <span className="required">*</span></label>
                  <input
                    type="text"
                    name="streetAddress"
                    value={formData.streetAddress}
                    onChange={handleInputChange}
                    placeholder="House number and street name"
                    required
                  />
                  <input
                    type="text"
                    name="apartment"
                    value={formData.apartment}
                    onChange={handleInputChange}
                    className='mt-2'
                    placeholder="Apartment, suite, unit, etc. (optional)"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Town / City <span className="required">*</span></label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>State <span className="required">*</span></label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select an option...</option>
                    <option value="State1">Tamil Nadu</option>
                    <option value="State2">Kerala</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>PIN Code <span className="required">*</span></label>
                  <input
                    type="text"
                    name="pinCode"
                    value={formData.pinCode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Phone <span className="required">*</span></label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Email Address <span className="required">*</span></label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </form>
          </div>
          <div className="order-summary animated-summary">
            <h3>Order Summary</h3>
            <ul>
              {cartCourses.map((item) => (
                <li key={item.product.id}>
                  {item.product.name} - ₹{item.product.newPrice} x {item.quantity}
                </li>
              ))}
            </ul>
            <p>Total: ₹{totalAmountCalculation()}</p>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button className="btn-confirm-order animated-button" onClick={handleSubmit}>CONFIRM ORDER</button>
            <br />
            <button className="btn-back-to-cart" onClick={handleBackToCart}>BACK TO CART</button>
          </div>
        </div>
      </div>
      <FooterComp />

      <Modal show={showModal} onHide={() => setShowModal(false)} dialogClassName="modal-left">
        <Modal.Header closeButton>
          <Modal.Title style={{color: '#122c6f', fontWeight: '600'}}>Order Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Seller Address:</strong> {sellerAddress}</p>
          <Form>
            <Form.Group>
              <Form.Label>Mode of Delivery</Form.Label>
              <div className="delivery-options">
                <button
                  type="button"
                  className={`delivery-option ${deliveryMode === 'home' ? 'selected' : ''}`}
                  onClick={() => setDeliveryMode('home')}
                >
                  <i className="fa-solid fa-user-group checkout-icon"></i> Local Pickup
                </button>
                <button
                  type="button"
                  className={`delivery-option ${deliveryMode === 'collect' ? 'selected' : ''}`}
                  onClick={() => setDeliveryMode('collect')}
                >
                  <i className="fa-solid fa-box-open checkout-icon"></i> Courier
                </button>
              </div>
            </Form.Group>
            <Form.Group>
              <Form.Label>Payment Type</Form.Label>
              <div className="payment-options">
                <button
                  type="button"
                  className={`payment-option ${paymentType === 'cod' ? 'selected' : ''}`}
                  onClick={() => handlePaymentTypeChange('cod')}
                >
                  <i className="fa-solid fa-money-bill-wave"></i> Cash on Delivery
                </button>
                <button
                  type="button"
                  className={`payment-option ${paymentType === 'credit' ? 'selected' : ''}`}
                  onClick={() => handlePaymentTypeChange('credit')}
                >
                  <i className="fa-solid fa-credit-card"></i> Credit Card
                </button>
                <button
                  type="button"
                  className={`payment-option ${paymentType === 'upi' ? 'selected' : ''}`}
                  onClick={() => handlePaymentTypeChange('upi')}
                >
                  <i className="fa-solid fa-mobile-alt"></i> UPI
                </button>
              </div>
            </Form.Group>
          </Form>
          <Button variant="primary" onClick={handleConfirmOrder}>Confirm Order</Button>
        </Modal.Body>
      </Modal>

      <CreditCardModal
        show={showCreditCardModal}
        handleClose={() => setShowCreditCardModal(false)}
      />
      <UPIModal
        show={showUPIModal}
        handleClose={() => setShowUPIModal(false)}
      />
      <CashOnDeliveryModal
        show={showCODModal}
        handleClose={() => setShowCODModal(false)}
      />
    </div>
  );
};

export default CheckoutPage;
