<template>
  <div class="home">
    <el-row :gutter="20" >
      <el-col :span="8">
        <el-card shoadow="hover">
          <div class="user">
            <div class="imgBox"><img :src="userImg" /></div>
            <div class="userInfo">
              <p class="name">Admin</p>
              <p class="access">超级管理员</p>
            </div>
          </div>
          <div class="login-info">
            <p>上次登录的时间:<span>2022-2-19</span></p>
            <p>上次登录的地点:<span>深圳</span></p>
          </div>
        </el-card>

        <el-card style="margin-top:20px;height:460px">
          <el-table :data="tableData">
            <el-table-column 
            v-for="(item,key) in tableLabel" 
            :key="key" 
            :label="item"
            align='center'
            :prop="key">
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="16">
        <div class="num">
          <el-card v-for="item in countData" :key="item.name" :body-style="{display:'flex',padding:0}">
            <i class="icon" :class="`el-icon-${item.icon}`" :style="{background:item.color}"></i>
            <div class="detail">
              <p class="price">￥{{item.value}}</p>
              <p class="txt">{{item.name}}</p>
            </div>
          </el-card>
        </div>
        <el-card style="height:315px">
          <!-- <div style="height:315px" ref="echarts"></div> -->
          <echart :chartData='echartData.order' style="height:315px" />
        </el-card>
        <div class="graph">
          <el-card style="height:260px">
            <!-- <div style="height:240px" ref="userEcharts"></div> -->
            <echart :chartData='echartData.user' style="height:240px" />
          </el-card>
          <el-card style="height:260px">
            <!-- <div style="height:240px" ref="videoEcharts"></div> -->
            <echart :chartData='echartData.video' :isAxisChart='false' style="height:240px" />
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getData } from '../../api/data.js'
import * as echarts from 'echarts'
import Echart from '../../components/Echarts.vue'
export default {
  name:'index',
  data(){
    return{
      userImg:require('../../assets/user.png'),
      tableData:[
        {
            name: 'oppo',
            todayBuy: 500,
            monthBuy: 3500,
            totalBuy: 22000
          },
          {
            name: 'vivo',
            todayBuy: 300,
            monthBuy: 2200,
            totalBuy: 24000
          },
          {
            name: '苹果',
            todayBuy: 800,
            monthBuy: 4500,
            totalBuy: 65000
          },
          {
            name: '小米',
            todayBuy: 1200,
            monthBuy: 6500,
            totalBuy: 45000
          },
          {
            name: '三星',
            todayBuy: 300,
            monthBuy: 2000,
            totalBuy: 34000
          },
          {
            name: '魅族',
            todayBuy: 350,
            monthBuy: 3000,
            totalBuy: 22000
          }
      ],
      tableLabel:{
        name:'课程',
        todayBuy:'今日购买',
        monthBuy:'本月购买',
        totalBuy:'总购买'
      },
      countData:[
        {
          name:'今日支付订单',
          value:1234,
          icon:'success',
          color:'#2ec7c9',
        },
        {
          name:'今日收藏订单',
          value:210,
          icon:'star-on',
          color:'#ffb988'
        },
        {
          name:'今日未支付订单',
          value:1234,
          icon:'s-goods',
          color:'#5ab1ef'
        },
        {
          name:'本月支付订单',
          value:1234,
          icon:'success',
          color:'#2ec7c9'
        },
        {
          name:'本月收藏订单',
          value:210,
          icon:'star-on',
          color:'#ffb980'
        },
        {
          name:'本月未支付订单',
          value:1234,
          icon:'s-goods',
          color:'#5ab1ef'
        }
      ],
      echartData:{
        order:{
          xData:[],
          series:[]
        },
        user:{
          xData:[],
          series:[]
        },
        video:{
          series:[]
        }
      }
    }
  },
  components: {
    Echart
  },
  mounted(){
    getData().then(res => {
      // console.log(res);
      const {code,data} = res.data;
      if(code === 20000){
        this.tableData = data.tableData;
        const order = data.orderData
        const xData = order.date
        // console.log(order);
        const keyArray = Object.keys(order.data[0])
        const series = [];
        keyArray.forEach(key => {
          series.push({
            name:key,
            data:order.data.map(item => item[key]),
            type:'line'
          })
        })
        this.echartData.order.xData = xData
        this.echartData.order.series = series
        //用户图
        this.echartData.user.xData = data.userData.map(item => item.date)
        this.echartData.user.series = [
            {
              name:'新增用户',
              data:data.userData.map(item => item.new),
              type:'bar'
            },
            {
              name:'活跃用户',
              data:data.userData.map(item => item.active),
              type:'bar'
            }
          ]

        //饼图
        this.echartData.video.series =[
          {
            data:data.videoData,
            type:'pie'
          }
        ]
      }
    })
  }
}
</script>

<style>

</style>