import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  useWindowDimensions,
  ImageBackground,
  TextInput,
  Keyboard,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function App() {
  const [searchVal, setSearchVal] = useState("");
  const [weatherData, setWeatherData] = useState();
  const API_KEY = "e30e3092ddcab201c2d8f966763593e2";
  let icon = null;
  const getWeatherData = () => {
    // API function
    fetch(
      `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${searchVal}`
    )
      .then((res) => res.json())
      .then((data) => {
        setWeatherData(data);
      });
  };

  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  return (
    <>
      <StatusBar barStyle="light-content" />
      <View style={{ flex: 1, width: windowWidth, height: windowHeight }}>
        <ImageBackground
          source={require("./assets/images/bg.jpg")}
          style={{ flex: 1 }}
        />
        <View style={styles.weatherApp}>
          <View style={styles.search}>
            <TextInput // input field
              placeholder="Search"
              style={{ width: "100%" }}
              value={searchVal}
              onChangeText={(e) => setSearchVal(e)} // function that get value
            />
            <AntDesign // search button
              name="search1"
              size={20}
              color="black"
              onPress={() => {
                Keyboard.dismiss();
                getWeatherData(); // function for hit API
                setSearchVal("");
              }}
            />
          </View>
          {weatherData ? (
            <>
              <View style={styles.cityInfo}>
                <Text style={styles.cityName}>
                  {weatherData.location.name}
                  <Text style={{ fontSize: 12, letterSpacing: 1 }}>
                    ({weatherData.location.country})
                  </Text>
                </Text>
                <Text style={styles.date}>
                  {weatherData.location.localtime}
                </Text>
              </View>
              <View style={styles.weatherInfo}>
                <Text style={styles.weatherTemp}>
                  {weatherData.current.temperature}°C
                </Text>
                <Text
                  style={{
                    color: "white",
                    letterSpacing: 2,
                    marginLeft: 25,
                  }}
                >
                  {weatherData.current.weather_descriptions[0]}
                </Text>
                {/* <Image source={require({ icon })} /> */}
                <View
                  style={{
                    width: "100%",
                    height: 1,
                    backgroundColor: "white",
                    marginVertical: 9,
                  }}
                />
                <View style={styles.weatherOtherInfo}>
                  <View
                    style={{
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 15,
                        fontWeight: "bold",
                      }}
                    >
                      Wind
                    </Text>
                    <Text style={{ color: "white", fontSize: 17 }}>
                      {weatherData.current.wind_speed} km/h
                    </Text>
                  </View>
                  <View
                    style={{
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 15,
                        fontWeight: "bold",
                      }}
                    >
                      Humidity
                    </Text>
                    <Text style={{ color: "white", fontSize: 17 }}>
                      {weatherData.current.humidity} %
                    </Text>
                  </View>
                </View>
              </View>
            </>
          ) : (
            <></>
          )}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  weatherApp: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  search: {
    width: "100%",
    height: 50,
    backgroundColor: "whitesmoke",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  cityInfo: {
    margin: 30,
  },
  cityName: {
    color: "white",
    fontSize: 42,
    textTransform: "capitalize",
    fontWeight: "bold",
    letterSpacing: 3,
  },
  date: {
    color: "white",
    lineHeight: 15,
    letterSpacing: 3,
  },
  weatherInfo: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  weatherTemp: {
    fontSize: 100,
    color: "white",
    padding: 0,
    marginLeft: 25,
    fontWeight: "100",
  },
  weatherOtherInfo: {
    flexDirection: "row",
    width: "100%",
    padding: 10,
    paddingHorizontal: 30,
    justifyContent: "space-between",
  },
});
