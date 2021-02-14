import React from "react";
import {StyleSheet, Text, View, FlatList, SafeAreaView, ScrollView, TextInput} from "react-native";
import db from "../Config";

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

export default class ReadStoryScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      storiesInDB: [],
      search: "",
      searchResults: [],
    };
  }

  retrieveStories = () => {
    if (this.state.searchResults===[]){
    var allStories = [];
    db.collection("stories")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          allStories.push(doc.data());
          // console.log(allStories);
        });
        this.setState({ storiesInDB: allStories });
        console.log("if condition retrieve stories");
      });
    }
    else{
      this.setState({storiesInDB:this.state.searchResults});
      console.log("else condition retrieve stories");
    }
  };

  searchFilter = async(searchInput) => {
    console.log("Search Filter function is called");
    if (searchInput != "") {
      const results = await db.collection("stories").where("Title", "==", searchInput)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) =>{
            this.setState({ searchResults: results, storiesInDB:[] });
            console.log('results setstate.')
          });
        });        
      console.log("if condition search filter");
      return(
        <ScrollView>
        {this.state.searchResults.map((read, index) => {
          return (
            <View
              key={index}
              style={{
                borderBottomWidth: 2,
                marginTop: 20,
                marginBottom: 20,
              }}
            >
              <Text>{"Story Name: " + read.Title}</Text>
              <Text>{"Story Author: " + read.AuthorName}</Text>
            </View>
          );
        })}
      </ScrollView>
      );
    }
    else {
      this.setState({ searchResults: this.state.storiesInDB });
      console.log("else condition search filter");
    }
  };

  componentDidMount() {
    this.retrieveStories();
    // const allStories = await db.collection("stories").get();

    // allStories.docs.map((doc) => {
    //   this.setState({
    //     storiesInDB: [...this.state.storiesInDB, doc.data()],
    //   });
    // });
  }
  renderItem = ({ item }) => <Item title={item.Title} />;
  render() {
    return (
      // <View>
      //    <Header
      //     backgroundColor={"#FF0038"}
      //     centerComponent={{
      //       text: "Story Hub",
      //       style: { color: "#EEE", fontSize: 20, fontWeight: "bold" },
      //     }}
      //   />
      //   <View>
      //     <TextInput
      //       style={styles.searchText}
      //       placeholder="Search for a story title"
      //       onChangeText={(search) => {
      //         this.searchFilter(search);
      //         this.setState({ search: search });
      //       }}
      //       value={this.state.search}
      //     />
      <SafeAreaView style={styles.container}>
        {/* <FlatList
          data={this.state.storiesInDB}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id}
        /> */}
        {/*<FlatList
          data={this.state.allStories}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text>Title: {item.Title}</Text>
              <Text>Author : {item.AuthorName}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        {/* <FlatList
                  data={this.state.storiesInDB}
          renderItem={({ item }) => {
            <View style={{ flex: 1 }}>
              <Text>Title: {item.Title}</Text>
              <Text>Author: {item.AuthorName}</Text>
            </View>;
          }}
          keyExtractor={(item, index) => index.toString()}
        /> */}
        <TextInput
          style={styles.searchText}
          placeholder="Search for a story title"
          onChangeText={(search) => {
            this.searchFilter(search);
            this.setState({ search: search });
          }}
          value={this.state.search}
        />
        <ScrollView>
          {this.state.storiesInDB.map((read, index) => {
            return (
              <View
                key={index}
                style={{
                  borderBottomWidth: 2,
                  marginTop: 20,
                  marginBottom: 20,
                }}
              >
                <Text>{"Story Name: " + read.Title}</Text>
                <Text>{"Story Author: " + read.AuthorName}</Text>
              </View>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  searchText: {
    height: 35,
    width: "70%",
    borderWidth: 1.5,
    alignSelf: "center",
    borderWidth: 1.5,
    fontSize: 20,
    backgroundColor: "#FFF",
    margin: 20,
  },
  scrollView: {
    backgroundColor: "#FFEFEF",
    marginHorizontal: 15,
    textAlign: "center",
  },
  scrollViewText: {
    color: "#000",
    fontSize: 15,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  itemContainer: {
    height: 80,
    width: "100%",
    borderWidth: 2,
    borderColor: "pink",
    justifyContent: "center",
    alignSelf: "center",
  },
});
