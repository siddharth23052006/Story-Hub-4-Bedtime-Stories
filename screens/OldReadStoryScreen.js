import React from 'react';
import { FlatList } from 'react-native';
import {Text, View, TextInput, StyleSheet, TouchableOpacity, ScrollView, ToastAndroid} from 'react-native';
import {Header} from 'react-native-elements';
import db from '../Config';
import firebase from 'firebase';

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

export default class OldReadStoryScreen extends React.Component{
  constructor(){
    super();
    this.state = {
      storiesInDB:[],
      search:'',
      searchResults:[]
    }
  }

  retrieveStories = ()=>{
    var allStories = []
    const dbStories = db.collection("stories").get()
    .then(
      querySnapshot=>{
        querySnapshot.forEach(doc=>{
          allStories.push(doc.data());
        });
        console.log(allStories);
      }
    )
    this.setState({storiesInDB:allStories});
  }

  searchFilter = (searchInput)=>{
    console.log("Search Filter function is called");
    var resultsData = [];
    if (searchInput!=''){
      var results = db.collection("stories").where("Title","==", searchInput).get()
      .then(querySnapshot=>{
        querySnapshot.forEach(doc=>{
          resultsData.push(doc.data())
        })
      })
      .catch(error=>{
        console.log("Error retrieving documents.");
        ToastAndroid.show('Error retrieving documents', ToastAndroid.SHORT);
      });
      this.setState({searchResults:resultsData});
      console.log('if condition');
    }
    else{
      this.setState({searchResults:this.state.storiesInDB});
      console.log('else condition');
    }
  }

  componentDidMount(){
    this.retrieveStories();
  }
  renderItem = ({ item }) => <Item title={item.Title} />
  render(){
    return(
      <View style = {{flex: 1, backgroundColor:'#FFEFEF'}}>
        <Header
          backgroundColor={'#FF0038'}
          centerComponent={{
            text:'Story Hub',
            style:{color:'#EEE', fontSize:20, fontWeight:'bold'}
          }}
        />
        <View style = {{alignItems:'center'}}>
          <TextInput
            style = {styles.searchText}
            placeholder = "Search for a story title"
            onChangeText = {search=>{
              this.searchFilter(search);
              this.setState({search:search});
            }}
            value = {this.state.search}/>
          {/*<FlatList
            style = {styles.scrollView}
            data = {this.state.storiesInDB}
            /*renderItem = {({item})=>{
              <View style = {{flex:1}}>
                <Text>Title: {item.Title}</Text>
                <Text>Author: {item.AuthorName}</Text>
              </View>
            }}*/
            /*renderItem = {this.renderItem}
            keyExtractor = {(item, index)=>index.toString()}/>*/}
            
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchText:{
    height:35,
    width:'70%',
    borderWidth:1.5,
    alignSelf:'center',
    borderWidth:1.5,
    fontSize:20,
    backgroundColor:'#FFF',
    margin:20
  },
  scrollView:{
    backgroundColor: '#FFEFEF',
    marginHorizontal: 15,
    textAlign: 'center',
  },
  scrollViewText:{
    color:'#000',
    fontSize:15
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  }
});