import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import BottomTabBar from '../BottomTabBar';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const SafetyInfo = ({ navigation, route }) => {
  const { filter } = route.params || { filter: '전체' };
  const [selectedCategory, setSelectedCategory] = useState(filter);

  const categories = ['전체', '자연', '사회', '생활'];

  const safetyInfos = [
    { id: 1, title: '화재 시\n행동요령', date: '2024.07.01', category: '자연' },
    { id: 2, title: '태풍 시\n행동요령', date: '2024.07.02', category: '자연' },
    { id: 3, title: '교통사고', date: '2024.07.03', category: '사회' },
    { id: 4, title: '심폐소생술', date: '2024.07.04', category: '생활' },
    { id: 5, title: '침수 시\n행동요령', date: '2024.07.05', category: '자연' },
    { id: 6, title: '뺑소니', date: '2024.07.06', category: '사회' },
    { id: 7, title: '응급처치', date: '2024.07.07', category: '생활' },
  ];

  const filteredInfos = selectedCategory === '전체' ? safetyInfos : safetyInfos.filter(info => info.category === selectedCategory);

  useEffect(() => {
    if (filter) {
      setSelectedCategory(filter);
    }
  }, [filter]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="keyboard-arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>안전 정보</Text>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialIcons name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.bannerContainer}>
        <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} style={styles.banner}>
          <View style={[styles.bannerItem, styles.firstBanner]}>
            <Text style={styles.bannerSubtitle}>여름철 빈번하게 발생하는</Text>
            <Text style={styles.bannerText}>폭우 시 예방수칙</Text>
          </View>
          <View style={[styles.bannerItem, styles.secondBanner]}>
            <Text style={styles.bannerSubtitle}>화재 발생 시</Text>
            <Text style={styles.bannerText}>대피요령</Text>
          </View>
        </ScrollView>
      </View>

      <View style={styles.categoryContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            onPress={() => setSelectedCategory(category)}
            style={styles.categoryButton}
          >
            <Text style={[styles.categoryText, selectedCategory === category && styles.selectedCategoryText]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.infoContainer}>
        <View style={styles.infoRow}>
          {filteredInfos.map((info) => (
            <View key={info.id} style={styles.infoCardContainer}>
              <View style={styles.infoCard}>
                <Text style={styles.infoTitle}>{info.title}</Text>
              </View>
              <View style={styles.infoFooter}>
                <Text style={styles.infoDate}>{info.date}</Text>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryBadgeText}>{info.category}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <BottomTabBar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
    paddingTop: '10%',
    paddingBottom: '5%',
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
  bannerContainer: {
    height: 200,
  },
  banner: {
    height: '100%',
    backgroundColor: '#e0e0e0',
  },
  bannerItem: {
    width: SCREEN_WIDTH - 10,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    marginHorizontal: 5,
    borderRadius: 10,
    padding: 20,
  },
  firstBanner: {
    backgroundColor: '#333B54',
  },
  secondBanner: {
    backgroundColor: '#5E6377',
  },
  bannerText: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  bannerSubtitle: {
    color: 'white',
    fontSize: 15,
    textAlign: 'left',
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: 10,
    backgroundColor: '#f0f0f0',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingLeft: 10,
  },
  categoryButton: {
    paddingHorizontal: 10,
  },
  categoryText: {
    fontSize: 16,
    color: '#999',
  },
  selectedCategoryText: {
    fontWeight: 'bold',
    color: 'black',
  },
  infoContainer: {
    paddingHorizontal: '5%',
    paddingTop: 10,
  },
  infoRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  infoCardContainer: {
    width: '48%',
    marginBottom: 30,
  },
  infoCard: {
    backgroundColor: '#F3F3F3',
    padding: 20,
    borderRadius: 10,
    height: 110,
    elevation: 5,
    justifyContent: 'flex-end',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#969696',
    textAlign: 'left',
  },
  infoFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    position: 'absolute',
    bottom: -20,
    right: 10,
  },
  infoDate: {
    fontSize: 12,
    color: '#999',
    marginRight: 5,
  },
  categoryBadge: {
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 6,
  },
  categoryBadgeText: {
    fontSize: 12,
    color: '#999',
  },
});

export default SafetyInfo;