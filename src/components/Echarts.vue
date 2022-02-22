<template>
  <div ref="echart"></div>
</template>

<script>
import * as echarts from 'echarts'
  export default{
    props:{
      isAxisChart:{//用于判断是否是饼图
        type:Boolean,
        default:true
      },
      chartData:{//数据
        type:Object,
        default(){
          return {
            xData:[],
            series:[]
          }
        }
      }
    },
    watch:{
      chartData:{
        handler:function(){
          this.initChart()
        },
        deep:true
      }
    },
    methods: {
      initChart(){
        this.initChartData()
        if(this.echart){
          this.echart.setOption(this.options)
        }else{
          this.echart = echarts.init(this.$refs.echart)
          this.echart.setOption(this.options)
        }
      },
      initChartData(){
        if(this.isAxisChart){
          this.axisOptions.xAxis.data = this.chartData.xData
          this.axisOptions.series = this.chartData.series
        }else{
          this.normalOption.series = this.chartData.series
        }
      }
    },
    data(){
      return{
        //折线图和柱形图
        axisOptions:{
          legend:{
            //图例文字颜色
            textStyle:{
              color:'#333'
            }
          },
          grid:{
            left:'20%'
          },
          //提示框
          tooltip:{
            trigger:'axis'
          },
          xAxis:{
            type:'category',//类目轴
            data:[],
            axisLine:{
              lineStyle:{
                color:'#17b3a3'
              }
            },
            axisLabel:{
              interval:0,
              color:'#333'
            }
          },
          yAxis:[
            {
              type:'value',
              axisLine:{
                lineStyle:{
                  color:'#17b3a3'
                }
              }
            }
          ],
          color:['#2ec7c9','#b6a2de'],
          series:[]
        },
        //饼图
        normalOption:{
          tooltip:{
            trigger:'item'
          },
          color:[
            '#0f78f4',
            '#dd536b',
            '#9462e5',
            '#a6a6a6',
            '#e1bb22',
            '#39c362',
            '#3ed1cf',
          ],
          series:[]
        },
        echart:null
      }
    },
    computed:{
      options(){
        return this.isAxisChart ? this.axisOptions : this.normalOption
      }
    }
  }
</script>