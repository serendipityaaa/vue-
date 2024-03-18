<template>
  <el-row>
    <el-col :span="8" style="padding-r: 10px">
      <div class="grid-content bg-purple"></div>
      <el-card class="box-card">
        <div class="user">
          <img src="../assets/images/userpic.png" />
          <div class="userinfo">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="logininfo">
          <p>上次登录的时间：<span>2021-7-22</span></p>
          <p>上次登录的地点：<span>武汉</span></p>
        </div>
      </el-card>
      <el-card style="margin-top: 20px; height: 460px">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column
            v-for="(val, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="val"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>

    <el-col :span="16" style="padding-left: 10px">
      <div class="num">
        <el-card
          v-for="item in countData"
          :key="item.name"
          :body-style="{ display: 'flex' }"
        >
          <i
            class="icon"
            :class="`el-icon-${item.icon}`"
            :style="{ background: item.color, padding: 0 }"
          ></i>
          <div class="detail">
            <p class="price">¥{{ item.value }}</p>
            <p class="text">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height: 280px; width: '100%'">
        <!--折线图-->
        <div ref="echarts1" style="height: 280px; width: '100%'"></div>
      </el-card>
      <div class="graph">
        <el-card style="height: 260px">
          <div ref="echarts2" style="height: 260px"></div>
        </el-card>
        <el-card style="height: 260px">
          <div ref="echarts3" style="height: 200%"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getData } from "../api";
import * as echarts from "echarts";
export default {
  data() {
    return {
      tableData: [],
      tableLabel: {
        name: "课程",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
      echarts1: null,
      echarts2: null,
      echarts3: null,
    };
  },
  mounted() {
    getData().then(({ data }) => {
      const { tableData, userData, videoData } = data.data;
      this.tableData = tableData;
      //折线图
      this.echarts1 = echarts.init(this.$refs.echarts1);
      this.resizeChart();
      window.addEventListener("resize", this.resizeChart);
      var echarts1Option = {};
      const { orderData } = data.data;
      const xAxis = Object.keys(orderData.data[0]);
      echarts1Option.xAxis = {
        data: xAxis,
      };
      echarts1Option.legend = {
        data: xAxis,
      };
      echarts1Option.yAxis = {};
      echarts1Option.series = [];
      xAxis.forEach((key) => {
        echarts1Option.series.push({
          name: key,
          data: orderData.data.map((item) => item[key]),
          type: "line",
        });
      });
      this.echarts1.setOption(echarts1Option);

      //柱状图
      this.echarts2 = echarts.init(this.$refs.echarts2);
      const echarts2Option = {
        legend: {
          // 图例文字颜色
          textStyle: {
            color: "#333",
          },
        },
        grid: {
          left: "20%",
        },
        // 提示框
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category", // 类目轴
          data: userData.map((item) => item.date),
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
          axisLabel: {
            interval: 0,
            color: "#333",
          },
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
          },
        ],
        color: ["#2ec7c9", "#b6a2de"],
        series: [
          {
            name: "新增用户",
            data: userData.map((item) => item.new),
            type: "bar",
          },
          {
            name: "活跃用户",
            data: userData.map((item) => item.active),
            type: "bar",
          },
        ],
      };
      this.echarts2.setOption(echarts2Option);

      //饼状图
      this.echarts3 = echarts.init(this.$refs.echarts3);
      const echarts3Option = {
        tooltip: {
          trigger: "item",
        },
        color: [
          "#0f78f4",
          "#dd536b",
          "#9462e5",
          "#a6a6a6",
          "#e1bb22",
          "#39c362",
          "#3ed1cf",
        ],
        series: [
          {
            data: videoData,
            type: "pie",
          },
        ],
      };
      this.echarts3.setOption(echarts3Option);
    });
  },
  methods: {
    resizeChart() {
      if (this.echarts1) {
        this.echarts1.resize();
      }
    },
  },
};
</script>

<style lang='less' scoped>
.user {
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  img {
    margin-right: 40px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
}
.userinfo {
  .name {
    font-size: 32px;
    margin-bottom: 10px;
  }
  .access {
    color: #999999;
  }
}
.logininfo {
  p {
    line-height: 28px;
    font-size: 14px;
    color: #666666;
    span {
      color: #666666;
      margin-left: 60px;
    }
  }
}
.icon {
  width: 80px;
  height: 80px;
  font-size: 30px;
  text-align: center;
  line-height: 80px;
}
.detail {
  margin-left: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.price {
  margin-bottom: 10px;
  font-size: 30px;
  line-height: 30px;
  height: 30px;
}
.txt {
  font-size: 14px;
  text-align: center;
  color: #999999;
}
.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .el-card {
    width: 32%;
    margin-bottom: 20px;
  }
}
.graph {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  .el-card {
    width: 48%;
  }
}
</style>