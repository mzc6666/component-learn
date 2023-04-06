<!--
 * @Description: 
 * @Version: 
 * @Autor: mzc
 * @Date: 2023-04-04 22:15:06
 * @LastEditors: mzc
 * @LastEditTime: 2023-04-05 00:04:45
-->
<script setup lang="ts">
import { ref, computed, reactive, watch, watchEffect } from "vue";
import { getDaysOfMonth } from "../../utils/base";

const now = new Date();
const curYear = ref(now.getFullYear());
const curMonth = ref(now.getMonth());
const curDay = ref(now.getDate());

const daysTextArr = reactive(["一", "二", "三", "四", "五", "六", "日"]);

const curStr = computed(() => {
  return `${curYear.value}-${curMonth.value}-${curDay.value}`;
});

const year = ref(curYear.value);
const month = ref(curMonth.value);
const day = ref(curDay.value);

const daysArr = computed(() => {
  const days = new Array(getDaysOfMonth(year.value, month.value))
    .fill(null)
    .map((_, index) => index + 1);
  let lastMonthDays = getDaysOfMonth(
    month.value == 0 ? year.value - 1 : year.value,
    (12 + month.value - 1) % 12
  );
  const firstDay = new Date(year.value, month.value, 1).getDay();
  for (let i = 0; i < firstDay - 1; i++) {
    days.unshift(lastMonthDays--);
  }
  for (let i = 1; days.length !== 7 * 6; i++) {
    days.push(i);
  }
  return days;
});

const switchToLastMonth = () => {
  if (month.value == 0) {
    year.value -= 1;
  }
  month.value = (12 + month.value - 1) % 12;
};

const switchToNextMonth = () => {
  if (month.value == 11) {
    year.value += 1;
  }
  month.value = (month.value + 1) % 12;
};

const switchToNextYear = () => {
  year.value += 1;
};

const switchToLastYear = () => {
  year.value -= 1;
};
</script>
<template>
  <div class="container">
    <p>{{ curStr }}</p>
    <div class="pane">
      <header>
        <div class="left-arrows">
          <span @click="switchToLastYear">年</span>
          <span @click="switchToLastMonth">月</span>
        </div>
        <span>{{ `${year}年${month + 1}月` }}</span>
        <div class="right-arrows">
          <span @click="switchToNextMonth">月</span>
          <span @click="switchToNextYear">年</span>
        </div>
      </header>
      <div class="days-text">
        <div v-for="item in daysTextArr" :key="item">{{ item }}</div>
      </div>
      <div class="grids">
        <div v-for="(_, index) in 6" :key="index" class="week-item">
          <div
            v-for="item in daysArr.slice(index * 7, (index + 1) * 7)"
            :key="item"
            class="grid-item"
            :class="{
              active: curMonth == month && curYear == year && day == item,
            }"
          >
            {{ item }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.container {
  position: relative;
}
.container .pane {
  position: absolute;
  min-width: 400px;
}
.container .pane header {
  display: flex;
  justify-content: space-between;
}
.left-arrows span:nth-child(2),
.right-arrows span:nth-child(2) {
  margin-left: 1em;
}
.left-arrows span,
.right-arrows span {
  cursor: pointer;
}

.days-text {
  display: flex;
  border-bottom: 1px solid #e4e4e4;
}
.days-text div {
  flex: 1;
  text-align: center;
  padding: 0.5em 0;
}

.grids {
}
.grids .week-item {
  display: flex;
}
.grids .week-item .grid-item {
  flex: 1;
  text-align: center;
  padding: 0.5em 0;
  cursor: pointer;
}
.grids .week-item .grid-item.active {
  color: green;
}
</style>
