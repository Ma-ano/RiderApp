// src/App.tsx
import React from 'react';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import './theme/variables.css';
import './theme/global.css';

/* Pages */
import GuestHome from './pages/Guest/Home';
import StallDetail from './pages/Guest/StallDetail';
import GuestCart from './pages/Guest/Cart';
import GuestLocationPicker from './pages/Guest/LocationPicker';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import RiderLogin from './pages/Auth/RiderLogin';
import RiderRegister from './pages/Auth/RiderRegister';
import AdminLogin from './pages/Auth/AdminLogin';
import AdminRegister from './pages/Auth/AdminRegister';
import UserHome from './pages/User/Home';
import UserProfile from './pages/User/Profile';
import UserSettings from './pages/User/Settings';
import UserCart from './pages/User/Cart';
import UserLocationPicker from './pages/User/LocationPicker';
import RiderHome from './pages/Rider/Home';
import RiderOrders from './pages/Rider/Orders';
import RiderEarnings from './pages/Rider/Earnings';
import RiderProfile from './pages/Rider/Profile';
import RiderPendingApproval from './pages/Rider/PendingApproval';
import AdminDashboard from './pages/Admin/Dashboard';
import AdminUsers from './pages/Admin/Users';
import AdminRiders from './pages/Admin/Riders';
import AdminOrders from './pages/Admin/Orders';
import AdminReports from './pages/Admin/Reports';
import ActivityLog from './pages/Activities/ActivityLog';
import Messages from './pages/Messages/Messages';
import ReportIncident from './pages/Reports/ReportIncident';
import Payment from './pages/Checkout/Payment';
import ProtectedRoute from './components/ProtectedRoute';

setupIonicReact({
  mode: 'ios',
  animated: true,
});

const App: React.FC = () => (
  <IonApp>
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <IonReactRouter>
            <IonRouterOutlet>
              {/* Guest Routes */}
              <Route exact path="/guest/home" component={GuestHome} />
              <Route exact path="/stall/:id" component={StallDetail} />
              <Route exact path="/guest/cart" component={GuestCart} />
              <Route exact path="/guest/location" component={GuestLocationPicker} />
              
              {/* User Routes */}
              <Route exact path="/user/home" component={UserHome} />
              <Route exact path="/user/profile" component={UserProfile} />
              <Route exact path="/user/settings" component={UserSettings} />
              <Route exact path="/user/cart" component={UserCart} />
              <Route exact path="/user/location" component={UserLocationPicker} />
              
              {/* Rider Routes */}
              <Route exact path="/rider/home" component={RiderHome} />
              <Route exact path="/rider/orders" component={RiderOrders} />
              <Route exact path="/rider/earnings" component={RiderEarnings} />
              <Route exact path="/rider/profile" component={RiderProfile} />
              <Route exact path="/rider/login" component={RiderLogin} />
              <Route exact path="/rider/pending-approval" component={RiderPendingApproval} />
              <Route exact path="/rider/register" component={RiderRegister} />
              
              {/* Admin Routes */}
              <Route exact path="/admin/dashboard" component={AdminDashboard} />
              <Route exact path="/admin/users" component={AdminUsers} />
              <Route exact path="/admin/riders" component={AdminRiders} />
              <Route exact path="/admin/orders" component={AdminOrders} />
              <Route exact path="/admin/reports" component={AdminReports} />
              <Route exact path="/admin/login" component={AdminLogin} />
              <Route exact path="/admin/register" component={AdminRegister} />
              
              {/* Activity & Messages Routes */}
              <Route exact path="/activities" component={ActivityLog} />
              <Route exact path="/messages" component={Messages} />
              
              {/* Report Routes */}
              <Route exact path="/report" component={ReportIncident} />
              
              {/* Checkout Routes */}
              <Route exact path="/checkout/payment" component={Payment} />
              
              {/* Auth Routes */}
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              
              {/* Default Redirect */}
              <Route exact path="/">
                <Redirect to="/guest/home" />
              </Route>
            </IonRouterOutlet>
          </IonReactRouter>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  </IonApp>
);

export default App;