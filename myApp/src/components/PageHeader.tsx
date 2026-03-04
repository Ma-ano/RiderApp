import React from 'react';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonBadge, IonBackButton } from '@ionic/react';
import { moon, sunny, cartOutline, personOutline, arrowBack } from 'ionicons/icons';
import { useTheme } from '../context/ThemeContext';

interface PageHeaderProps {
  title?: string;
  showLogo?: boolean;
  showBack?: boolean;
  showBackButton?: boolean;
  backHref?: string;
  cartCount?: number;
  onCartClick?: () => void;
  onProfileClick?: () => void;
  customClass?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title = '',
  showLogo = true,
  showBack = false,
  showBackButton = false,
  backHref = '/guest/home',
  cartCount = 0,
  onCartClick,
  onProfileClick,
  customClass = ''
}) => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <IonHeader className={`ion-no-border ${customClass}`}>
      <IonToolbar
        style={{
          '--background': 'var(--ion-card-background)',
          '--border-color': 'transparent'
        } as any}
      >
        <IonButtons slot="start">
          {showBack || showBackButton ? (
            <IonBackButton 
              defaultHref={backHref} 
              icon={arrowBack}
              style={{ '--color': '#6366F1' }}
            />
          ) : (
            <IonButton onClick={toggleTheme} style={{ '--color': '#6366F1' }}>
              <IonIcon icon={isDarkMode ? sunny : moon} style={{ fontSize: '24px' }} />
            </IonButton>
          )}
        </IonButtons>

        <IonTitle
          style={{
            fontSize: '24px',
            fontWeight: 700,
            color: 'var(--ion-text-color)'
          }}
        >
          {showLogo ? (
            <>
              <span style={{ color: '#6366F1' }}>Rider</span> App
            </>
          ) : (
            title
          )}
        </IonTitle>

        <IonButtons slot="end">
          {onCartClick && (
            <IonButton onClick={onCartClick}>
              <div style={{ position: 'relative' }}>
                <IonIcon icon={cartOutline} style={{ fontSize: '24px', color: '#6366F1' }} />
                {cartCount > 0 && (
                  <IonBadge className="cart-badge">{cartCount}</IonBadge>
                )}
              </div>
            </IonButton>
          )}
          {onProfileClick && (
            <IonButton onClick={onProfileClick}>
              <IonIcon icon={personOutline} style={{ fontSize: '24px', color: 'var(--ion-text-color)' }} />
            </IonButton>
          )}
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default PageHeader;
