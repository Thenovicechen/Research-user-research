
var jsPsych=initJsPsych(
{
override_safe_mode: true,
on_finish: function() {
jsPsych.data.get().localSave('csv', `gamble.csv`) // download from browser
jsPsych.data.get
document.getElementById('jspsych-content').innerHTML += '实验结束，感谢您的参与！'
}
});

// 初始化timeline
var timeline=[];
var gains=[];

//提前加载图片，避免加载延迟
var preload = {
  type: jsPsychPreload,
  auto_preload: true
  };
  timeline.push(preload)

//一个移动滑块的评分
var ask={
    type:jsPsychHtmlSliderResponse,
    button_label:'继续',
    labels:['非常不开心','非常开心'],
    stimulus:`<div style="width:500px;">
        <p>此刻你有多高兴?<br/><br/></p>`,
    }

//每500ms的凝视点
var fixation ={
      type: jsPsychHtmlKeyboardResponse,
      stimulus: '<div style="font-size:60px;">+</div>',
      choices:"NO_KEYS",
      trial_duration: 500,
      post_trial_gap: 0,
      response_ends_trial: false,
      data: {
    plugin_name: "fixation"
    }
    };

var getTotal = function () {
    // var sum = 0;
    // for (let i = 1; i < gains.length; i++) {
    //   sum += gains[i-1];
    // }
    // return sum;

    // 第一种
    if (gains.length>0){
    return gains.reduce(function(prev, curr, idx, arr){
      return Number(prev) + Number(curr);
    });
    }else{
    return 0
    }

    // 第二种
    // return eval(gains.join("+")) || 0;
    };

let score = 0; 
// 根据每一次被试的选择赌后随机给出对应的反馈。
// 反馈为对应失去（共获得）对应的图片中的数值
var randomm=function(){
var m=Math.random()
    if (m<=0.5){
    score = jsPsych.timelineVariable('gain')
    console.log('gain:', score)
    return '<p>恭喜您获得了'+score+'分</p>'
    }
    else{
    score = - jsPsych.timelineVariable('loss')
    console.log('loss:', score)
    return '<p>很遗憾您失去了'+ Math.abs(score)+'分</p>'
    }
    }

var choose={
    type:jsPsychCategorizeImage,
    stimulus:jsPsych.timelineVariable('pic'),
    prompt: function () {
    return `<p>如果选择<span style="color:#FF0000">不赌</span>，请按<span style="color:#FF0000">f</span>键；如果选择<span style="color:#FF0000">赌</span>，请按<span style="color:#FF0000">j</span>键</p><p>您目前共有${getTotal()}分</p>`;
    }, choices:['f','j'],
    //不赌的按键。如果不是f则为赌博
    key_answer:'f',
    correct_text:'<p>您当前获得0分</p>',
    //反馈文字来自定义好的random function
    incorrect_text:randomm,
    // 刺激的持续时间不限，直到被试做出反应才停止
    stimulus_duration:null,
    // 反馈持续时间为1000ms
    feedback_duration:1000,
    on_finish: function (data) {
    console.log("on_finish", data, jsPsych.pluginAPI.compareKeys(data.response, "f"));
    // 提前设置好“正确按键”,如果不赌就反馈固定数值，赌则随机返回
    if (jsPsych.pluginAPI.compareKeys(data.response, "f")) {
      data.correct = true;
    } else {
      data.correct = false;
      gains.push(score)
    }
    },
    };


var running1={
  timeline:[fixation,choose], 
  timeline_variables:[
  {pic:'pic/1.png',gain:'40',loss:'8'},
  {pic:'pic/2.png',gain:'40',loss:'13.6'},
  {pic:'pic/3.png',gain:'40',loss:'20'},
  {pic:'pic/4.png',gain:'40',loss:'25.6'},
  {pic:'pic/5.png',gain:'40',loss:'30.8'},
  {pic:'pic/6.png',gain:'40',loss:'35.6'},
  {pic:'pic/7.png',gain:'40',loss:'40'},
  {pic:'pic/8.png',gain:'40',loss:'44'},
  {pic:'pic/9.png',gain:'40',loss:'54'},
  {pic:'pic/10.png',gain:'40',loss:'80'},
  ],
  sample:{type:'without-replacement',
  size:3,} ,
  randomize_order:true,
  }

var pro1={
    timeline:[ask,running1],
    repetitions:1
    }


var running2={
    timeline:[fixation,choose], 
    //图片材料
    timeline_variables:[
    {pic:'pic/1.png',gain:'40',loss:'8'},
    {pic:'pic/2.png',gain:'40',loss:'13.6'},
    {pic:'pic/3.png',gain:'40',loss:'20'},
    {pic:'pic/4.png',gain:'40',loss:'25.6'},
    {pic:'pic/5.png',gain:'40',loss:'30.8'},
    {pic:'pic/6.png',gain:'40',loss:'35.6'},
    {pic:'pic/7.png',gain:'40',loss:'40'},
    {pic:'pic/8.png',gain:'40',loss:'44'},
    {pic:'pic/9.png',gain:'40',loss:'54'},
    {pic:'pic/10.png',gain:'40',loss:'80'},
    ],
    //无抽取的放回，抽3个
    sample:{type:'without-replacement', 
    size:5,} ,
    randomize_order:true,
    }

var pro2={
    timeline:[ask,running2],
    // 这项任务将被执行两次
    repetitions:2
    }

var allmixed={
    timeline:[pro1,pro2,ask]
    }
    timeline.push(allmixed)

//运行timeline流程
jsPsych.run(timeline)
