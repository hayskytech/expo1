import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert, ActivityIndicator } from 'react-native'
import { signInWithCustomToken } from 'firebase/auth'
import { auth } from './firebaseConfig'

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [otp, setOtp] = useState('')
  const [requestId, setRequestId] = useState('')
  const [isOtpSent, setIsOtpSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isDemo, setIsDemo] = useState(false)

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[0-9]{10}$/
    return phoneRegex.test(phone)
  }

  const sendOtp = async () => {
    if (!validatePhoneNumber(phoneNumber)) {
      Alert.alert('Error', 'Please enter a valid 10-digit phone number')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('https://api.wp.haysky.com/phone/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: phoneNumber
        })
      })

      const data = await response.json()

      if (response.ok) {
        setRequestId(data.requestId)
        setIsOtpSent(true)
        setIsDemo(data.isDemo || false)

        if (data.isDemo) {
          Alert.alert(
            'Demo Mode',
            `Demo OTP: ${data.demoOtp}\n\nThis is a demo account. Use OTP: 123456`,
            [{ text: 'OK' }]
          )
        } else {
          Alert.alert('Success', 'OTP sent to your WhatsApp number!')
        }
      } else {
        Alert.alert('Error', data.error || 'Failed to send OTP')
      }
    } catch (error) {
      console.error('Send OTP Error:', error)
      Alert.alert('Error', 'Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const verifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      Alert.alert('Error', 'Please enter a valid 6-digit OTP')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('https://api.wp.haysky.com/phone/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          otp: otp,
          requestId: requestId,
          app: 'default' // or 'muslimawaaz' based on your app
        })
      })

      const data = await response.json()

      if (response.ok) {
        // Login to Firebase using the custom token
        try {
          const userCredential = await signInWithCustomToken(auth, data.token)
          console.log('User logged in successfully:', userCredential.user.uid)

          Alert.alert(
            'Success',
            `Login successful!\nPhone: ${data.phoneNumber}\n${isDemo ? 'Demo Account' : ''}`,
            [
              {
                text: 'OK',
                onPress: () => {
                  // Reset form
                  setPhoneNumber('')
                  setOtp('')
                  setRequestId('')
                  setIsOtpSent(false)
                  setIsDemo(false)
                }
              }
            ]
          )
        } catch (firebaseError) {
          console.error('Firebase login error:', firebaseError)
          Alert.alert('Error', 'Failed to login to Firebase')
        }
      } else {
        Alert.alert('Error', data.error || data.message || 'OTP verification failed')
      }
    } catch (error) {
      console.error('Verify OTP Error:', error)
      Alert.alert('Error', 'Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setPhoneNumber('')
    setOtp('')
    setRequestId('')
    setIsOtpSent(false)
    setIsDemo(false)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Phone Authentication</Text>
      <Text style={styles.subtitle}>Login with your WhatsApp number</Text>

      {!isOtpSent ? (
        // Phone Number Input Phase
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Enter your 10-digit phone number:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter phone number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="numeric"
            maxLength={10}
            editable={!loading}
          />
          <Text style={styles.hint}>
            We'll send an OTP to your WhatsApp number
          </Text>
          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={sendOtp}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Send OTP to WhatsApp</Text>
            )}
          </TouchableOpacity>
        </View>
      ) : (
        // OTP Verification Phase
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Enter the 6-digit OTP:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter OTP"
            value={otp}
            onChangeText={setOtp}
            keyboardType="numeric"
            maxLength={6}
            editable={!loading}
          />
          <Text style={styles.hint}>
            OTP sent to +91{phoneNumber}
            {isDemo && ' (Demo: Use 123456)'}
          </Text>
          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={verifyOtp}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Verify OTP</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={resetForm}
            disabled={loading}
          >
            <Text style={styles.secondaryButtonText}>Change Phone Number</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f8f9fa'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40
  },
  inputContainer: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center'
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 10
  },
  hint: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
    fontStyle: 'italic'
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15
  },
  buttonDisabled: {
    backgroundColor: '#ccc'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#007bff'
  },
  secondaryButtonText: {
    color: '#007bff',
    fontSize: 16,
    fontWeight: '600'
  }
});
