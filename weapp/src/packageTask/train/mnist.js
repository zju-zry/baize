// 本章的目的是训练sequential
import * as tf_core from '@tensorflow/tfjs-core'
import * as tf_layers from '@tensorflow/tfjs-layers'
import { resize } from '../../../utils/image_tools'


const main = async () =>{
    // 1. 获取数据集
    let x_train=[],y_train=[]
    const imgs = [
        {url:'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20210713000535.png',label:5},
        {url:'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20210713000551.png',label:6},    
    ]
    for (let i in imgs){
        let {data} = await resize({src:imgs[i].url})
        data = data.filter((v,i)=>i%4===0)
        data = data.map(v=>v/255)
        data = Float32Array.from(data)   // tensor1d 支持的数据类型为 'float32'|'int32'|'bool'|'complex64'|'string'
        // console.log(data)
        // data = tf_core.tensor1d(data)
        x_train=[...x_train,...data]
        y_train=[...y_train,imgs[i].label]
    }
    // console.log(x_train,y_train)   // 输出训练数据 
    x_train = tf_core.tensor2d(x_train,[imgs.length,784])   
    y_train = tf_core.tensor1d(y_train,'int32')
    y_train = tf_core.oneHot(y_train,10)

    // 2. 创建模型
    let model = tf_layers.sequential({
        layers:[
            tf_layers.layers.dense({units: 128, activation: 'relu', inputShape: [784]}),
            tf_layers.layers.dense({units: 10, activation: 'softmax'}), 
        ]
    })

    // 3. 模型配置
    model.compile({
        optimizer: 'adamax',
        loss:'categoricalCrossentropy',
        metrics: ['accuracy'],
    })

    // 4. 模型训练
    const {history} = await model.fit(x_train,y_train,{
        batchSize:16,
        epochs:2,
        validationSplit: 0.2,
        shuffle:true,
        callbacks:[
            {
                // 每epoch结束之后的回调
                onEpochEnd:(epoch, logs)=>{
                    console.log(epoch)
                    console.log(logs)
                }
            }
        ]
    })
    for (let i in history.loss){
        console.log(`loss after epoch ${i}: ${history.loss[i]}`)
    }

    // 5. 模型形状展示 
    model.summary()

    // 6. 模型预测
    // let test_url = 'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20210713001056.png' // 2 识别错误
    // let test_url = 'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20210713001203.png' // 0  识别准确
    // let test_url = 'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20210713001313.png' // 6  正确
    for (let ti in imgs){
        let {data:pred_data}=await resize({src:imgs[ti].url})
        pred_data = pred_data.filter((v,i)=>i%4===0)
        pred_data = Float32Array.from(pred_data) 
        model.predict(tf_core.tensor2d(pred_data,[1,784])).print()
        console.log(imgs[ti].label)
    }
    // let ti = 0
    
}

export default main