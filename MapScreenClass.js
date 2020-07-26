import React, { useState }  from 'react';
import * as IntentLauncher from 'expo-intent-launcher';
import { StyleSheet, Text, View , Button} from 'react-native';

import * as Permissions from 'expo-permissions';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation, useRoute } from "@react-navigation/native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';

class MapScreenClass extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      /* toolbarHackHeight: 0, */
      latitude: 0,
      longitude: 0,
      reports: [],
      isLoading: true,
      radius: 2000,
      minPrice: 0,
      maxPrice: 4,
      keyword: "",
      bottom: 1,
    }
  }

  toolbarHack = () => {
    if(this.state.bottom === 1){
      this.setState({
        bottom: 0
      })
    } 
  }

  /* _showToolbarHack = () => {
    var heightDiff = 0.5

    this.setState({
      toolbarHackHeight: this.state.toolbarHackHeight == heightDiff ? this.state.toolbarHackHeight - heightDiff : this.state.toolbarHackHeight + heightDiff
    })

    console.log('000')

    return ( <View> </View> )
  } */

  gotoNew = () => {
    const navigation = useNavigation();

    return (
      <View style = {styles.signUpButton}>
        <TouchableOpacity onPress = {() => navigation.navigate('New', { radius: this.state.radius, minPrice: this.state.minPrice, maxPrice: this.state.maxPrice, keyword: this.state.keyword })}>
            <LinearGradient
                colors = {['#D5D5D5','#CACACA']}
                style = {styles.signIn}>
                <Text style = {styles.buttonText}>Return</Text>
            </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  } 

  getRadius = () => {
    const route = useRoute();

    if (this.state.radius != route.params.radius) {
      this.setState( { radius: route.params.radius })
    }
    if (this.state.minPrice != route.params.minPrice) {
      this.setState( { minPrice: route.params.minPrice })
    }
    if (this.state.maxPrice != route.params.maxPrice) {
      this.setState( { maxPrice: route.params.maxPrice })
    }
    if (this.state.keyword != route.params.keyword) {
      this.setState( { keyword: route.params.keyword })
    }

    return (
      <Text style = {styles.footerTitleFont}>Radius: { route.params.radius } {"\n"}
       LowestPrice: { route.params.minPrice } {"\n"}
       HighestPrice: { route.params.maxPrice } {"\n"}
       Keyword: { route.params.keyword } </Text>
    )
  }
  
  getMapData() {
    fetch("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + this.state.latitude + "," + this.state.longitude + "&radius=" + this.state.radius + "&type=restaurant&keyword=" + this.state.keyword + "&minprice=" + this.state.minPrice + "&maxprice=" + this.state.maxPrice + "&opennow&key=YOURAPIKEY")
    .then(response => response.json())
    .then((responseJson) => {
      this.setState({ 
        reports: responseJson.results,
        isLoading: false,
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }
  
/* 
  mapMarkers(places) {
    places.forEach(place => {
    <Marker
    key={place.id}
    coordinate={{ latitude: place.geometry.lat, longitude: place.geometry.lon }}
    title={place.name}
    description={place.user_ratings_total}
    >

    </Marker >});
  }  */
  
  /*
  static getDerivedStateFromProps(props, state) {
    if (props.radius !== state.radius) {
      return {
        radius: props.radius,
      };
    }

    return null;
  }

  */

/* 
  componentDidUpdate(prevProps, prevState) {
    if (prevState.selected !== prevProps.selected) {
      this.selectNew();
    }
  } */

  /* async componentDidUpdate() {
    console.log(this.props);
  } */

  async componentDidMount() {

    const { status } = await Permissions.getAsync(Permissions.LOCATION)

    if (status !== 'granted') {
      const response = await Permissions.askAsync(Permissions.LOCATION);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => this.setState({ latitude, longitude }, this.mergeCoords),
      (error) => console.log('Error:', error)
    )
  }

  renderMarkers() {
    return this.state.isLoading
      ? null
      : this.state.reports.map((report, index) => {
          const coords = {
            latitude: report.geometry.location.lat,
            longitude: report.geometry.location.lng
          };

          const metadata = `Status: ${report.vicinity}`;

          return (
            <View>
              <MapView.Marker
                key={index}
                coordinate={coords}
                title={report.name}
                description={metadata}
                onPress = { () => this.toolbarHack()}
              />
            </View>
          );
        });
  }

  renderNothing() {
    return (
      <View>

      </View>
    )
  }

  render() {
    const { latitude, longitude } = this.state

    if (latitude) {
      return (
        <View style={{ flex: 1, bottom: this.state.bottom }}>
          
          <MapView  
          toolbarEnabled = { true }
          showsTraffic
          style = {{ flex: 1}}
          followsUserLocation={ true }
          initialRegion = {{
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>

            <Marker 
            coordinate = {{ latitude: this.state.latitude, longitude: this.state.longitude }}
            title = {'Your Location'}>

            </Marker>
            
            {this.renderMarkers()}
          </MapView>

          <View style = {{ position: 'absolute', top: '10%', alignSelf: 'flex-start', marginLeft: 35}}>
            <this.getRadius/>
          </View>
          <View
          style={{
            position: 'absolute',
            top: '75%', 
            alignSelf: 'center' 
          }}
          >
                  <View style = {styles.signInButton}>
                    <TouchableOpacity onPress = {() => { this.getMapData() } }>
                        <LinearGradient
                            colors = {['#F4E979', '#F0E979']}
                            style = {styles.signIn}>
                            <Text style = {styles.buttonText}>Explore!</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                <this.gotoNew/>
                </View>

        </View>
        
      );
    }

    return (
      <View style = {{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style = {styles.headerTitleFont}> We need your permissions! </Text>
        <View style = {styles.signInButton}>
            <TouchableOpacity onPress = {() => { IntentLauncher.startActivityAsync(IntentLauncher.ACTION_LOCATION_SOURCE_SETTINGS) } }>
                <LinearGradient
                    colors = {['#F4E979', '#F0E979']}
                    style = {styles.signIn}>
                    <Text style = {styles.buttonText}>Enable Location Services</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
      </View>
    )
    
  }
}

/* function getNearbyPlaces(position) {
  let request = {
  location: position,
  rankBy: google.maps.places.RankBy.DISTANCE,
  };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, nearbyCallback);
  createMarkers(results);
}

function createMarkers(places) {
  places.forEach(place => {
  <Marker 
  coordinate = { place.geometry.location }
  title = {place.name}>

  </Marker>
  });
} */

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F4E979'
  },
  header: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  },
  footer: {
      flex: 3,
      backgroundColor: '#FFFFFF',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 30,
      paddingHorizontal: 30
  },
  headerTitleFont: {
      color: "#000000",
      fontSize: 25,
      fontWeight: "bold"
  },
  footerTitleFont: {
      color: '#000000',
      fontSize: 20,
      fontWeight: 'bold',
      paddingBottom: 5
  },
  footerText: {
      color: '#7E7E7E',
      fontSize: 18,
      paddingTop: 5
  },
  action: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#f2f2f2',
      paddingBottom: 5
  },
  textInput: {
      flex: 1,
      marginTop: -6,
      paddingLeft: 10,
      color: '#05375a',
  },
  signInButton: {
      alignItems: 'center',
      marginTop: 25
  },
  signIn: {
      width: 350,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 15,
      flexDirection: 'row'
  },
  buttonText: {
      fontSize: 15,
      color: '#000'
  },
  signUpButton: {
      alignItems: 'center',
      marginTop: 10
  },
});
/* 
MapScreenClass.defaultProps = {
  radius: 2000
}; */

export default MapScreenClass;