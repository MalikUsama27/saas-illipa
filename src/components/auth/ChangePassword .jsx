import React, { useState } from 'react';
import axios from 'axios';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Eye, EyeSlash } from 'react-bootstrap-icons'; 
import { toast, ToastContainer } from 'react-toastify';

const ChangePassword = ({ show, handleClose, otp }) => {
    const [newPassword, setNewPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [error, setError] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false); 
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); 

    const handleNewPasswordChange = (e) => setNewPassword(e.target.value);
    const handleConfirmPasswordChange = (e) => setPasswordConfirmation(e.target.value);

    const handlePasswordChangeFunction = async () => {
        if (newPassword !== passwordConfirmation) {
            setError('Passwords do not match');
            return;
        }
    const email=    localStorage.getItem('email');
        try {
            const response = await axios.post('https://ilipaone.com/api/forgot-update', {
                email,
                otp,
                password: newPassword,
            });
            if (response.data.message) {
                toast.success('Password update successful.');
                handleClose(); 
            } else {
                console.log('Failed to update password');
                setError('Failed to update password');
            }
        } catch (error) {
            console.error('Error updating password:', error);
            setError('An error occurred while updating the password');
        }
    };

    return (
        <Dialog
            visible={show}
            onHide={handleClose}
            style={{ width: '60vw', padding: '20px' }}
            modal
            closeOnEscape={true}
            dismissableMask={true}
            header={
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Change Password</span>
                </div>
            }
        >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div className="p-field">
                    <label htmlFor="newPassword">New Password</label>
                    <div style={{ position: 'relative' }}>
                        <InputText
                            id="newPassword"
                            type={showNewPassword ? 'text' : 'password'}
                            value={newPassword}
                            onChange={handleNewPasswordChange}
                            placeholder="Enter new password"
                            style={{ width: '100%' }}
                        />
                        <Button
                            icon={showNewPassword ?   <Eye />:<EyeSlash />}
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}
                            className="p-button-text"
                        />
                    </div>
                </div>
                <div className="p-field">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <div style={{ position: 'relative' }}>
                        <InputText
                            id="confirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={passwordConfirmation}
                            onChange={handleConfirmPasswordChange}
                            placeholder="Confirm new password"
                            style={{ width: '100%' }}
                        />
                        <Button
                            icon={showConfirmPassword ? <Eye /> : <EyeSlash />}
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}
                            className="p-button-text"
                        />
                    </div>
                </div>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button label="Change Password" onClick={handlePasswordChangeFunction} />
                </div>
            </div>
            <ToastContainer />
        </Dialog>
    );
};

export default ChangePassword;
