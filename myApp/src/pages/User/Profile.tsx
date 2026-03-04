// src/pages/User/Profile.tsx
import React, { useState } from 'react';
import {
  IonPage,
  IonContent,
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonInput,
  IonList,
  IonListHeader,
} from '@ionic/react';
import { personOutline, mailOutline, callOutline, logOutOutline, settingsOutline } from 'ionicons/icons';
import { useTheme } from '../../context/ThemeContext';
import PageHeader from '../../components/PageHeader';
import { useAuth } from '../../context/AuthContext';

const UserProfile: React.FC = () => {
  const { isDarkMode } = useTheme();
  const { logout } = useAuth();
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567'
  });

  const handleLogout = () => {
    logout();
  };

  return (
    <IonPage>
      <PageHeader title="My Profile" showBack={true} backHref="/user/home" />

      <IonContent style={{ '--background': 'var(--ion-background-color)' } as any}>
        <div style={{ padding: '24px 16px' }}>
          {/* Profile Avatar Section */}
          <div style={{
            textAlign: 'center',
            marginBottom: '32px',
            paddingTop: '16px'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
              margin: '0 auto 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <IonIcon 
                icon={personOutline} 
                style={{ fontSize: '40px', color: '#FFFFFF' }} 
              />
            </div>
            <h1 style={{ 
              fontSize: '24px', 
              fontWeight: 700, 
              color: 'var(--ion-text-color)',
              margin: '0 0 8px 0'
            }}>
              {profile.name}
            </h1>
            <p style={{ 
              fontSize: '14px', 
              color: 'var(--ion-text-color-secondary)',
              margin: 0
            }}>
              Member since 2024
            </p>
          </div>

          {/* Profile Information */}
          <div style={{
            background: 'var(--ion-card-background)',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '24px',
            border: '1px solid var(--ion-border-color)'
          }}>
            <h3 style={{ 
              fontSize: '14px', 
              fontWeight: 600, 
              color: 'var(--ion-text-color)', 
              marginBottom: '16px',
              textTransform: 'uppercase',
              opacity: 0.7
            }}>
              Contact Information
            </h3>

            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <IonIcon icon={personOutline} style={{ marginRight: '8px', color: '#6366F1' }} />
                <label style={{ fontSize: '12px', color: 'var(--ion-text-color-secondary)' }}>Full Name</label>
              </div>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid var(--ion-border-color)',
                  background: isDarkMode ? '#111827' : '#F9FAFB',
                  color: 'var(--ion-text-color)',
                  fontFamily: 'inherit',
                  fontSize: '14px'
                }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <IonIcon icon={mailOutline} style={{ marginRight: '8px', color: '#6366F1' }} />
                <label style={{ fontSize: '12px', color: 'var(--ion-text-color-secondary)' }}>Email</label>
              </div>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({...profile, email: e.target.value})}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid var(--ion-border-color)',
                  background: isDarkMode ? '#111827' : '#F9FAFB',
                  color: 'var(--ion-text-color)',
                  fontFamily: 'inherit',
                  fontSize: '14px'
                }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <IonIcon icon={callOutline} style={{ marginRight: '8px', color: '#6366F1' }} />
                <label style={{ fontSize: '12px', color: 'var(--ion-text-color-secondary)' }}>Phone</label>
              </div>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile({...profile, phone: e.target.value})}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid var(--ion-border-color)',
                  background: isDarkMode ? '#111827' : '#F9FAFB',
                  color: 'var(--ion-text-color)',
                  fontFamily: 'inherit',
                  fontSize: '14px'
                }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <IonButton
            expand="block"
            style={{
              '--background': '#6366F1',
              '--border-radius': '8px',
              height: '48px',
              fontSize: '16px',
              fontWeight: 600,
              marginBottom: '12px'
            }}
          >
            <IonIcon icon={settingsOutline} slot="start" />
            Settings
          </IonButton>

          <IonButton
            expand="block"
            color="danger"
            style={{
              '--border-radius': '8px',
              height: '48px',
              fontSize: '16px',
              fontWeight: 600
            }}
            onClick={handleLogout}
          >
            <IonIcon icon={logOutOutline} slot="start" />
            Sign Out
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default UserProfile;
