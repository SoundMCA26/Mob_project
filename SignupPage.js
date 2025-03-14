import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { supabase } from './supabaseclient';

export default function SignupPage({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');

  // Username Validation
  function isValidUsername(name) {
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    return usernameRegex.test(name) && name.length >= 3 && name.length <= 20;
  }

  async function handleSignup() {
    if (!isValidUsername(username)) {
      Alert.alert(
        'Invalid Username',
        'Username must be 3-20 characters long and contain only letters, numbers, and underscores.'
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'Passwords do not match.');
      return;
    }

    const { user, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      Alert.alert('Signup Failed', error.message);
      return;
    }

    const { error: insertError } = await supabase
      .from('profiles')
      .insert([{ id: user.id, username, email }]);

    if (insertError) {
      Alert.alert('Signup Failed', insertError.message);
      return;
    }

    Alert.alert('Account Created', 'You can now log in.');
    navigation.navigate('LoginPage');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <Button title="Sign Up" onPress={handleSignup} />
      <Text
        style={styles.link}
        onPress={() => navigation.navigate('LoginPage')}>
        Already have an account? Log In
      </Text>
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
  title: {
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
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  link: {
    color: 'blue',
    marginTop: 10,
    textAlign: 'center',
  },
});
