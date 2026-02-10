import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

export default function ActivityScreen({ token }) {
  const [studyHours, setStudyHours] = useState('0');
  const [sleepHours, setSleepHours] = useState('0');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSaveActivity = async () => {
    try {
      setLoading(true);
      await axios.post(
        'http://localhost:5000/api/activity/add',
        {
          studyHours: parseFloat(studyHours),
          sleepHours: parseFloat(sleepHours),
          studyNotes: notes,
          weeklyGoals: []
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      Alert.alert('Success', 'Activity saved!');
      setStudyHours('0');
      setSleepHours('0');
      setNotes('');
    } catch (error) {
      Alert.alert('Error', 'Failed to save activity');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Daily Activity</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Study Hours</Text>
        <TextInput
          style={styles.input}
          value={studyHours}
          onChangeText={setStudyHours}
          keyboardType="decimal-pad"
          placeholder="0"
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Sleep Hours</Text>
        <TextInput
          style={styles.input}
          value={sleepHours}
          onChangeText={setSleepHours}
          keyboardType="decimal-pad"
          placeholder="0"
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Study Notes</Text>
        <TextInput
          style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
          value={notes}
          onChangeText={setNotes}
          placeholder="What did you study?"
          multiline
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleSaveActivity}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Saving...' : 'Save Activity'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#9333ea',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
