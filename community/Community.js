import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, ScrollView, TouchableWithoutFeedback, TextInput, Keyboard } from 'react-native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';

function Community({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('전체');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInfo, setSelectedInfo] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  
  const today = new Date();
  const todayIndex = today.getDay();

  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  const datesOfWeek = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    return date.getDate();
  });

  const categories = ['전체', 'HOT', '교통', '시위', '재해', '주의'];

  const infoFilters = ['전체', '자연', '사회', '생활'];

  const nearbySafetyPosts = [
    { category: 'HOT', message: '2호선 강남역 근처에서 시위 때문에 교통정체가 심하니 다들 참고 하세요 !!!', timestamp: '2분전' },
    { category: '교통', message: '3호선 서울역에서 승객 수가 많아서 혼잡할 수 있습니다.', timestamp: '5분전' },
    { category: '시위', message: '시민들이 시위를 벌이고 있습니다. 주의하시기 바랍니다.', timestamp: '10분전' },
    { category: '재해', message: '비가 오고 있어서 길이 미끄럽습니다. 운전에 주의하세요.', timestamp: '15분전' },
    { category: '주의', message: '해수욕장에서 물때가 높습니다. 안전을 위해 신호를 따르세요.', timestamp: '20분전' },
  ];

  const safetyInfos = [
    { id: 1, title: '화재 시 행동요령', date: '2024.07.01', category: '자연' },
    { id: 2, title: '태풍 시 행동요령', date: '2024.07.02', category: '자연' },
    { id: 3, title: '교통사고', date: '2024.07.03', category: '사회' },
    { id: 4, title: '심폐소생술', date: '2024.07.04', category: '생활' },
  ];

  const filteredInfos = selectedCategory === '전체' ? safetyInfos : safetyInfos.filter(info => info.category === selectedCategory);

  const menuItems = [
    { id: '1', title: '내 근처 안전소식', navigateTo: 'NearbySafety', filter: null },
    { id: '2', title: '전체', navigateTo: 'NearbySafety', filter: '전체' },
    { id: '3', title: 'HOT', navigateTo: 'NearbySafety', filter: 'HOT' },
    { id: '4', title: '교통', navigateTo: 'NearbySafety', filter: '교통' },
    { id: '5', title: '시위', navigateTo: 'NearbySafety', filter: '시위' },
    { id: '6', title: '재해', navigateTo: 'NearbySafety', filter: '재해' },
    { id: '7', title: '주의', navigateTo: 'NearbySafety', filter: '주의' },
    { id: '8', title: '안전 정보', navigateTo: 'SafetyInfo', filter: null },
    { id: '9', title: '전체', navigateTo: 'SafetyInfo', filter: '전체' },
    { id: '10', title: '자연', navigateTo: 'SafetyInfo', filter: '자연' },
    { id: '11', title: '사회', navigateTo: 'SafetyInfo', filter: '사회' },
    { id: '12', title: '생활', navigateTo: 'SafetyInfo', filter: '생활' }
  ];

  const handleSearch = (query) => {
    setSearchQuery(query);
    // 검색 로직을 추가하세요.
  };

  const handleInfoPress = (info) => {
    setSelectedInfo(info);
    setInfoModalVisible(true);
  };

  const filteredNearbySafetyPosts = selectedCategory === '전체' ? nearbySafetyPosts : nearbySafetyPosts.filter(post => post.category === selectedCategory);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => setModalVisible(true)}>
          <MaterialIcons name="menu" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>커뮤니티</Text>
        <TouchableOpacity style={styles.iconButton} onPress={() => setSearchModalVisible(true)}>
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
        <TouchableOpacity style={styles.nearbySafetyContainer} onPress={() => navigation.navigate('NearbySafety')}>
          <Text style={styles.infoHeader}>
            내 근처 안전 소식
            <View style={styles.icons}>
              <AntDesign name="right" size={16} color="black" />
            </View>
          </Text>
        </TouchableOpacity>
        <View style={styles.hotPostContainer}>
          <View style={styles.postHeader}>
            <Text style={styles.hotText}>[HOT]</Text>
          </View>
          <Text style={styles.postTitle}>2호선 강남역 근처에서 시위 때문에 교통정체가 심하니 다들 참고 하세요!!!</Text>
          <Text style={styles.postTime}>2분 전</Text>
        </View>
        
        <View style={styles.categoryContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              onPress={() => setSelectedCategory(category)}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.selectedCategoryButton
              ]}
            >
              <Text style={[styles.categoryText, selectedCategory === category && styles.selectedCategoryText]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.filteredPostsContainer}>
          {filteredNearbySafetyPosts.map((post, index) => (
            <View key={index} style={styles.nearbyPostContainer}>
              <Text style={styles.postCategory}>[{post.category}]</Text>
              <Text style={styles.postMessage}>{post.message}</Text>
              <Text style={styles.postTimestamp}>{post.timestamp}</Text>
            </View>
          ))}
          {filteredNearbySafetyPosts.length === 0 && (
            <View style={styles.noPostsContainer}>
              <Text style={styles.noPostsText}>해당 카테고리에 대한 소식이 없습니다.</Text>
            </View>
          )}
        </View>

        <View style={styles.paginationContainer}>
          <Text style={styles.pageNumber}>1</Text>
          <TouchableOpacity style={styles.writeButton} onPress={() => navigation.navigate('WritePost')}>
            <MaterialIcons name="add" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.boldLine}></View>

        <TouchableOpacity style={styles.infoHeaderContainer} onPress={() => navigation.navigate('SafetyInfo')}>
          <Text style={styles.infoHeader}>
            안전 정보
            <View style={styles.icons}>
              <AntDesign name="right" size={16} color="black" />
            </View>
          </Text>
        </TouchableOpacity>
        <View style={styles.infoFiltersContainer}>
          {infoFilters.map((category, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedFilter(category)}
              style={[
                styles.categoryButton,
                selectedFilter === category && styles.selectedCategoryButton
              ]}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedFilter === category && styles.selectedCategoryText
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.infoCardsContainer}>
          {filteredInfos.map((info) => (
            <TouchableOpacity key={info.id} onPress={() => handleInfoPress(info)} style={styles.infoCardContainer}>
              <View style={styles.infoCard}>
                <Text style={styles.infoCardTitle}>{info.title}</Text>
              </View>
              <View style={styles.infoCardFooter}>
                <Text style={styles.infoCardDate}>{info.date}</Text>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryBadgeText}>{info.category}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <ScrollView contentContainerStyle={styles.menuItemsContainer}>
                  {menuItems.map(item => (
                    <TouchableOpacity 
                      key={item.id} 
                      onPress={() => { 
                        setModalVisible(false); 
                        if (item.filter === null) {
                          navigation.navigate(item.navigateTo);
                        } else {
                          navigation.navigate(item.navigateTo, { filter: item.filter });
                        }
                      }}
                    >
                      <Text style={[styles.modalText, (item.title === '내 근처 안전소식' || item.title === '안전 정보') && styles.boldText]}>
                        {item.title}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={searchModalVisible}
        onRequestClose={() => setSearchModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setSearchModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.searchModalContent}>
                <TextInput
                  style={styles.searchInput}
                  placeholder="검색어를 입력하세요"
                  value={searchQuery}
                  onChangeText={handleSearch}
                  autoFocus
                />
                <TouchableOpacity style={styles.searchButton} onPress={() => setSearchModalVisible(false)}>
                  <Text style={styles.searchButtonText}>검색</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={infoModalVisible}
        onRequestClose={() => setInfoModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedInfo?.banner}</Text>
            <TouchableOpacity style={styles.modalCloseButton} onPress={() => setInfoModalVisible(false)}>
              <Text style={styles.modalCloseText}>X</Text>
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
    paddingTop: '7%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '5%',
    paddingVertical: '3%',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  iconButton: {
    padding: 10,
  },
  calendarContainer: {
    marginTop: '3%',
    padding: '1%',
    backgroundColor: 'white',
    borderRadius: 15,
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
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  today: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d3d3d3',
  },
  dayText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  weekendText: {
    color: '#A51919',
  },
  weekdayText: {
    color: 'black',
  },
  dateText: {
    fontSize: 14,
    color: 'gray',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    width: '45%',
    height: '85%',
    alignItems: 'flex-start',
    marginTop: 60,
  },
  searchModalContent: {
    backgroundColor: 'white',
    padding: 20,
    width: '80%',
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: '40%',
    marginBottom: 'auto',
  },
  menuItemsContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  boldText: {
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: '5%',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  horizontalLine: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  infoFilterContainer: {
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
  horizontalLine: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 10,
  },
  safetyHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  safe: {
    marginBottom: 10,
  },
  safeItem: {
    marginVertical: 5,
  },
  safeText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  postContainer: {
    backgroundColor: 'transparent', // 배경색을 투명하게 설정
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  hotPostContainer: {
    backgroundColor: '#f3f3f3',
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
    color: '#A51919',
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
  boldLine: {
    height: 3,
    backgroundColor: '#E7E7E7',
    marginVertical: 20,
  },
  infoHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  infoHeaderContainer: {
    paddingHorizontal: '5%',
    marginVertical: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
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
  infoFiltersContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: 10,
    backgroundColor: '#f0f0f0',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingLeft: 10,
  },
  selectedCategoryButton: {
    backgroundColor: '#000',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  infoCardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  infoCardContainer: {
    width: '48%',
    marginBottom: 30,
  },
  infoCard: {
    backgroundColor: '#f3f3f3',
    padding: 10,
    borderRadius: 10,
    height: 110,
    elevation: 5,
    justifyContent: 'flex-end',
  },
  infoCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#969696',
    textAlign: 'left',
  },
  infoCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    position: 'absolute',
    bottom: -20,
    right: 10,
  },
  infoCardDate: {
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
  searchInput: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
    width: '100%',
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  searchButton: {
    backgroundColor: '#556D6A',
    padding: 10,
    borderRadius: 5,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalCloseButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modalCloseText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  nearbySafetyContainer: {
    paddingHorizontal: '5%',
    marginVertical: 10,
  },
  nearbySafetyText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  filteredPostsContainer: {
    marginVertical: 10,
  },
  nearbyPostContainer: {
    backgroundColor: 'transparent', // 배경색을 투명하게 설정
    borderRadius: 10,
    marginVertical: 5,
  },
  postCategory: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#A51919',
    marginBottom: 5,
  },
  postMessage: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  postTimestamp: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
  },
  noPostsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  noPostsText: {
    fontSize: 14,
    color: '#999',
  },
});

export default Community;
