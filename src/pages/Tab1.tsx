import { IonButton, IonContent, IonHeader, IonItem, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab1.css';
import { Network } from '@capacitor/network';
import React, { useState } from 'react';
import { App } from '@capacitor/app';


const Tab1: React.FC = () => {

  const [connected,setConnected] = useState(false);

  Network.addListener('networkStatusChange', status => {
    console.log('Network status changed', status);
  });

  App.addListener('appStateChange', async ({ isActive }) => {
    console.log('App state changed. Is active?', isActive);
    const status = await Network.getStatus();
    console.log('Network status:', status);
  });
  
  const logCurrentNetworkStatus = async () => {
    const status = await Network.getStatus();
    setConnected(status.connected);
    console.log('Network status:', status);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonButton onClick={logCurrentNetworkStatus}>Status</IonButton>
        {connected && (
          <IonItem>True</IonItem>
        )}
        
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
