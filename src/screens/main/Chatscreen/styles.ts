import { StyleSheet, Dimensions } from 'react-native';
import { CommonColors } from '../../../styles/Colors';
import { moderateScale,verticalScale } from '../../../styles/scaling';


const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: moderateScale(16),
    borderBottomWidth: moderateScale(1),
    borderBottomColor: '#E5E5E5',
    backgroundColor: '#fff',
  },
  icon: {
    width: moderateScale(34),
    height: moderateScale(34),
    marginHorizontal: moderateScale(8),
  },
  avatar: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
  },
  username: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: '#000',
  },
  status: {
    fontSize: moderateScale(12),
    color: '#4CAF50',
  },
  messagesContainer: {
    padding: moderateScale(16),
  },
  messageBubble: {
    maxWidth: width * 0.75,
    padding: moderateScale(12),
    marginVertical: verticalScale(4),
  },
  sent: {
    alignSelf: 'flex-end',
    backgroundColor: CommonColors.inputTextColor,
    color:CommonColors.white,
    borderTopRightRadius:moderateScale(10),
    borderTopLeftRadius:moderateScale(10),
    borderBottomLeftRadius:moderateScale(10)
  },
  received: {
    alignSelf: 'flex-start',
    backgroundColor: '#E5E5E5',
    borderTopRightRadius:moderateScale(10),
    borderTopLeftRadius:moderateScale(10),
    borderBottomRightRadius:moderateScale(10)
  },
  messageText: {
    fontSize: moderateScale(14),
    color: '#000',
  },
  time: {
    fontSize: moderateScale(10),
    color: '#666',
    marginTop: verticalScale(4),
    alignSelf: 'flex-end',
  },
  voiceMessageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E5E5E5',
    padding: moderateScale(12),
    borderRadius: moderateScale(16),
    marginVertical: verticalScale(4),
    maxWidth: width * 0.75,
    alignSelf: 'flex-start',
  },
  playButton: {
    width: moderateScale(32),
    height: moderateScale(32),
    borderRadius: moderateScale(16),
    backgroundColor: '#0084FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    width: moderateScale(16),
    height: moderateScale(16),
    tintColor: '#fff',
  },
  voiceBar: {
    flex: 1,
    height: moderateScale(2),
    backgroundColor: '#666',
    marginHorizontal: moderateScale(8),
  },
  voiceDuration: {
    fontSize: moderateScale(12),
    color: '#666',
    marginRight: moderateScale(8),
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: moderateScale(12),
    borderTopWidth: moderateScale(1),
    borderTopColor: '#E5E5E5',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    height: moderateScale(40),
    backgroundColor: '#F5F5F5',
    color: CommonColors.black,
    borderRadius: moderateScale(20),
    paddingHorizontal: moderateScale(16),
    marginHorizontal: moderateScale(8),
    fontSize: moderateScale(14),
  },
}); 