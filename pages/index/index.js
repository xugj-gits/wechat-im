import TIM from '../../utils/tim-wx.js';


let options = {
  SDKAppID: 1400313506 // 接入时需要将0替换为您的即时通信应用的 SDKAppID
};
// 创建 SDK 实例，TIM.create() 方法对于同一个 SDKAppID 只会返回同一份实例
let tim = TIM.create(options); // SDK 实例通常用 tim 表示

tim.setLogLevel(0);
tim.on(TIM.EVENT.MESSAGE_RECEIVED, function (event) {
  // 收到推送的单聊、群聊、群提示、群系统通知的新消息，可通过遍历 event.data 获取消息列表数据并渲染到页面
  // event.name - TIM.EVENT.MESSAGE_RECEIVED
  // event.data - 存储 Message 对象的数组 - [Message]
  console.log(99999999)
});


tim.login({
  userID: 'administrator',
  userSig: 'eJwtzMsOgjAUBNB-6drgbWsJkrh04QslwM5NTQteDUjaBhHjv0sKyzkzmS-Jj1nQaUNiwgIgC59R6cZhiZ6lqrFB64x0LzMPrHrKtkVFYroC4JQLCKdG9y0aPboQggHApA5rbxFnwCO2nl*wGv8r6hL12NZdel0a8Va5qXa34fApE1bQvc3kxd6LU5j2wxk25PcHoS814A__'//通过服务端获得
}).then((imResponse) => {
  console.log(imResponse.data); // 登录成功
  app.globalData.isImLogin = true
}).catch((imError) => {
  console.warn('login error:', imError); // 登录失败的相关信息
})

let promise3 = tim.joinGroup({ groupID: '@TGS#aCEAEYFGE', type: TIM.TYPES.GRP_AVCHATROOM });
promise3.then(function (imResponse) {
  switch (imResponse.data.status) {
    case TIM.TYPES.JOIN_STATUS_WAIT_APPROVAL: // 等待管理员同意
      break;
    case TIM.TYPES.JOIN_STATUS_SUCCESS: // 加群成功
      console.log(imResponse.data.group); // 加入的群组资料
      break;
    case TIM.TYPES.JOIN_STATUS_ALREADY_IN_GROUP: // 已经在群中
      break;
    default:
      break;
  }
}).catch(function (imError) {
  console.warn('joinGroup error:', imError); // 申请加群失败的相关信息
});


//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      console.log("rrrrrr")
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log("rrrrrr")
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  test: function(){
    console.log("=============")
    // 发送文本消息，Web 端与小程序端相同
    // 1. 创建消息实例，接口返回的实例可以上屏
    let message = tim.createTextMessage({
      to: '@TGS#aCEAEYFGE',
      conversationType: TIM.TYPES.CONV_GROUP,
      payload: {
        text: 'Hello 9999!'
      }
    });
    // 2. 发送消息
    let promise = tim.sendMessage(message);
    promise.then(function (imResponse) {
      // 发送成功
      console.log(imResponse);
    }).catch(function (imError) {
      // 发送失败
      console.warn('sendMessage error:', imError);
    });
    
    let promise1 = tim.getGroupMemberList({ groupID: '@TGS#aCEAEYFGE', count: 30, offset: 0 }); // 从0开始拉取30个群成员
    promise1.then(function (imResponse) {
      console.log(imResponse.data.memberList); // 群成员列表
    }).catch(function (imError) {
      console.warn('getGroupMemberList error:', imError);
    });

  },
})
