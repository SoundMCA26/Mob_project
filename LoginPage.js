import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { supabase } from './supabaseclient';

export default function LoginPage({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between login & signup

  async function handleAuth() {
    if (!email || !password || (isSignUp && (!username || !confirmPassword))) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    if (isSignUp) {
      if (password !== confirmPassword) {
        Alert.alert('Error', 'Passwords do not match');
        return;
      }

      // Sign Up Logic
      const { data, error } = await supabase.auth.signUp({ email, password });

      if (error) {
        Alert.alert('Signup Failed', error.message);
      } else {
        const user = data?.user;
        if (user) {
          // Create profile in Supabase after signing up
          await supabase
            .from('profiles')
            .insert([{ id: user.id, email, username }]);

          Alert.alert('Success', 'Account created! Please log in.');
          setIsSignUp(false); // Switch back to login mode
        }
      }
    } else {
      // Login Logic
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        Alert.alert('Login Failed', error.message);
      } else {
        Alert.alert('Success', 'Logged in!');
        // Correct navigation to Profile via MainTabs
        navigation.navigate('MainTabs', { screen: 'ProfilePage' });
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{isSignUp ? 'Create Account' : 'Login'}</Text>

      {isSignUp && (
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {isSignUp && (
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
      )}

      <TouchableOpacity style={styles.button} onPress={handleAuth}>
        <Text style={styles.buttonText}>{isSignUp ? 'Sign Up' : 'Log In'}</Text>
      </TouchableOpacity>

      {/* Switch between Login & Sign Up */}
      <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
        <Text style={styles.toggleText}>
          {isSignUp ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F8F9FA',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  toggleText: {
    textAlign: 'center',
    color: '#007bff',
  },
});
