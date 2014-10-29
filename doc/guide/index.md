## 综述

PrizeDraw是一个简单抽奖工具，用户通过配置参与者和奖品进行抽奖。

* 版本：2.0.3
* 作者：辰惬
* demo：[http://kg.kissyui.com/prize-draw/2.0.3/demo/index.html](http://gallery.kissyui.com/prize-draw/2.0.3/demo/index.html)

## 初始化组件
		
    S.use('kg/prize-draw/2.0.0/index', function (S, PrizeDraw) {
         var prize-draw = new PrizeDraw();
    })
	
	

## API说明
本组件依赖DOM结构，以下配置是默认值：  
	
	{
       configCont:'#J_configCont',//配置容器
       showDrawCont:'#J_showDraw',//抽奖容器
       peopleSetCont:'#J_candidateInput',//输入参与者容器
       prizeSetCont:'#J_prizeInput',//输入奖品容器
       configBtn:'#J_config',//设置button
       peopleCont:'#J_candidate',//参与者展示容器
       prizeCont:'#J_prize',//奖品展示容器
       resultCont:'#J_result',//获奖结果展示容器
       startBtn:'#J_start',//抽奖开始button
       endBtn:'#J_end',//抽奖结束button
       resetBtn:'#J_reset',//重置按钮
       timeInterval:400//抽奖时轮换时间间隔，单位是毫秒，默认值400
    }  
    
## 使用说明  
1.配置参与抽奖者名单，以逗号，分隔  
2.配置奖品，以逗号，分隔（也可不配置）  
3.完成配置，进入抽奖操作  
4.选择一个奖品，点击【开始】，在任意时刻点击【结束】，完成一次抽奖。  
5.可进行多次抽奖，直至所有人都已中过奖。