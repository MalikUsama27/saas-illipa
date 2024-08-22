import React, { useState } from 'react';
import axios from 'axios';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChangePassword from './ChangePassword ';


const ForgotPassword = ({ visible, onHide }) => {
    const [email, setEmail] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [showChangePassword, setShowChangePassword] = useState(false);

    const handleButtonClick = async () => {
        if (!otpSent) {
            try {
                const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/forgot-password`, { email });
                localStorage.setItem('email', email); 
                if (response.data.message === 'No user found.') {
                    toast.error('No user found with this email address. Please check and try again.');
                } else if (response.data.message) {
                    setOtpSent(true);
                    toast.success('OTP sent to your email. Please check your inbox.');
                } else {
                    toast.error('Failed to send OTP. Please try again.');
                }
            } catch (error) {
                console.error('Error sending OTP:', error);
                toast.error('An error occurred while sending OTP. Please try again.');
            }
        } else {
            try {
                const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/forgot-verification`, { email, otp });
                if (response.data.message) {
                    toast.success('OTP verified successfully.');
                    setShowChangePassword(true);
                    onHide(); // Close the Forgot Password dialog
                } else {
                    toast.error('Failed to verify OTP. Please try again.');
                }
            } catch (error) {
                console.error('Error verifying OTP:', error);
                toast.error('An error occurred while verifying OTP. Please try again.');
            }
        }
    };

    return (
        <>
            <Dialog
                header="Forgot Password"
                visible={visible}
                onHide={onHide}
                style={{ width: '50vw', padding: '20px' }}
                modal
                closeOnEscape={true}
                dismissableMask={true}
            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div className="p-field">
                        <label htmlFor="email">Email</label>
                        <InputText
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            style={{ width: '100%' }}
                        />
                    </div>
                    {otpSent && (
                        <div className="p-field">
                            <label htmlFor="otp">OTP</label>
                            <InputText
                                id="otp"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="Enter OTP"
                                style={{ width: '100%' }}
                            />
                        </div>
                    )}
                    <Button
                        label={otpSent ? 'Verify OTP' : 'Send OTP'}
                        onClick={handleButtonClick}
                        style={{ marginTop: '10px',width: '30%' ,borderRadius:'15px',backgroundColor:'#06163A'}}
                    />
                </div>
            </Dialog>
            
            <ChangePassword
                show={showChangePassword}
                handleClose={() => setShowChangePassword(false)}
                email={email}
                otp={otp} 
            />
            <ToastContainer />
        </>
    );
};

export default ForgotPassword;
