import React, { useRef, useState } from 'react';
import { 
  View, Text, StyleSheet, Image, FlatList, Dimensions, 
  TouchableOpacity, ImageBackground, Linking
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const { width } = Dimensions.get('window');


const socialLinks = [
  { id: '1', name: 'Instagram', url: 'https://www.instagram.com/taylorswift/', icon: 'instagram' },
  { id: '2', name: 'YouTube', url: 'https://www.youtube.com/user/TaylorSwift', icon: 'youtube' },
  { id: '3', name: 'Twitter', url: 'https://twitter.com/taylorswift13', icon: 'twitter' },
  { id: '4', name: 'Facebook', url: 'https://www.facebook.com/TaylorSwift', icon: 'facebook' },
];



const TaylorSwift = () => {
  const [activeTab, setActiveTab] = useState('merch');
  const [cart, setCart] = useState({});
  const [yourOrders, setYourOrders] = useState([]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (newCart[item.id]) {
        newCart[item.id].quantity += 1;
      } else {
        newCart[item.id] = { ...item, quantity: 1 };
        console.log("Added Order ID:", item.id);  // Logging the order ID
      }
      return newCart;
    });
  };
  const merchItems = [
    { id: '1', name: 'Red Tour Hoodie', price: 45, image: require('../assets/tay.jpg') },
    { id: '2', name: 'Fearless Vinyl', price: 30, image: require('../assets/tay.jpg') },
    { id: '3', name: '1989 Cap', price: 25, image: require('../assets/tay.jpg') },
    { id: '4', name: 'Eras Tour Poster', price: 20, image: require('../assets/tay.jpg') },
  ];
  

  const removeFromCart = (item) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (newCart[item.id]) {
        if (newCart[item.id].quantity > 1) {
          newCart[item.id].quantity -= 1;
        } else {
          delete newCart[item.id];
        }
      }
      return newCart;
    });
  };

  const totalItems = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = Object.values(cart).reduce((sum, item) => sum + item.price * item.quantity, 0);


  const renderContent = () => {
    if (activeTab === 'merch') {
      return (
        <View>
          <FlatList
  data={merchItems}
  keyExtractor={(item) => item.id}
  numColumns={2}
  columnWrapperStyle={styles.row}
  renderItem={({ item }) => (
    <View style={styles.merchItem}>
      <Image source={item.image} style={styles.merchImage} />
      <Text style={styles.merchName}>{item.name}</Text>
      <Text style={styles.merchPrice}>${item.price}</Text>

      {cart[item.id] ? (
        <View style={styles.quantityContainer}>
          <TouchableOpacity style={styles.quantityButton} onPress={() => removeFromCart(item)}>
            <Text style={styles.quantityText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{cart[item.id]?.quantity || 0}</Text>
          <TouchableOpacity style={styles.quantityButton} onPress={() => addToCart(item)}>
            <Text style={styles.quantityText}>+</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={styles.addButton} onPress={() => addToCart(item)}>
          <Text style={styles.addButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      )}
    </View>
  )}
  contentContainerStyle={{ paddingBottom: 20 }}
/>


           {/* Cart Summary */}
           <View style={styles.cartSummary}>
            <Text style={styles.cartText}>Items in Cart: {totalItems}</Text>
            <Text style={styles.cartText}>Total: ${totalAmount}</Text>
            {totalItems > 0 && (
    <TouchableOpacity 
      style={styles.proceedButton} 
      onPress={() => {
        setYourOrders([...yourOrders, ...Object.values(cart)]);  // Add cart items to orders
        setCart({}); // Clear cart after purchase
        console.log("Orders:", yourOrders); // Log the orders
      }}
    >
      <Text style={styles.proceedButtonText}>Proceed to Buy</Text>
    </TouchableOpacity>
  )}
          </View>
        </View>
      );
    }


    if (activeTab === 'events') {
      return (
        <FlatList
          data={[
            { id: '1', date: 'March 15, 2025', place: 'Madison Square Garden, New York', time: '7:00 PM' },
            { id: '2', date: 'April 5, 2025', place: 'Wembley Stadium, London', time: '8:00 PM' },
            { id: '3', date: 'May 20, 2025', place: 'Accor Arena, Paris', time: '7:30 PM' },
            { id: '4', date: 'June 10, 2025', place: 'Tokyo Dome, Tokyo', time: '6:45 PM' },
          ]}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.concertItem}>
              <Text style={styles.concertDate}>{item.date}</Text>
              <Text style={styles.concertPlace}>{item.place}</Text>
              <Text style={styles.concertTime}>Time: {item.time}</Text>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      );
    }

    if (activeTab === 'social') {
      return (
        <View style={styles.socialContainer}>
  {[...new Map(socialLinks.map((link) => [link.name, link])).values()].map((link) => (
    <TouchableOpacity key={link.id} style={styles.socialButton} onPress={() => Linking.openURL(link.url)}>
      <FontAwesome name={link.icon} size={24} color="white" style={styles.socialIcon} />
      <Text style={styles.socialText}>{link.name}</Text>
    </TouchableOpacity>
  ))}
</View>
      );
    }
  };

 

  return (
    <View style={styles.container}>
      {/* Top Image */}
      <View style={styles.imageContainer}>
        <ImageBackground source={require('../assets/Taylor4K.jpg')} style={styles.artistImage}>
          <View style={styles.overlay}>
            <Text style={styles.artistName}>Taylor Swift</Text>
          </View>
        </ImageBackground>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        {['events', 'merch', 'music', 'social'].map((tab) => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)} style={styles.tabButton}>
            <Text style={[styles.tabText, activeTab === tab && styles.activeTab]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.container}>
      <FlatList
        data={[]} // Empty data because content is managed manually
        keyExtractor={() => 'dummy'}
        ListHeaderComponent={renderContent}
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </View>

      {/* Use FlatList as the Main Container */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    height: 250,
  },
  artistImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  artistName: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#eff',
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: 'transparent',
  },
  tabButton: {
    padding: 10,
  },
  tabText: {
    fontSize: 18,
    color: 'black',
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: 'green',
    paddingBottom: 5,
  },
  sectionText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  row: {
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  merchItem: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 5,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  merchImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  merchName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 5,
  },
  merchPrice: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },

  addButton: {
    marginTop: 10,
    backgroundColor: 'green',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  
  quantityButton: {
    backgroundColor: 'purple',
    color: 'white',
    padding: 8,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },

  proceedButton: {
    backgroundColor: '#1DB954',  // Spotify Green
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  
  proceedButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  
  
  addButton: {
    marginTop: 10,
    backgroundColor: 'purple',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  
  cartSummary: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    marginTop: 10,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  
  cartText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 5,
  },
  


  socialContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ee00',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 5,
    width: '80%',
    justifyContent: 'center',
  },
  socialIcon: {
    marginRight: 1,
    color: '#000',
  },
  socialText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
  },
  concertItem: {
    width: '100%',
    backgroundColor: '#f8f8f8',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  concertDate: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  concertPlace: {
    fontSize: 16,
    color: '#555',
  },
  concertTime: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#777',
  },
});

export default TaylorSwift;