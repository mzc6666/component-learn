/**
 * @description: 判断是否为闰年
 * @param {number} year 年份
 * @return {boolean}
 * @author: mzc
 */
export const isLeapYear = (year: number) => {
  if (year % 100) {
    return year % 4 == 0;
  } else {
    return year % 400 == 0;
  }
};

/**
 * @description: 获取指定年份和月份的天数
 * @param {number} year 年份
 * @param {number} month 月份
 * @return {number}
 * @author: mzc
 */
export const getDaysOfMonth = (year: number, month: number) => {
  if ([0, 2, 4, 6, 7, 9, 11].includes(month)) {
    return 31;
  } else if ([3, 5, 8, 10].includes(month)) {
    return 30;
  } else {
    return 28 + Number(isLeapYear(year));
  }
};
