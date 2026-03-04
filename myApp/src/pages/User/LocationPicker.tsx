// src/pages/User/LocationPicker.tsx
import React, { useState, useEffect, useRef } from 'react';
import {
  IonPage,
  IonContent,
  IonButton,
  IonIcon,
  IonFooter,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
} from '@ionic/react';
import { locationOutline, arrowBack } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import PageHeader from '../../components/PageHeader';

const LocationPicker: React.FC = () => {
  const history = useHistory();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const marker = useRef<L.Marker | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationName, setLocationName] = useState('');

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map
    map.current = L.map(mapContainer.current).setView([51.505, -0.09], 13);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map.current);

    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const startLocation = [latitude, longitude] as L.LatLngExpression;
        
        if (map.current) {
          map.current.setView(startLocation, 15);
          addMarker(latitude, longitude);
          setSelectedLocation({ lat: latitude, lng: longitude });
          setLocationName('Current Location');
        }
      });
    }

    // Handle map clicks to set location
    map.current.on('click', (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      addMarker(lat, lng);
      setSelectedLocation({ lat, lng });
      setLocationName(`${lat.toFixed(4)}, ${lng.toFixed(4)}`);
    });

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  const addMarker = (lat: number, lng: number) => {
    // Remove existing marker
    if (marker.current) {
      map.current?.removeLayer(marker.current);
    }

    // Create custom marker icon
    const customIcon = L.icon({
      iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjNjM2NkYxIiBkPSJNMTIgMEMxMS4zNzMyIDAgMTAuNzc0IDAgMTAuMzEyNSAwLjA5MDYyNUMzLjg1NzcxIDEuMjUwMDkgLTAuMjUyMDEgNS41NjczIDAgMTIgMCAyMCAxMiAyNCAxMiAyNCAxMiAyNCAxMiAyMCAxMiAxMi4xMjUgOC43NSAxMi4xMjUgNS41IDAuMTU2MjUgMS4zNzUiLz48L3N2Zz4=',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    });

    marker.current = L.marker([lat, lng], { icon: customIcon }).addTo(map.current!);
  };

  const handleConfirmLocation = () => {
    if (selectedLocation) {
      // Store location in session/state and go back
      sessionStorage.setItem('selectedLocation', JSON.stringify(selectedLocation));
      sessionStorage.setItem('locationName', locationName);
      history.goBack();
    }
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar style={{ '--background': 'var(--ion-card-background)' } as any}>
          <IonButtons slot="start">
            <IonButton onClick={() => history.goBack()}>
              <IonIcon slot="icon-only" icon={arrowBack} />
            </IonButton>
          </IonButtons>
          <IonTitle style={{ fontSize: '18px', fontWeight: 600 }}>Select Delivery Location</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent style={{ '--background': 'var(--ion-background-color)' } as any}>
        {/* Map Container */}
        <div
          ref={mapContainer}
          style={{
            width: '100%',
            height: '60vh',
            borderRadius: '12px',
            margin: '16px 16px 0 16px',
            overflow: 'hidden',
            border: '1px solid var(--ion-border-color)',
            boxSizing: 'border-box',
          }}
        />

        {/* Location Info */}
        {selectedLocation && (
          <div style={{ padding: '16px' }}>
            <div
              style={{
                background: 'var(--ion-card-background)',
                padding: '16px',
                borderRadius: '12px',
                border: '1px solid var(--ion-border-color)',
                marginBottom: '16px',
              }}
            >
              <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                <IonIcon
                  icon={locationOutline}
                  style={{ color: '#6366F1', fontSize: '20px' }}
                />
                <div>
                  <p style={{ margin: '0', fontSize: '12px', color: 'var(--ion-text-color-secondary)' }}>
                    Selected Location
                  </p>
                  <p style={{ margin: '4px 0 0', fontWeight: 600, color: 'var(--ion-text-color)' }}>
                    {locationName}
                  </p>
                  <p style={{ margin: '4px 0 0', fontSize: '12px', color: 'var(--ion-text-color-secondary)' }}>
                    Latitude: {selectedLocation.lat.toFixed(6)}
                  </p>
                  <p style={{ margin: '2px 0 0', fontSize: '12px', color: 'var(--ion-text-color-secondary)' }}>
                    Longitude: {selectedLocation.lng.toFixed(6)}
                  </p>
                </div>
              </div>
            </div>

            <div style={{ fontSize: '13px', color: 'var(--ion-text-color-secondary)', marginBottom: '16px' }}>
              <p style={{ margin: '0 0 8px' }}>📍 Click on the map to select your delivery location</p>
              <p style={{ margin: 0 }}>Your current location is shown first. You can adjust it as needed.</p>
            </div>
          </div>
        )}
      </IonContent>

      {/* Footer */}
      {selectedLocation && (
        <IonFooter
          style={{
            '--background': 'var(--ion-card-background)',
            padding: '16px',
            borderTop: '1px solid var(--ion-border-color)',
          } as any}
        >
          <IonButton
            expand="block"
            size="large"
            style={{
              '--background': '#6366F1',
              '--border-radius': '8px',
              height: '48px',
              fontSize: '16px',
              fontWeight: 700,
            }}
            onClick={handleConfirmLocation}
          >
            <IonIcon slot="start" icon={locationOutline} />
            Confirm Location
          </IonButton>
        </IonFooter>
      )}
    </IonPage>
  );
};

export default LocationPicker;
