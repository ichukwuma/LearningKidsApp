import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const Dropdown = ({ 
  selectedValue, 
  onValueChange, 
  options, 
  containerColor = '#A7C7E7', //input box color
  selectedValueColor = 'black',//input text color 
  dropdownBackgroundColor = '##A7C7E7', //behind the dropdrown options
  optionColor = 'black', //dropdown text color
  optionHoverColor = 'white'//dropdown colors
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={[styles.dropdownContainer, { backgroundColor: containerColor }]}>
      <TouchableOpacity
        style={[styles.selectedValue, { backgroundColor: containerColor }]}
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text style={{ color: selectedValueColor }}>{selectedValue}</Text>
      </TouchableOpacity>

      {isOpen && (
        <View style={[styles.dropdownMenu, { backgroundColor: dropdownBackgroundColor }]}>
          <FlatList
            data={options}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.option, { backgroundColor: optionHoverColor }]}
                onPress={() => {
                  onValueChange(item.value);
                  setIsOpen(false);
                }}
              >
                <Text style={{ color: optionColor }}>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    marginBottom: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
  },
  selectedValue: {
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  dropdownMenu: {
    borderColor: 'gray',
    borderWidth: 1,
    borderTopWidth: 0,
    maxHeight: 150,
    zIndex: 1,
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default Dropdown;
