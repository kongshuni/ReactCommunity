// components/Community.js

import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

function Community({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const today = new Date();
  const todayIndex = today.getDay();
  const todayDate = today.getDate();

  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  const datesOfWeek = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    return date.getDate();
  });

  const [selectedFilter, setSelectedFilter] = useState('전체');

  const filters = ['전체', 'HOT', '교통', '시위', '재해', '주의'];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => setModalVisible(true)}>
          <MaterialIcons name="menu" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>커뮤니티</Text>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialIcons name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.calendarContainer}>
        <View style={styles.calendar}>
          {daysOfWeek.map((day, index) => (
            <View key={index} style={[styles.day, index === todayIndex && styles.today]}>
              <Text style={[styles.dayText, (day === 'SUN' || day === 'SAT') ? styles.weekendText : styles.weekdayText]}>{day}</Text>
              <Text style={styles.dateText}>{datesOfWeek[index]}</Text>
            </View>
          ))}
        </View>
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.filterContainer}>
          {filters.map((filter) => (
            <TouchableOpacity key={filter} onPress={() => setSelectedFilter(filter)}>
              <Text style={[styles.filterText, filter === selectedFilter && styles.selectedFilterText]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.postContainer}>
          <View style={styles.postHeader}>
            <Text style={styles.hotText}>[HOT]</Text>
            <Text style={styles.postTitle}>2호선 강남역 근처에서 시위 때문에 교통정체가 심하니 다들 참고 하세요!!!</Text>
          </View>
          <Text style={styles.postTime}>2분 전</Text>
        </View>
        <View style={styles.paginationContainer}>
          <Text style={styles.pageNumber}>1</Text>
          <TouchableOpacity style={styles.writeButton} onPress={() => navigation.navigate('WritePost')}>
            <MaterialIcons name="add" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <MaterialIcons name="close" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setModalVisible(false); navigation.navigate('NearbySafety'); }}>
              <Text style={styles.modalText}>내 근처 안전소식</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: '10%',
    paddingBottom: '5%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '5%',
    paddingVertical: '3%',
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  iconButton: {
    padding: 10,
  },
  calendarContainer: {
    marginTop: '5%',
    padding: '1%',
    backgroundColor: 'white',
    borderRadius: 20,
    marginHorizontal: '5%',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  calendar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  day: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  today: {
    backgroundColor: '#d3d3d3',
    borderRadius: 5,
    padding: 10,
  },
  dayText: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  weekendText: {
    color: 'red',
  },
  weekdayText: {
    color: 'black',
  },
  dateText: {
    fontSize: 14,
    color: 'gray',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  content: {
    flex: 1,
    paddingHorizontal: '5%',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  filterText: {
    fontSize: 16,
    color: 'black',
  },
  selectedFilterText: {
    fontWeight: 'bold',
    color: 'blue',
  },
  postContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hotText: {
    color: 'red',
    fontWeight: 'bold',
    marginRight: 5,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  postTime: {
    fontSize: 12,
    color: 'gray',
    textAlign: 'right',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  pageNumber: {
    fontSize: 16,
    marginRight: 10,
  },
  writeButton: {
    position: 'absolute',
    right: 0,
  },
});

export default Community;
