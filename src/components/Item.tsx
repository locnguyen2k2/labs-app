import {Text, View} from 'react-native';
import {maxWidth} from '../constants/sizes';
import {ItemStyle} from '../assets/styles/ItemStyle.module';
import {styles} from '../assets/styles/styles.module.tsx';
import {useEffect} from 'react';
import {thirdBgColor} from '../constants/colors.tsx';

const Item = ({item}: any) => {
  return (
    <View
      style={{
        margin: 5,
        height: 'auto',
        padding: 10,
        display: 'flex',
        borderRadius: 15,
        alignItems: 'flex-start',
        backgroundColor: '#FFFFFF',
        width: maxWidth / 2 - 10,
      }}>
      <View style={[ItemStyle.blockContent]}>
        <Text style={[ItemStyle.title]}>Tên:</Text>
        <Text style={[ItemStyle.content, {flex: 1}]} numberOfLines={1}>
          {item.name}
        </Text>
      </View>
      <View style={[ItemStyle.blockContent]}>
        <Text style={[ItemStyle.title]}>Trạng thái:</Text>
        <Text
          style={[
            ItemStyle.content,
            {
              color: 'black',
            },
          ]}
          numberOfLines={1}>
          {item.status}
        </Text>
      </View>
      <View style={[ItemStyle.blockContent]}>
        <Text style={[ItemStyle.title]}>Bàn giao:</Text>
        <Text
          style={[
            ItemStyle.content,
            {
              borderWidth: 0.5,
              borderRadius: 8,
              borderStyle: 'solid',
              color: item.handoverStatus === 1 ? 'green' : 'gray',
              borderColor: item.handoverStatus === 1 ? 'green' : 'gray',
            },
          ]}
          numberOfLines={1}>
          {item.handoverStatus === 1 ? 'Chưa bàn giao' : 'Đã bàn bàn'}
        </Text>
      </View>
    </View>
  );
};

const Category = ({isActive, item}: any) => {
  useEffect(() => {}, [isActive]);
  return (
    <View
      style={{
        margin: 5,
        padding: 10,
        borderRadius: 15,
        width: maxWidth / 3 - 10,
        backgroundColor: isActive === item.id ? thirdBgColor : '#FFFFFF',
      }}>
      <View style={[ItemStyle.blockContent, styles.justMiddle]}>
        <Text
          style={[
            ItemStyle.content,
            {color: isActive === item.id ? 'white' : 'black'},
          ]}
          numberOfLines={1}>
          {item.name}
        </Text>
      </View>
    </View>
  );
};

const Borrow = ({item}: any) => {
  return (
    <View
      style={{
        margin: 5,
        height: 'auto',
        padding: 10,
        display: 'flex',
        borderRadius: 15,
        alignItems: 'flex-start',
        backgroundColor: '#FFFFFF',
        width: maxWidth / 2 - 10,
      }}>
      <View style={[ItemStyle.blockContent]}>
        <Text style={[ItemStyle.title]}>Mã phiếu mượn:</Text>
        <Text style={[ItemStyle.content, {flex: 1}]} numberOfLines={1}>
          {item.registration.id}
        </Text>
      </View>
      <View style={[ItemStyle.blockContent]}>
        <Text style={[ItemStyle.title]}>Tên:</Text>
        <Text style={[ItemStyle.content, {flex: 1}]} numberOfLines={1}>
          {/*{item?.items[0].item.name}*/}
        </Text>
      </View>
      <View style={[ItemStyle.blockContent]}>
        <Text style={[ItemStyle.title]}>Trạng thái:</Text>
        <Text
          style={[
            ItemStyle.content,
            {
              color: 'black',
            },
          ]}
          numberOfLines={1}>
          {item.status}
        </Text>
      </View>
      <View style={[ItemStyle.blockContent]}>
        <Text style={[ItemStyle.title]}>Bàn giao:</Text>
        <Text
          style={[
            ItemStyle.content,
            {
              borderWidth: 1,
              borderRadius: 8,
              borderStyle: 'solid',
              color: item.handoverStatus === 1 ? 'green' : 'gray',
              borderColor: item.handoverStatus === 1 ? 'green' : 'gray',
            },
          ]}
          numberOfLines={1}>
          {item.handoverStatus === 1 ? 'Chưa bàn giao' : 'Đã bàn bàn'}
        </Text>
      </View>
    </View>
  );
};

export default {
  Item,
  Borrow,
  Category,
};
