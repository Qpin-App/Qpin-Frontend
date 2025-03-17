import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { CalendarProvider, WeekCalendar } from "react-native-calendars";

const WeeklyCalendarScreen = () => {
  const today = new Date();
  const cvtParamDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [selectedDate, setSelectedDate] = useState(cvtParamDate(today));

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  return (
    <CalendarProvider date={selectedDate}>
      <View style={styles.container}>
        <WeekCalendar
          firstDay={0}
          markedDates={{
            [selectedDate]: {
              selected: true,
              selectedColor: "blue",
            },
          }}
          onDayPress={onDayPress}
        />
      </View>
    </CalendarProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
});

export default WeeklyCalendarScreen;
