//general constant
export let DT = 1
export const G = 200

export function setDT(newDT) {
    let prevDT = DT
    DT = newDT
    return prevDT
}


//select nums
export const SelectNums = {controlSelect:0,propertySelect:1,attractionSelect:2,moveSelect:3,vectorSelect:4,copySelect:5,drawCircleSelect:6,drawWallSelect:7,drawContraintsSelect:8, chronoSelect:9,trashSelect:10}


//color
const backGroundColor = "rgba(116, 179, 206, 0.4)"
const selectedColor = "rgb(255,255,255)"

const circleColor = "23,42,58"
const trajectoryColor = "41, 110, 180"
const staticColor = "rgb(220, 73, 58)"

const contraintColor = "rgb(12, 24, 33)"

export const Colors = {bgColor:backGroundColor,circleColor:circleColor,trajecColor:trajectoryColor, staticColor:staticColor,selectedColor:selectedColor,
                        contraintColor:contraintColor} 


//ball constant
const ballColFric = 0.90
const ballLenTrajec = 100
const ballDefaultGravity = 0.05
const ballDefaultFriction = 0.0009

export const ballConstant = {collisionFriction:ballColFric,lengthTrajectory:ballLenTrajec,defaultGravity:ballDefaultGravity,defaultFriction:ballDefaultFriction}


//contraints constant
const contraintStiffness = 2
const contraintMaxStiff = 50
const contraintDashed = [10,10]

export const contraintConstant = {stiffness:contraintStiffness,maxStiff:contraintMaxStiff, dashed:contraintDashed}

//utils constant
const copySize = {0:1,1:5,2:100}
export const utilsConstant = {copySize:copySize}


const particleColor = "rgb(255,255,255)"
const particleSize = 4
const particleDampening = 0.05
const particleLifetime = 60

export const particleConstant = {color:particleColor,size:particleSize,dampening:particleDampening,lifetime:particleLifetime}