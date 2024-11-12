import React from 'react';
import { Pressable, Text, View, StyleSheet, TextInput, Button, Alert, SafeAreaView, Image} from 'react-native';
import { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import Dropdown from '../signup_login/Dropdown';
import { ref, push, set, remove } from 'firebase/database';
import { database } from '../config/firebaseConfig';
import { auth } from '../config/firebaseConfig';
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute, useNavigation } from '@react-navigation/native';

/*Emergency Contacts*/
const emergency_contact_home = () => {

  const route = useRoute();
  const { child_username } = route.params;

  const navigation = useNavigation();
  const backButton = () => {
  navigation.navigate('home/home', { child_username }); 
  };

  const [contacts, setContacts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newContact, setNewContact] = useState({
    name: '',
    address: '',
    phone: '',
    relationship: 'Relationship',
  });
  const [editIndex, setEditIndex] = useState(null);
  const [firebaseKey, setFirebaseKey] = useState(null); 

  useEffect(() => {
    const fetchContacts = async () => {
      const parentId = auth.currentUser?.uid;
      const childId = 'EmergencyContacts'; 

      if (!parentId || !childId) {
        Alert.alert('Error', 'Parent or Child ID missing.');
        return;
      }

      const contactsRef = ref(database, `parents/${parentId}/children/${childId}/emergencyContacts`);
      contactsRef.on('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const loadedContacts = Object.keys(data).map(key => ({ ...data[key], key }));
          setContacts(loadedContacts);
        } else {
          setContacts([]);
        }
      });
    };

    fetchContacts();
  }, []);

  const handleInputChange = (name, value) => {
    setNewContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  const handleEditContact = (index) => {
    const contactToEdit = contacts[index];
    if (!contactToEdit) {
      Alert.alert('Error', 'Contact not found.');
      return;
    }
    setNewContact({
      name: contactToEdit.name,
      address: contactToEdit.address,
      phone: contactToEdit.phone,
      relationship: contactToEdit.relationship,
    });
    setEditIndex(index);
    setFirebaseKey(contactToEdit.key); 
    setShowForm(true);
  };

  const handleDeleteContact = () => {
    if (editIndex === null || editIndex >= contacts.length) {
      Alert.alert('Error', 'Invalid contact index.');
      return;
    }

    const contactToDelete = contacts[editIndex];

    if (!contactToDelete || !contactToDelete.key) {
      Alert.alert('Error', 'Contact key is missing.');
      return;
    }

    const parentId = auth.currentUser?.uid;
    const childId = 'EmergencyContacts'; 

    if (!parentId || !childId) {
      Alert.alert('Error', 'Parent or Child ID missing.');
      return;
    }

    const contactRef = ref(database, `parents/${parentId}/children/${childId}/emergencyContacts/${contactToDelete.key}`);

    remove(contactRef)
      .then(() => {
        const updatedContacts = contacts.filter((_, i) => i !== editIndex);
        setContacts(updatedContacts);
        setShowForm(false);
        setEditIndex(null);
        setFirebaseKey(null);
        Alert.alert('Success', 'Emergency contact deleted successfully.');
      })
      .catch((error) => {
        Alert.alert('Error', error.message);
      });
  };

  const handleAddOrUpdateContact = () => {
    const parentId = auth.currentUser?.uid;
    const childId = 'EmergencyContacts'; 

    if (!parentId || !childId) {
      Alert.alert('Error', 'Parent or Child ID missing.');
      return;
    }

    if (!newContact.name || !newContact.address || !newContact.phone || !newContact.relationship) {
      Alert.alert('Error', 'All contact fields are required.');
      return;
    }

    const contactsRef = ref(database, `parents/${parentId}/children/${childId}/emergencyContacts`);

    if (editIndex !== null && firebaseKey) {
      
      const contactRef = ref(database, `parents/${parentId}/children/${childId}/emergencyContacts/${firebaseKey}`);
      set(contactRef, newContact)
        .then(() => {
          const updatedContacts = [...contacts];
          updatedContacts[editIndex] = { ...newContact, key: firebaseKey }; 
          setContacts(updatedContacts);
          Alert.alert('Success', 'Emergency contact updated successfully.');
          setNewContact({ name: '', address: '', phone: '', relationship: 'Mother' });
          setShowForm(false);
          setEditIndex(null); 
          setFirebaseKey(null); 
        })
        .catch((error) => {
          Alert.alert('Error', error.message);
        });
    } else {
      //adding the new contact
      const newContactRef = push(contactsRef);
      set(newContactRef, newContact)
        .then(() => {
          setContacts((prevContacts) => [...prevContacts, { ...newContact, key: newContactRef.key }]);
          Alert.alert('Success', 'Emergency contact added successfully.');
          setNewContact({ name: '', address: '', phone: '', relationship: 'Mother' });
          setShowForm(false);
        })
        .catch((error) => {
          Alert.alert('Error', error.message);
        });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient colors={['#6495ED', '#B0C4DE']} style={styles.background}/>
      
      
      <ScrollView contentContainerStyle={styles.container}>
        {/*space container for layout*/}
        <View style={styles.space}>
          
        </View>
  
         {/*back button*/}
        <Pressable style={styles.back_arrow_img} onPress={backButton}>
          <Image source={require('../../assets/back_arrow.png')} style={styles.back_arrow_img} />
        </Pressable>

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
              keyboardType="phone-pad" 
            />
            <Dropdown
              selectedValue={newContact.relationship}
              onValueChange={(value) => handleInputChange('relationship', value)}
              options={[
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
              onPress={handleAddOrUpdateContact}
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

       
            <View style={styles.space}>
          
            </View>
            <Pressable style={styles.addButton} onPress={() => setShowForm(true)}>
              <Text style={styles.addButtonText}>Add Contact</Text>
            </Pressable>

            
       
            <View style={styles.space}>
          
            </View>

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
    ...StyleSheet.absoluteFillObject
  },
  container: {
    padding: 20,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
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
  button: {
    width: 150,
    padding: 10,
    backgroundColor: '#f7e7b4',
    borderRadius: 5,
    marginVertical: 10, 
    alignItems: 'center',
  },
  text: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'EBGaramond_800ExtraBold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center', 
    marginVertical: 20, 
  },
  addButton: {
    backgroundColor: 'black', 
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  
  addButtonText: {
    color: 'white', 
    fontSize: 16,
    fontFamily: 'EBGaramond_800ExtraBold',
  },
  back_arrow_img: {
    position: 'absolute',
    top: 10,
    left: 20,
    width: 75,
    height: 75,
  },
  space:{
    height: 70,
  }
  
});

export default emergency_contact_home;