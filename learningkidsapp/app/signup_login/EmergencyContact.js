import React from 'react';
import { Pressable, Text, View, StyleSheet, TextInput, Button, Alert, SafeAreaView, TouchableOpacity} from 'react-native';
import { Link } from 'expo-router';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Image } from 'react-native';
import { useFonts, EBGaramond_600SemiBold,EBGaramond_800ExtraBold} from '@expo-google-fonts/eb-garamond';
import { ScrollView } from 'react-native';
import Dropdown from './Dropdown'; 
import { LinearGradient } from 'expo-linear-gradient';



const EmergencyContacts = () => {

  {/*loading fonts here */}
  let [fontsLoaded] = useFonts({
    EBGaramond_600SemiBold,EBGaramond_800ExtraBold
  });
  if (!fontsLoaded) {
    return null;
  }

    const [contacts, setContacts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newContact, setNewContact] = useState({
    name: '',
    address: '',
    phone: '',
    relationship: 'Mother', // Default relationship

  });

  const [editIndex, setEditIndex] = useState(null); // Track the index of the contact being edited

  const handleInputChange = (name, value) => { //setting editted contacts 
    setNewContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  const handleAddContact = () => {//adding new contacts
    if (editIndex !== null) {
      // Update existing contact
      const updatedContacts = [...contacts];
      updatedContacts[editIndex] = newContact;
      setContacts(updatedContacts);
      setEditIndex(null); // Reset edit mode
    } else {
      // Add new contact
      setContacts((prevContacts) => [...prevContacts, newContact]);
    }
    setNewContact({ name: '', address: '', phone: '', relationship: 'Mother' });
    setShowForm(false);
  };

  const handleEditContact = (index) => {//editing
    setNewContact(contacts[index]);
    setEditIndex(index);
    setShowForm(true);
  };

  const handleDeleteContact = () => {//deleting
    const updatedContacts = contacts.filter((_, i) => i !== editIndex);
    setContacts(updatedContacts);
    setEditIndex(null);
    setShowForm(false);
    setNewContact({ name: '', address: '', phone: '', relationship: 'Mother' }); // Reset form fields
  };

  return (

    
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient colors={['#6495ED', '#B0C4DE']} style={styles.background}/>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Emergency Contacts</Text>

        {/* Contact Form */}
        {showForm ? (
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={newContact.name}
              onChangeText={(text) => handleInputChange('name', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Address"
              value={newContact.address}
              onChangeText={(text) => handleInputChange('address', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={newContact.phone}
              onChangeText={(text) => handleInputChange('phone', text)}
              keyboardType="phone-pad" // Optimizes input for phone numbers
            />
            <Dropdown
              selectedValue={newContact.relationship}
              onValueChange={(value) => handleInputChange('relationship', value)}
              options={[//relationship options
                { label: 'Mother', value: 'Mother' },
                { label: 'Father', value: 'Father' },
                { label: 'Grandparent', value: 'Grandparent' },
                { label: 'Sibling', value: 'Sibling' },
                { label: 'Neighbor', value: 'Neighbor' },
                { label: 'Relative', value: 'Relative' },
              ]}
            />
            <Button
              title={editIndex !== null ? 'Update Contact' : 'Done'}
              onPress={handleAddContact}
            />
            {editIndex !== null && (
              <Button
                title="Delete Contact"
                color="red"
                onPress={handleDeleteContact}
              />
            )}
            <Button
              title="Cancel"
              color="gray"
              onPress={() => {
                setShowForm(false);
                setEditIndex(null);
                setNewContact({ name: '', address: '', phone: '', relationship: 'Mother' });
              }}
            />
          </View>
        ) : (
          <>
            <Button title="Add Contact" onPress={() => setShowForm(true)} />
            
            {/* Contacts Display */}
            <View style={styles.contactsContainer}>
              {contacts.map((contact, index) => (
                <View key={index} style={styles.card}>
                  <Text style={styles.cardTitle}>{contact.name}</Text>
                  <Text>{contact.address}</Text>
                  <Text>{contact.phone}</Text>
                  <Text>{contact.relationship}</Text>
                  <Button title="Edit" onPress={() => handleEditContact(index)} />
                </View>
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#A7C7E7',
  },
  container: {
    padding: 20,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'EBGaramond_800ExtraBold',
  },
  form: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  contactsContainer: {
    marginTop: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default EmergencyContacts;
