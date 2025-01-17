import { View, Text, Switch } from '@tarojs/components'
import styles from './index.module.less'
import {saveUser, getUser, removeUser} from '@/common/user'
import {cacheUserPass, getCacheUserPass} from '@/common/data'
import Taro, { clearStorage, pageScrollTo } from '@tarojs/taro'
import { useEffect, useState } from 'react'
import { AtAvatar, AtForm, AtInput, AtButton } from 'taro-ui'
import fetch from '@/utils/request'

const Index = () =>{
    const [imgUrl,setImgUrl] = useState()
    const [name,setName] = useState()
    const [pass,setPass] = useState()
    const [save,setSave] = useState()

    useEffect(()=>{
        const up = getCacheUserPass()
        setSave(up.save)
        setName(up.name)
        setPass(up.pass)
       
    },[])

    const login = async ()=>{
        if(name&&pass){
            let user = await fetch({url: '/v1/admin/users/login',data: {user_name:name,pass}})
            if (user instanceof Error)return

            if (save){
                cacheUserPass({name,pass,save})
            }else{
                cacheUserPass({save})
            }

            // console.log(user)
            saveUser(user)
            // 关闭所有界面 并转到首页界面
            // 用在这里的原因：
            // 用户的切换时，需要关闭原用户的界面信息，所以不能用switchTab
            Taro.reLaunch({url:'/pages/index/index'})
        }
    }
 
    useEffect(()=>{
        (async function(){
            // 请求授权的信息
            let set = await Taro.getSetting()
            if (!set.authSetting['scope.userInfo']) {
                let res = await Taro.authorize({
                    scope: 'scope.userInfo'
                })
                if (res.errMsg.indexOf('ok')<0){
                    Taro.showToast({icon:'none',title:'授权失败'})
                    return 
                }
            }

            // 必须是在用户已经授权的情况下调用
            let user = await Taro.getUserInfo()
            setImgUrl(user.userInfo.avatarUrl)
        })()
    },[])

    return (
        <View className={styles.index}>
            <AtAvatar image={imgUrl} size='large' circle></AtAvatar>
            <View className={styles.form}>
                <AtInput title='用户名' type='text' placeholder='请输入您的用户名' name='name' value={name} onChange={setName} cursorSpacing={100}/>
                <AtInput title='密码' type='password' placeholder='请输入您的密码' name='pass' value={pass} onChange={setPass} cursorSpacing={100}/>
                <View className={styles.save}>
                    记住账号和密码 <Switch color='#6a91e1' checked={save} onChange={()=>{
                        setSave(!save)
                    }} />
                </View>
                
                <AtButton type='primary' onClick={login}>登录</AtButton>
            </View>
        </View>
    )
}

export default Index