import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonInput,
  IonIcon,
  IonFooter,
  IonButton
} from "@ionic/react";

import { locationOutline } from "ionicons/icons";
import { useState, useRef } from "react";

import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
// import GuestLocationPicker from "./LocationPickerBkup";

interface LocationResult {
  display_name: string;
  lat: string;
  lon: string;
}

// function ChangeMapView({ center }: any) {
//   const map = useMap();
//   map.setView(center, 16);
//   return null;
// }

function ChangeMapView({ center }: any) {
  const map = useMap();

  map.setView(center, 16);

  setTimeout(() => {
    map.invalidateSize();
  }, 100);

  return null;
}

const GuestLocationPicker: React.FC = () => {

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<LocationResult[]>([]);
  const [marker, setMarker] = useState<[number, number] | null>(null);
  const [center, setCenter] = useState<[number, number]>([14.5995,120.9842]);


  const handleConfirmLocation = () => {
    console.log("check")
  };

  
  // const searchLocation = async (text: string) => {

  //   setQuery(text);

  //   if(text.length < 3){
  //     setResults([]);
  //     return;
  //   }

  //   const res = await fetch(
  //     `https://nominatim.openstreetmap.org/search?format=json&q=${text}`
  //   );

  //   const data = await res.json();
  //   setResults(data);
  // };

  const debounceRef = useRef<any>(null);

  const searchLocation = (text: string) => {
    setQuery(text);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(async () => {

      if (text.length < 3) {
        setResults([]);
        return;
      }

      // const res = await fetch(
      //   `https://nominatim.openstreetmap.org/search?format=json&q=${text}`
      // );

    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${text}`,
      {
        headers: {
          "User-Agent": "my-ionic-leaflet-app"
        }
      }
    );

      const data = await res.json();
      setResults(data);

    }, 600);
  };
  const chooseLocation = (loc: LocationResult) => {

    const lat = parseFloat(loc.lat);
    const lon = parseFloat(loc.lon);

    setCenter([lat,lon]);
    setMarker([lat,lon]);
    setResults([]);
    setQuery(loc.display_name);
  };

  return (
    <IonPage>

      <IonHeader>
        <IonToolbar>
          <IonTitle>Plan Your Route</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">

        {/* INPUT */}
        <div style={{marginBottom:"15px"}}>
          <label style={{fontSize:"12px",color:"#888"}}>FROM</label>

          <div style={{
            display:"flex",
            alignItems:"center",
            border:"1px solid #ddd",
            borderRadius:"8px",
            padding:"8px"
          }}>
            <IonIcon icon={locationOutline} style={{marginRight:"8px"}}/>

            <IonInput
              value={query}
              placeholder="Enter starting location"
              onIonInput={(e:any)=>searchLocation(e.target.value)}
            />
          </div>

          {/* AUTOCOMPLETE */}
          {results.length > 0 && (
            <div style={{
              background:"#fff",
              border:"1px solid #ddd",
              borderRadius:"8px",
              marginTop:"4px",
              maxHeight:"200px",
              overflow:"auto"
            }}>
              {results.map((r,index)=>(
                <div
                  key={index}
                  style={{
                    padding:"10px",
                    borderBottom:"1px solid #eee",
                    cursor:"pointer"
                  }}
                  onClick={()=>chooseLocation(r)}
                >
                  {r.display_name}
                </div>
              ))}
            </div>
          )}

        </div>

        {/* MAP */}
        <div style={{
          height:"45vh",
          borderRadius:"14px",
          overflow:"hidden"
        }}>
          <MapContainer
            center={center}
            zoom={13}
            style={{height:"100%",width:"100%"}}
          >

            <TileLayer
              attribution='© OpenStreetMap'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <ChangeMapView center={center}/>

            {marker && <Marker position={marker}/>}

          </MapContainer>

        </div>

      </IonContent>
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
            Confirm Route
          </IonButton>
        </IonFooter>

    </IonPage>
  );
};

export default GuestLocationPicker;