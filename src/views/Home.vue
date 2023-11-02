<template>
  <el-row>
    <el-col :span="8">
      <el-card>
        <div class="user">
          <img src="../assets/user.png" alt="" />
          <div class="userInfo">
            <p class="user-name">Admin</p>
            <p class="user-rights">超级管理员</p>
          </div>
        </div>
        <div class="loginInfo">
          <p>上次登录时间:<span>2023-03-01 12:05:18</span></p>
          <p>上次登录地点:<span>上海</span></p>
        </div>
      </el-card>
      <el-card style="height: 460px; margin-top: 20px">
        <el-table :data="tableData" style="width: 100%">
          <!-- <el-table-column prop="name" label="手机品牌"></el-table-column>
          <el-table-column prop="todayBuy" label="今日销量"></el-table-column>
          <el-table-column prop="monthBuy" label="当月销量"> </el-table-column>
          <el-table-column prop="totalBuy" label="全年销量"> </el-table-column> -->
          <el-table-column
            v-for="(val, key) in tableList"
            :prop="key"
            :label="val"
            :key="key"
          ></el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="padding-left: 10px">
      <div class="num">
        <el-card
          v-for="item in countData"
          :key="item.name"
          :body-style="{ display: 'flex', padding: 0 }"
        >
          <i
            class="icon"
            :class="`el-icon-${item.icon}`"
            :style="{ background: item.color }"
          ></i>
          <div class="detail">
            <p class="price">￥{{ item.value }}</p>
            <p class="name">{{ item.name }}</p>
          </div>
        </el-card>
      </div>

      <!-- 柱状图 -->
      <el-card style="height: 280px">
        <div ref="echarts1" style="height: 280px"></div>
      </el-card>
      <div class="graph">
        <el-card>
          <div ref="echarts2" style="height: 260px"></div>
        </el-card>
        <el-card>
          <div ref="echarts3" style="height: 240px"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getData } from "../api";
import * as echarts from "echarts";
export default {
  name: "Home",
  data() {
    return {
      tableData: [],
      tableList: {
        name: "手机品牌",
        todayBuy: "今日销量",
        monthBuy: "当月销量",
        totalBuy: "全年销量",
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
    };
  },

  mounted() {
    getData().then(({ data }) => {
      const { tableData } = data.data;
      this.tableData = tableData;

      const { orderData, userData, videoData } = data.data;
      // console.log(data.data);

      //折线图
      const myChart1 = echarts.init(this.$refs.echarts1);
      var option1 = {};
      const xAxis = Object.keys(orderData.data[0]);
      const legendData = {
        data: xAxis,
      };
      option1.legend = legendData;
      option1.xAxis = {
        data: orderData.date,
      };
      option1.yAxis = {};
      option1.series = [];
      xAxis.forEach((key) => {
        option1.series.push({
          name: key,
          data: orderData.data.map((item) => item[key]),
          type: "line",
        });
      });
      myChart1.setOption(option1);

      // 柱状图
      const myChart2 = echarts.init(this.$refs.echarts2);
      const option2 = {
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
            name: "新数据",
            data: userData.map((item) => item.new),
            type: "bar",
          },
          {
            name: "旧数据",
            data: userData.map((item) => item.active),
            type: "bar",
          },
        ],
      };
      myChart2.setOption(option2);

      //饼状图

      const myChart3 = echarts.init(this.$refs.echarts3);
      const option3 = {
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
            type: "pie",
            data: videoData,
          },
        ],
      };

      myChart3.setOption(option3);
    });
  },
};
</script>

<style lang="less" scoped>
.user {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;
  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-right: 40px;
  }
  .userInfo {
    .user-name {
      font-size: 32px;
      margin-bottom: 10px;
    }
    .user-rights {
      color: #999999;
    }
  }
}
.loginInfo {
  margin-top: 20px;
  p {
    font-size: 14px;
    color: #999999;
    line-height: 28px;

    span {
      margin-left: 40px;
      color: #000;
    }
  }
}
.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .icon {
    width: 80px;
    height: 80px;
    text-align: center;
    line-height: 80px;
    font-size: 30px;
    color: #fff;
  }
  .detail {
    display: flex;
    margin-left: 15px;
    flex-direction: column;
    justify-content: center;
    .price {
      font-size: 30px;
      margin-bottom: 10px;
      line-height: 30px;
      height: 30px;
    }
    .name {
      font-size: 14px;
      color: #999;
      text-align: center;
    }
  }
  .el-card {
    width: 32%;
    margin-bottom: 20px;
  }
}
.graph {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  .el-card {
    height: 260px;
    width: 48%;
  }
}
</style>