import { View, Text, Icon, Button } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import "./index.scss";
import Taro from "@tarojs/taro";
import "./test/test"

import TC from "./tC/tC";

export default function Index() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  const goToPage = () => {
    Taro.navigateTo({
      url: '/pages/user/index'
    })
  }
  return (
    <View className="index">
      <View className='components-page'>
        <Text>flex-direction: row 横向布局</Text>
        <View className='flex-wrp' style='flex-direction:row;'>
          <View className='flex-item demo-text-1'/>
          <View className='flex-item demo-text-2'/>
          <View className='flex-item demo-text-3'/>
        </View>
        <Text>flex-direction: column 纵向布局</Text>
        <View className='flex-wrp' style='flex-direction:column;'>
          <View className='flex-item flex-item-V demo-text-1'/>
          <View className='flex-item flex-item-V demo-text-2'/>
          <View className='flex-item flex-item-V demo-text-3'/>
        </View>
      </View>
       <Icon size={60} type='warn' color='#ccc' />
       <Icon size={60} type='success' />
      <Button className='btn-max-w' plain type='primary' onClick={goToPage}>按钮</Button>
      TARO_ENV：{process.env.TARO_ENV}
      <TC />
    </View>
  );
}
