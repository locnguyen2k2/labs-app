import {Text, View} from 'react-native';
import {maxWidth} from '../constants/sizes.tsx';
import {primaryBgColor} from '../constants/colors.tsx';

export default function Divider(props: any) {
  return (
    <View
      style={{
        position: 'relative',
        display: 'flex',
        width: maxWidth,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
      }}>
      <View
        style={{
          height: 3,
          flex: 1,
          zIndex: 997,
          marginVertical: 10,
          backgroundColor: '#000000',
        }}></View>

      {props.content && (
        <View
          style={[
            {
              zIndex: 998,
              position: 'absolute',
              paddingHorizontal: 8,
              backgroundColor: primaryBgColor,
            },
          ]}>
          <Text style={{color: 'black'}}>
            {props.content ? props.content : null}
          </Text>
        </View>
      )}
    </View>
  );
}