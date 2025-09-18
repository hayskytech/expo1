import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const PricingCard = ({ title, price, info, color, onButtonPress }) => {
  return (
    <View style={[styles.card, { backgroundColor: color || '#f8f9fa' }]}>
      <View style={styles.cardHeader}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>{price}</Text>
      </View>
      <View style={styles.infoContainer}>
        {info.map((item, index) => (
          <Text key={index} style={styles.infoItem}>• {item}</Text>
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={onButtonPress}>
        <Text style={styles.buttonText}>GET STARTED</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function MyPriceCard() {
  return (
    <>
      <ScrollView>
        <PricingCard
          color="#007bff"
          title="Paid"
          price="$0"
          info={['1 User', 'Basic Support', 'All Core Features']}
          onButtonPress={() => console.log('Paid plan selected')}
        />
        <PricingCard
          color="#6c757d"
          title="Starter"
          price="$19"
          info={['10 Users', 'Basic Support', 'All Core Features']}
          onButtonPress={() => console.log('Starter plan selected')}
        />
        <PricingCard
          color="#28a745"
          title="Enterprise"
          price="$49"
          info={['100 Users', 'One on One Support', 'All Core Features']}
          onButtonPress={() => console.log('Enterprise plan selected')}
        />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardHeader: {
    alignItems: 'center',
    marginBottom: 15
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff'
  },
  infoContainer: {
    marginBottom: 20
  },
  infoItem: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});
