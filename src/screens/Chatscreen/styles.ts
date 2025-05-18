import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    backgroundColor: '#fff',
  },
  icon: {
    width: 24,
    height: 24,
    marginHorizontal: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  status: {
    fontSize: 12,
    color: '#4CAF50',
  },
  messagesContainer: {
    padding: 16,
  },
  messageBubble: {
    maxWidth: width * 0.75,
    padding: 12,
    borderRadius: 16,
    marginVertical: 4,
  },
  sent: {
    alignSelf: 'flex-end',
    backgroundColor: '#0084FF',
  },
  received: {
    alignSelf: 'flex-start',
    backgroundColor: '#E5E5E5',
  },
  messageText: {
    fontSize: 14,
    color: '#000',
  },
  time: {
    fontSize: 10,
    color: '#666',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  voiceMessageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E5E5E5',
    padding: 12,
    borderRadius: 16,
    marginVertical: 4,
    maxWidth: width * 0.75,
    alignSelf: 'flex-start',
  },
  playButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#0084FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    width: 16,
    height: 16,
    tintColor: '#fff',
  },
  voiceBar: {
    flex: 1,
    height: 2,
    backgroundColor: '#666',
    marginHorizontal: 8,
  },
  voiceDuration: {
    fontSize: 12,
    color: '#666',
    marginRight: 8,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 16,
    marginHorizontal: 8,
    fontSize: 14,
  },
}); 