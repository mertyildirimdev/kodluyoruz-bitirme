import {
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Text,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';

import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

import database from '@react-native-firebase/database';

import {Divider, Card} from 'react-native-elements';
import {HeaderView} from '../Components/ProfilePage/HeaderView';

const Profile = (props) => {
  const [myPost, setMyPost] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({
    name: 'Kullanıcı',
    surname: 'Kullanıcı',
    imageRef:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSaJYuY-73ZNnqxSZ5VMAKYhkwqd3y9hg76sQ&usqp=CAU',
  });

  const mail = auth().currentUser.email;
  const userid = auth().currentUser.uid;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setIsLoading(true);
    database()
      .ref('/products')
      .on('value', (snapshots) => {
        let cpArray = [];
        snapshots.forEach((snap) => {
          if (mail === snap.val().userEmail) {
            const ref = storage().ref(`${snap.val().imageRef}`);
            ref
              .getDownloadURL()
              .then((url) => {
                cpArray.push({
                  imageRef: url,
                  userEmail: snap.val().userEmail,
                  description: snap.val().description,
                  title: snap.val().title,
                });
                setMyPost(cpArray);
                database()
                  .ref(`users/${userid}`)
                  .on('value', (snapshot) => {
                    if (
                      snapshot.val().name != null &&
                      snapshot.val().surname != null
                    ) {
                      const ref = storage().ref(
                        `${snapshot.val().profileImgRef}`,
                      );
                      ref.getDownloadURL().then((url) => {
                        setUser({
                          name: snapshot.val().name,
                          surname: snapshot.val().surname,
                          imageRef: url,
                        });
                      });
                    }
                  });
              })
              .catch((e) => {
                console.log(e);
              });
          }
        });
      });

    setIsLoading(false);
  };
  const renderCards = ({item}) => {
    return (
      <Card
        containerStyle={stlyes.container}
        title={item.title}
        titleStyle={stlyes.title}
        image={{uri: item.imageRef}}
        imageStyle={{resizeMode: 'contain'}}>
        <View
          style={{
            marginTop: 15,
            justifyContent: 'space-evenly',
            flexDirection: 'row',
          }}>
          <Text numberOfLines={5} style={stlyes.text}>
            {item.description}
          </Text>
        </View>
      </Card>
    );
  };
  const goProfilInfo = () => {
    props.navigation.navigate('ProfilInformation');
  };
  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fce4ff'}}>
      <View style={{marginVertical:5, marginHorizontal: 10, marginBottom: 30, height:85}}>
        <HeaderView
          userName={user.name}
          userSurname={user.surname}
          profileImg={user.imageRef}
          onPress={goProfilInfo}
          buttonVisible={true}
        />
      </View>
      <Divider
        style={{
          backgroundColor: 'gray',
          height: 5,
          marginHorizontal: 10,
          borderRadius: 5,
        }}
      />

      <View style={{flex: 1, backgroundColor: '#fce4ec'}}>
        <FlatList
          keyExtractor={(_, index) => index.toString()}
          data={myPost}
          renderItem={renderCards}
          refreshing={isLoading}
          onRefresh={fetchData}
        />
      </View>
    </SafeAreaView>
  );
};

const stlyes = StyleSheet.create({
  container: {
    flex: 1,
    height: 300,
    margin: 7,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    width: Dimensions.get('screen').width * 0.7,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: 'baseline',
    paddingLeft: 20,
    borderBottomWidth: 0.5,

    borderRadius: 10,
    padding: 5,
    margin: 5,
    color: '#424242',
  },
  Button: {
    backgroundColor: '#3385ff',
    borderRadius: 10,
    padding: 5,
  },
  view: {
    borderRadius: 10,
    justifyContent: 'space-between',
    padding: 5,
  },
});

export {Profile};
