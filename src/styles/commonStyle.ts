import { Dimensions } from "react-native";
import { moderateScale } from "./scaling";

const height=Dimensions.get('screen').height-moderateScale(30);
const width=Dimensions.get('screen').width;

export{height,width};