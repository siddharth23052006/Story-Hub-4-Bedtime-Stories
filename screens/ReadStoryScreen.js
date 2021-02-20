import React from "react";
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import db from "../Config";

export default class ReadStoryScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      story: [],
      search: "",
    };
  }

  componentDidMount = async () => {
    const allStories = await db.collection("stories").get();

    allStories.docs.map((doc) => {
      this.setState({
        story: [...this.state.story, doc.data()],
      });
    });
  };

  searchFilterFunction = async (text) => {
    this.setState({ story: [] });
    const story = await db
      .collection("stories")
      .where("Title", "==", text)
      .get();
    story.docs.map((doc) => {
      this.setState({
        story: [...this.state.story, doc.data()],
      });
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.bar}
            placeholder="Enter Title to search for"
            onChangeText={(text) => {
              this.setState({ search: text });
            }}
          />

          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => {
              this.searchFilterFunction(this.state.search);
            }}
          >
            <Text>Search</Text>
          </TouchableOpacity>
        </View>

        <ScrollView>
          {this.state.story.map((read, index) => {
            return (
              <View
                key={index}
                style={{
                  borderBottomWidth: 2,
                  marginTop: 20,
                  marginBottom: 20,
                }}
              >
                <Text>{"Story Title: " + read.Title}</Text>
                <Text>{"Story Author: " + read.AuthorName}</Text>
                <Text>{"Story: " + read.Story}</Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  searchBar: {
    flexDirection: "row",
    height: 40,
    width: "auto",
    borderWidth: 1,
    alignItems: "center",
    padding: 10,
    margin:10
  },
  bar: {
    borderWidth: 2,
    height: 30,
    width: 260,
    paddingLeft: 10,
    borderRadius: 20,
  },
  searchButton: {
    alignSelf:'center',
    width:60,
    height:30,
    borderRadius:15,
    backgroundColor:'#FF0038',
    borderColor:'#000',
    borderWidth:1,
    alignContent:'center',
    alignItems:'center',
    marginTop:60,
    marginBottom:60,
    justifyContent:'center'
  },
});