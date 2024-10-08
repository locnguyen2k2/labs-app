import React, {useEffect, useState} from 'react';
import {ListCategory} from '../../components/List/ListCategory.tsx';
import {ListItem} from '../../components/List/ListItem.tsx';
import {useDispatch, useSelector} from 'react-redux';
import {setLoading} from '../../redux/loadingSlice.tsx';
import {itemService} from '../../services/item.service.tsx';
import {Text, TouchableOpacity, View} from 'react-native';
import {maxHeight, maxWidth, primaryBtnHeight} from '../../constants/sizes.tsx';
import Skeleton from '../../components/Skeleton.tsx';
import Divider from '../../components/Divider.tsx';
import {secondaryBgColor} from '../../constants/colors.tsx';
import {Search} from '../../components/Search.tsx';
import VerticalNav from '../../navigations/VerticalNav.tsx';
import TopNavigator from '../../navigations/TopNavigator.tsx';
import {setHistory} from '../../redux/appSlice.tsx';
import * as RootNavigation from '../../helps/RootNavigation';
import {ArrowLeftRegular, ArrowRightRegular} from '../../constants/icons.tsx';
import {ItemStyle} from '../../assets/styles/ItemStyle.module.tsx';

export default function ListItemScreen() {
  const dispatch = useDispatch();
  const [listItem, setListItem] = useState<any>([]);
  const [categoryId, setCategoryId] = useState<any>(0);
  const isLoading = useSelector((state: any) => state.loading);
  const onChangeCategoryId = (id: number) => setCategoryId(id);
  const [title, setTitle] = useState<
    'tất cả' | 'thiết bị' | 'hóa chất' | 'dụng cụ'
  >('tất cả');
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

  const onLoadData = (page: any = null, keyword: string = '') => {
    dispatch(setLoading(true));
    switch (categoryId) {
      case 0:
        itemService.getAll(page, keyword).then(async (res: any) => {
          if (res.meta) {
            setFilterItems({...res.meta});
          }
          if (res.data) {
            dispatch(setLoading(false));
            setTitle('tất cả');
            setListItem(res.data);
          }
        });
        break;
      case 1:
        itemService.getListEquipment(page, keyword).then(async (res: any) => {
          if (res.meta) {
            setFilterItems({...res.meta});
          }
          if (res.data) {
            dispatch(setLoading(false));
            setTitle('thiết bị');
            setListItem(res.data);
          }
        });
        break;
      case 2:
        itemService.getListTool(page, keyword).then(async (res: any) => {
          if (res.meta) {
            setFilterItems({...res.meta});
          }
          if (res.data) {
            setTitle('dụng cụ');
            setListItem(res.data);
            dispatch(setLoading(false));
          }
        });
        break;
      case 3:
        itemService.getListChemicals(page, keyword).then(async (res: any) => {
          if (res.meta) {
            setFilterItems({...res.meta});
          }
          if (res.data) {
            setTitle('hóa chất');
            setListItem(res.data);
            dispatch(setLoading(false));
          }
        });
        break;
      default:
        itemService.getListEquipment(page, keyword).then(async (res: any) => {
          if (res.meta) {
            setFilterItems({...res.meta});
          }
          if (res.data) {
            setListItem(res.data);
            dispatch(setLoading(false));
          }
        });
        break;
    }
  };

  const loadPages = (page: any) => {
    if (page <= filterItems.pages) {
      setFilterItems({...filterItems, page: page});
      onLoadData(page);
    }
  };

  const onSubmit = () => {
    onLoadData(1, filterItems.keyword);
  };

  useEffect(() => {
    onLoadData();
    dispatch(
      setHistory({
        history: RootNavigation.navigationRef.getRootState().history,
      }),
    );
  }, [categoryId]);

  return (
    <>
      <TopNavigator title={'Trang thiết bị'} />
      <VerticalNav />
      <View
        style={[
          {height: 40, width: maxWidth, backgroundColor: secondaryBgColor},
        ]}>
        <ListCategory onChange={onChangeCategoryId} />
      </View>
      <View>
        <Search
          onSearch={(searchText: any) =>
            setFilterItems({...filterItems, keyword: `${searchText}`})
          }
          onSubmit={() => onSubmit()}
        />
      </View>
      <Divider content={`Danh sách ${title}`} />
      <View
        style={{
          display: 'flex',
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'center',
          height: maxHeight - (108 + 35 + 55 + primaryBtnHeight),
        }}>
        {isLoading || listItem.length === 0 ? (
          <Skeleton />
        ) : (
          <ListItem
            data={listItem}
            categoryId={categoryId}
            filterItems={filterItems}
          />
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
      {/*    height: 35,*/}
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
