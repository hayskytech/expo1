import { Stack } from 'expo-router'
import React, { useEffect, useState, useRef } from 'react'
import { View, Text, StyleSheet, ScrollView, Dimensions, StatusBar, Platform } from 'react-native'
import { useSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context'

const { height: screenHeight, width: screenWidth } = Dimensions.get('window')

export default function Posts() {
  const insets = useSafeAreaInsets()
  const headerHeight = Platform.OS === 'ios' ? 44 : 56 // Standard header heights
  const availableHeight = screenHeight - insets.top - headerHeight - insets.bottom

  const [posts, setPosts] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollViewRef = useRef(null)

  useEffect(() => {
    fetch('https://haysky.com/wp-json/wp/v2/posts')
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          setPosts(data)
        }
      })
      .catch((error) => {
        console.error('Error fetching posts:', error)
        // Keep default posts if API fails
      })
  }, [])

  const handleScroll = (event) => {
    const { contentOffset, layoutMeasurement } = event.nativeEvent
    const currentPage = Math.round(contentOffset.y / layoutMeasurement.height)

    if (currentPage !== currentIndex && currentPage >= 0 && currentPage < posts.length) {
      setCurrentIndex(currentPage)
    }
  }

  const renderContent = (post) => {
    // Handle API posts with HTML content
    if (post.content?.rendered && typeof post.content.rendered === 'string') {
      // Simple HTML to text conversion for API posts
      const textContent = post.content.rendered
        .replace(/<[^>]*>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .trim()

      return (
        <ScrollView style={styles.textContent} showsVerticalScrollIndicator={false}>
          <Text style={styles.postContent}>{textContent}</Text>
        </ScrollView>
      )
    }

    // Handle structured content for default posts
    const content = post.content

    return (
      <ScrollView style={styles.textContent} showsVerticalScrollIndicator={false}>
        {content.intro && (
          <Text style={styles.sectionTitle}>{content.intro}</Text>
        )}

        {content.description && (
          <Text style={styles.description}>{content.description}</Text>
        )}

        {content.sections && content.sections.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionHeader}>{section.title}</Text>
            {section.items.map((item, itemIndex) => (
              <View key={itemIndex} style={styles.listItem}>
                <Text style={styles.bullet}>
                  {section.type === 'numbered' ? `${itemIndex + 1}.` : '•'}
                </Text>
                <Text style={styles.listText}>{item}</Text>
              </View>
            ))}
          </View>
        ))}

        {content.tip && (
          <View style={styles.tipContainer}>
            <Text style={styles.tipTitle}>💡 Pro Tip</Text>
            <Text style={styles.tipText}>{content.tip}</Text>
          </View>
        )}

        {content.conclusion && (
          <View style={styles.conclusionContainer}>
            <Text style={styles.conclusionText}>{content.conclusion}</Text>
          </View>
        )}
      </ScrollView>
    )
  }

  const dynamicStyles = StyleSheet.create({
    postContainer: {
      height: screenHeight, // Full height - SafeAreaView handles the spacing
      width: screenWidth,
      backgroundColor: '#ffffff'
    }
  })

  return (
    <>
      <Stack.Screen options={{
        headerShown: false
      }} />
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <ScrollView
        ref={scrollViewRef}
        style={styles.container}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        scrollEventThrottle={16}
      >
        {posts.map((post, index) => (
          <View key={post.id} style={dynamicStyles.postContainer}>
            <View style={styles.postHeader}>
              <Text style={styles.postTitle}>
                {post.title?.rendered || post.title}
              </Text>
              <Text style={styles.postDate}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </Text>
            </View>
            <View style={styles.contentContainer}>
              {renderContent(post)}
            </View>
          </View>
        ))}
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },

  postHeader: {
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef'
  },
  postTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center'
  },
  postDate: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
    fontStyle: 'italic'
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  textContent: {
    flex: 1,
    padding: 20
  },
  postContent: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    textAlign: 'justify'
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 15,
    textAlign: 'center'
  },
  description: {
    fontSize: 18,
    lineHeight: 26,
    color: '#333',
    marginBottom: 25,
    textAlign: 'justify'
  },
  section: {
    marginBottom: 25
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#28a745',
    marginBottom: 15
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 12,
    paddingLeft: 10
  },
  bullet: {
    fontSize: 16,
    color: '#007bff',
    fontWeight: 'bold',
    marginRight: 10,
    minWidth: 20
  },
  listText: {
    fontSize: 16,
    lineHeight: 22,
    color: '#333',
    flex: 1
  },
  tipContainer: {
    backgroundColor: '#e7f3ff',
    padding: 20,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#007bff',
    marginVertical: 20
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 10
  },
  tipText: {
    fontSize: 16,
    lineHeight: 22,
    color: '#333',
    fontStyle: 'italic'
  },
  conclusionContainer: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center'
  },
  conclusionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#495057',
    textAlign: 'center'
  },
  pageIndicator: {
    padding: 15,
    backgroundColor: '#007bff',
    alignItems: 'center'
  },
  pageText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold'
  }
});
