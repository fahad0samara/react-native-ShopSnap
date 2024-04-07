import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Switch, Linking, TouchableOpacity } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { ScrollView } from 'react-native-gesture-handler';

const Profile = () => {
  const { user, signOutUser } = useAuth();
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const handleLogout = async () => {
    await signOutUser();
  };

  const handlePrivacyPolicy = () => {
    // Replace 'privacy-policy-url' with the actual URL of your privacy policy
    Linking.openURL('privacy-policy-url');
  };
  
  const handleTermsOfService = () => {
    // Replace 'terms-of-service-url' with the actual URL of your terms of service
    Linking.openURL('terms-of-service-url');
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.setting}>
            <Text style={styles.settingLabel}>Email</Text>
            <Text style={styles.settingValue}>{user ? user.email : ''}</Text>
          </View>
          <View style={styles.setting}>
            <Text style={styles.settingLabel}>Notification</Text>
            <Switch
              value={notificationEnabled}
              onValueChange={setNotificationEnabled}
            />
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appearance</Text>
          <View style={styles.setting}>
            <Text style={styles.settingLabel}>Dark Mode</Text>
            <Switch
              value={darkModeEnabled}
              onValueChange={setDarkModeEnabled}
            />
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Details</Text>
          <View style={styles.setting}>
            <Text style={styles.settingLabel}>App Name</Text>
            <Text style={styles.settingValue}>Your App Name</Text>
          </View>
          <View style={styles.setting}>
            <Text style={styles.settingLabel}>Version</Text>
            <Text style={styles.settingValue}>1.0.0</Text>
          </View>
          <View style={styles.setting}>
            <Text style={styles.settingLabel}>Build</Text>
            <Text style={styles.settingValue}>1</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <View style={styles.setting}>
            <Text style={styles.settingLabel}>Contact Us</Text>
            <Text style={styles.settingValue}>0800-123-456</Text>
          </View>
          <View style={styles.setting}>
            <Text style={styles.settingLabel}>Email</Text>
            <Text style={styles.settingValue}>support@Shopsnap.com</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Legal</Text>
          <View style={styles.setting}>
            <Text style={styles.settingLabel}>Privacy Policy</Text>
            <TouchableOpacity onPress={handlePrivacyPolicy}>
              <Text style={styles.linkText}>View</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.setting}>
            <Text style={styles.settingLabel}>Terms of Service</Text>
            <TouchableOpacity onPress={handleTermsOfService}>
              <Text style={styles.linkText}>View</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.setting}>
            <Text style={styles.settingLabel}>Company</Text>
            <Text style={styles.settingValue}>ShopSnap</Text>
          </View>
          <View style={styles.setting}>
            <Text style={styles.settingLabel}>Location</Text>
            <Text style={styles.settingValue}>Nicosia, Cyprus</Text>
          </View>
          <View style={styles.setting}>
            <Text style={styles.settingLabel}>Website</Text>
            <Text style={styles.settingValue}>www.shopsnap.com</Text>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={handleLogout}
        style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  section: {
    marginBottom: 30,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  settingValue: {
    fontSize: 16,
    color: '#666',
  },
  linkText: {
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  logoutButton: {
    backgroundColor: '#ff9133',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  logoutText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default Profile;
