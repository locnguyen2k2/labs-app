import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {ListBorrowed} from '../../components/List/ListBorrowed.tsx';
import Divider from '../../components/Divider.tsx';
import {maxHeight, primaryBtnHeight} from '../../constants/sizes.tsx';
import {setLoading} from '../../redux/loadingSlice.tsx';
import {useDispatch, useSelector} from 'react-redux';
import {borrowedService} from '../../services/borrowed.service.tsx';
import Skeleton from '../../components/Skeleton.tsx';
import {setListBorrowing} from '../../redux/borrowingReducer/borrowingSlice.tsx';
import {Search} from '../../components/Search.tsx';
import VerticalNav from '../../navigations/VerticalNav.tsx';
import TopNavigator from '../../navigations/TopNavigator.tsx';
import {ArrowLeftRegular, ArrowRightRegular} from '../../constants/icons.tsx';
import {ItemStyle} from '../../assets/styles/ItemStyle.module.tsx';

export default function BorrowedScreen() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: any) => state.loading);
  const [listItem, setListItem] = useState<any>([]);

  const [filterItems, setFilterItems] = useState<any>({
    hasNext: true,
    hasPrev: false,
    keyword: '',
    numberRecords: 0,
    page: 1,
    pages: 0,
    sort: '',
    take: 10,
  });

  const onSubmit = () => {
    onLoadData(1, filterItems.keyword);
  };

  const onLoadData = (page: any = null, keyword: string = '') => {
    dispatch(setLoading(true));
    borrowedService.getListBorrowed(page).then((res: any) => {
      if (res.meta) {
        setFilterItems({...res.meta});
      }
      if (res.data) {
        setListItem(res.data);
        dispatch(setListBorrowing({listBorrowing: listItem}));
        dispatch(setLoading(false));
      }
    });
  };

  const loadPages = (page: any) => {
    if (page <= filterItems.pages) {
      setFilterItems({...filterItems, page: page});
      onLoadData(page);
    }
  };

  useEffect(() => {
    onLoadData();
  }, []);

  return (
    <>
      <TopNavigator />
      <VerticalNav />
      <View>
        <Search
          onSearch={(searchText: any) =>
            setFilterItems({...filterItems, keyword: `${searchText}`})
          }
          onSubmit={() => onSubmit()}
        />
      </View>
      <Divider content={`Danh sách phiếu mượn`} />
      <View
        style={{
          display: 'flex',
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'center',
          height: maxHeight - (108 + 40 + primaryBtnHeight),
        }}>
        {isLoading || listItem.length === 0 ? (
          <Skeleton />
        ) : (
          <ListBorrowed data={listItem} />
        )}
      </View>
      <View>
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <TouchableOpacity
            disabled={!filterItems.hasPrev}
            style={{
              borderRadius: 8,
              paddingHorizontal: 10,
              backgroundColor: '#ffffff',
            }}
            onPress={() => loadPages(filterItems.page - 1)}>
            <ArrowLeftRegular width={32} height={32} />
          </TouchableOpacity>
          <Text style={[ItemStyle.content]}>{filterItems.page}</Text>
          <Text style={[ItemStyle.content]}>/</Text>
          <Text style={[ItemStyle.content]}>{filterItems.pages}</Text>
          <TouchableOpacity
            disabled={!filterItems.hasNext}
            style={{
              borderRadius: 8,
              paddingHorizontal: 10,
              backgroundColor: '#ffffff',
            }}
            onPress={() => loadPages(filterItems.page + 1)}>
            <ArrowRightRegular width={32} height={32} />
          </TouchableOpacity>
        </View>
      </View>
      {/*<ButtonCusPrimary*/}
      {/*  style={{*/}
      {/*    bottom: 5,*/}
      {/*    color: 'black',*/}
      {/*    position: 'absolute',*/}
      {/*    left: maxWidth / 2 - inpWPrimary / 2,*/}
      {/*  }}*/}
      {/*  onPress={() => loadPages(filterItems.page + 1)}*/}
      {/*  title={'Tải thêm'}*/}
      {/*/>*/}
    </>
  );
}
