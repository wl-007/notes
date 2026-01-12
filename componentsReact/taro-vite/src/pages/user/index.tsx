import { View, Text, Button } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.scss'
import Taro from '@tarojs/taro'

export default function User () {
  useLoad(() => {
    console.log('Page loaded.')
  })
  const goToPage = () => {
    Taro.navigateBack()
  }
  return (
    <View className='user'>
      <Button className='btn-max-w' plain type='primary' onClick={goToPage}>返回</Button>
    </View>
  )
}
