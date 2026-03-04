// src/components/Auth/GuestPromptModal.tsx
import React from 'react';
import {
  IonModal,
  IonContent,
  IonButton,
  IonIcon,
  IonText,
  IonHeader,
  IonToolbar,
} from '@ionic/react';
import { personAddOutline, logInOutline, closeOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

interface GuestPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue?: () => void;
}

const GuestPromptModal: React.FC<GuestPromptModalProps> = ({ isOpen, onClose, onContinue }) => {
  const history = useHistory();

  const handleRegister = () => {
    onClose();
    history.push('/register');
  };

  const handleLogin = () => {
    onClose();
    history.push('/login');
  };

  return (
    <IonModal 
      isOpen={isOpen} 
      onDidDismiss={onClose}
      className="guest-prompt-modal"
      breakpoints={[0, 0.4]}
      initialBreakpoint={0.4}
    >
      <IonContent className="ion-padding">
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <div 
            style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #d70f64 0%, #ff6b9d 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px'
            }}
          >
            <IonIcon icon={personAddOutline} style={{ fontSize: '40px', color: 'white' }} />
          </div>
          
          <IonText>
            <h2 style={{ margin: '0 0 10px', fontWeight: 700, color: '#2d3436' }}>
              Almost there! 🎉
            </h2>
            <p style={{ margin: '0 0 30px', color: '#636e72', lineHeight: 1.6 }}>
              Create an account or login to complete your order and enjoy exclusive deals!
            </p>
          </IonText>

          <IonButton
            expand="block"
            className="rider-button"
            style={{ 
              '--background': '#d70f64',
              marginBottom: '12px',
              height: '50px',
              fontSize: '16px'
            }}
            onClick={handleRegister}
          >
            <IonIcon slot="start" icon={personAddOutline} />
            Register Now
          </IonButton>

          <IonButton
            expand="block"
            fill="outline"
            className="rider-button"
            style={{ 
              '--border-color': '#d70f64',
              '--color': '#d70f64',
              marginBottom: '12px',
              height: '50px',
              fontSize: '16px'
            }}
            onClick={handleLogin}
          >
            <IonIcon slot="start" icon={logInOutline} />
            Login
          </IonButton>

          <IonButton
            fill="clear"
            style={{ '--color': '#636e72' }}
            onClick={onClose}
          >
            Continue Browsing
          </IonButton>
        </div>
      </IonContent>
    </IonModal>
  );
};

export default GuestPromptModal;