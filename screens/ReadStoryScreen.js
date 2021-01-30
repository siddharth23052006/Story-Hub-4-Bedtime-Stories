import React from 'react';
import { FlatList } from 'react-native';
import {Text, View, TextInput, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {Header} from 'react-native-elements';
import db from '../Config';

export default class ReadStoryScreen extends React.Component{
  constructor(){
    super();
    this.state = {
      storiesInDB:[],
      search:'',
      searchResults:[]
    }
  }

  retrieveStories = async()=>{
    var allStories = []
    var dbStories = db.collection("stories").get()
    .then(
      querySnapshot=>{
        querySnapshot.forEach(doc=>{
          allStories.push(doc.data());
        });
      }
    )
    this.setState({storiesInDB:allStories});
  }

  searchFilter = async(searchInput)=>{
    console.log("Search Filter function is called")
    if (searchInput!=''){
      var results = this.state.storiesInDB.where("Title","==", searchInput).get();
      var resultsData = results.data()
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
          <FlatList
            style = {styles.scrollView}
            data = {this.state.allStories}
            renderItem = {({item})=>{
              <View style = {{flex:1}}>
                <Text>Title: {item.Title}</Text>
                <Text>Author: {item.AuthorName}</Text>
              </View>
            }}
            keyExtractor = {(item, index)=>index.toString()}/>
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
  }
});