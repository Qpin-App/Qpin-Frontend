import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import dayjs from "dayjs";
import "dayjs/locale/ko";

const WeeklyCalendar = () => {
  dayjs.locale("ko");
  const today = dayjs();
  const [currentWeek, setCurrentWeek] = useState(getWeekArray(dayjs()));
  const datesWithImage = [currentWeek[1], currentWeek[4]];

  function getWeekArray(baseDate: dayjs.Dayjs) {
    const startOfWeek = baseDate.startOf("week");
    return Array.from({ length: 7 }).map((_, i) => startOfWeek.add(i, "day"));
  }

  const changeWeek = (direction: "prev" | "next") => {
    const newBaseDate =
      direction === "prev"
        ? currentWeek[0].subtract(7, "day")
        : currentWeek[0].add(7, "day");
    setCurrentWeek(getWeekArray(newBaseDate));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {currentWeek[0].format("YYYY년 MM월")}
        </Text>
        <TouchableOpacity>
          <Image
            source={require('../../assets/icons/calendar_picker_arrow.png')}
            style={styles.datePickerArrow}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.calendar}>
        <FlatList
          horizontal
          data={currentWeek}
          keyExtractor={(item) => item.format("YYYY-MM-DD")}
          renderItem={({ item }) => {
            const isImageDate = datesWithImage.some(date => date.isSame(item, 'day'));

            return (
              <View style={styles.dayContainer}>
                <Text
                  style={[
                    styles.dayText,
                    item.isSame(today, 'day') && styles.todayText
                  ]}
                >
                  {item.format("ddd")}
                </Text>
                <Text style={[styles.dateText, isImageDate && styles.whiteText]}>{item.format('D')}</Text>
                {datesWithImage.some(date => date.isSame(item, 'day')) && (
                  <Image
                    source={require('../../assets/icons/calendar_pick_date.png')}
                    style={styles.pickImage}
                  />
                )}
              </View>
            )
          }}
        />
        <TouchableOpacity onPress={() => changeWeek("next")}>
          <Text style={styles.navButton}>{">"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 140,
    flexDirection: "column",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10
  },
  headerText: {
    fontSize: 15,
    fontWeight: "bold",
    marginHorizontal: 10
  },
  datePickerArrow: {
    width: 18,
    height: 18,
    position: "relative",
    top: 4,
  },
  calendar: {
    height: 80,
    flexDirection: "row",
    alignItems: "center",
  },
  dayContainer: {
    height: 80,
    justifyContent: "space-around",
    alignItems: "center",
    marginHorizontal: 11
  },
  todayText: {
    color: "#38B7FF",
    fontWeight: "bold",
  },
  dayText: {
    width: 16,
    fontSize: 14,
  },
  whiteText: {
    textAlign: "center",
    color: 'white',
  },
  dateText: {
    textAlign: "center",
    width: 16,
    fontSize: 14,
    fontWeight: "bold"
  },
  pickImage: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -15 }, { translateY: 5 }],
    zIndex: -1,
    width: 30,
    height: 30,
  },
  navButton: {
    fontSize: 20,
    paddingHorizontal: 0,
    color: "gray",
  },
});

export default WeeklyCalendar;
