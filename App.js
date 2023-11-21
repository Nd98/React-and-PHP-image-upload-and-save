import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import ImagePicker from 'react-native-image-picker';


const options = {
  title: 'Select Avatar',
  
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export default class App extends Component{

  state = {
    image:"",
    name: "",
    type: ""
  }

  

  img = () => {
    ImagePicker.showImagePicker(options, response => {
      //console.warn('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        console.log(response);
        //  const source = { uri: response.uri };
        // console.warn(source['uri']);

        // You can also display the image using data:
        const source = { uri: 'data:image/jpeg;base64,' + response.data };
        console.log(source['uri'])

        this.setState({
          image: source['uri'],
          name: response.fileName,
        });
      }
    });
  };

  sendPhoto = () => {
    let formData = new FormData();
    data = this.state.image.split(',')[1];
    console.log(data);
    formData.append("image_uri", data)
    formData.append("image_name",this.state.name)
    fetch("http://192.168.137.1:8500/ImageUploadTester/upload.php",{
      method: "POST",
      body: formData
    })

    .catch(err => console.log(err))
  }

  render() {
    return (
      <View style={styles.container}>

            <Image
              source={{ uri: this.state.image }}
              style={{
                width: 80,
                height: 80,
                borderRadius: 80 / 2,
                marginTop: 5,
              }}
            />
            <TouchableOpacity onPress={this.img}>
              <Text
                style={{ 
                  fontWeight: 'bold', 
                  fontSize: 18, 
                  color: '#2E8BFC' 
                }}>
                Add Photo
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.sendPhoto}>
              <Text
                style={{ 
                  fontWeight: 'bold', 
                  fontSize: 18, 
                  color: '#2E8BFC' 
                }}>
                Send Photo
              </Text>
            </TouchableOpacity>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
