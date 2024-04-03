import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

//아이패드
const guidelineBaseWidth = 1194;
const guidelineBaseHeight = 834;

// 뷰포트 width 기반
const widthScale = (size: number) => width / guidelineBaseWidth * size;

// 높이 height기반
const heightScale = (size: number) => height / guidelineBaseHeight * size;

// factor값 제어
const moderateScale = (size: number, factor: number = 0.5) => size + (widthScale(size) - size) * factor;

export { widthScale, heightScale, moderateScale };