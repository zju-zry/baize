import { View, Image, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import NavBar from '@/components/NavBar'
import styles from './index.module.less'

const Index = () =>{
    const datas = [
        {src:'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211104233623.png',value:6},
        {src:'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211104233623.png',value:6},
        {src:'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211104233623.png',value:6},
        {src:'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211104233623.png',value:6},
        {src:'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211104233623.png',value:6},
        {src:'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211104233623.png',value:6},
        {src:'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211104233623.png',value:6},
        {src:'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211104233623.png',value:6},
        {src:'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211104233623.png',value:6},
        {src:'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211104233623.png',value:6},
        {src:'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211104233623.png',value:6},
        {src:'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211104233623.png',value:6},
        {src:'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211104233623.png',value:6},
        {src:'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211104233623.png',value:6},
        {src:'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211104233623.png',value:6},
        {src:'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211104233623.png',value:6},
    ]
    return (
        <View className={styles.index}>
            <NavBar title='本地数据管理' />
            <View className={styles.title}>本地数据情况</View>
            <View className={styles.data}>
                <View className={styles.name}>手写数字识别-浙江大学群体实验</View>
                <View className={styles.localDatas}>
                    {datas.map(({src,value}, i)=>(
                        <View key={i} className={styles.localData}>
                            {src&&<Image src={src}></Image>}
                            <View>{value}</View>
                        </View>
                    ))}
                </View>
                <View className={styles.info}>
                    本地数据：12份
                </View>
                <Button className={styles.addData}
                  onClick={()=>Taro.navigateTo({url:'/packageTask/pages/addLocalData/index'})}
                >
                    <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211105002538.png'></Image>
                    添加本地数据
                </Button>
                <Button className={styles.train}
                  onClick={()=>Taro.navigateTo({url:'/packageTask/pages/train/index'})}
                >
                    手动参与训练
                </Button>
            </View>

        </View>
    )
}

export default Index