下面是一项图片判断任务的详细教程，旨在帮助新手理解如何使用 `jsPsych` 软件进行实验设计。

---

# jsPsych 实验设计教程

## 简介

`jsPsych` 是一个用于创建心理学实验的 JavaScript 库，它允许用户创建各种实验任务，记录数据并分析结果。本文将详细解释如何使用 `jsPsych` 进行实验设计，包括初始化、任务设置和数据处理。

## 1. 初始化 `jsPsych`

```javascript
var jsPsych = initJsPsych({
    override_safe_mode: true,
    on_finish: function() {
        jsPsych.data.get().localSave('csv', 'gamble.csv'); // 下载数据到本地
        document.getElementById('jspsych-content').innerHTML += '实验结束，感谢您的参与！';
    }
});
```

- **`initJsPsych`**: 初始化 `jsPsych` 实验。传入的对象包含一些配置选项。
  - **`override_safe_mode`**: 设置为 `true` 以覆盖默认的安全模式，允许在实验运行时使用某些功能。
  - **`on_finish`**: 实验结束时执行的函数。在此函数中，实验数据将被保存为 `CSV` 文件，并在实验内容区域显示“实验结束，感谢您的参与！”的消息。

## 2. 创建时间轴 (Timeline)

```javascript
var timeline = [];
var gains = [];
```

- **`timeline`**: 一个数组，用于存储实验中的所有任务（例如：问卷、试验等）。
- **`gains`**: 一个数组，用于存储与实验相关的得分数据。

## 3. 预加载图片

```javascript
var preload = {
    type: jsPsychPreload,
    auto_preload: true
};
timeline.push(preload);
```

- **`jsPsychPreload`**: 任务类型，用于预加载所有图片文件，以避免实验运行时的加载延迟。
- **`auto_preload`**: 自动预加载实验中使用的所有资源。

## 4. 创建移动滑块评分任务

```javascript
var ask = {
    type: jsPsychHtmlSliderResponse,
    button_label: '继续',
    labels: ['非常不开心', '非常开心'],
    stimulus: `<div style="width:500px;">
        <p>此刻你有多高兴?<br/><br/></p>`,
};
```

- **`jsPsychHtmlSliderResponse`**: 任务类型，使用 HTML 滑块进行响应。
- **`button_label`**: 按钮的标签文本。
- **`labels`**: 滑块两端的标签。
- **`stimulus`**: 显示在屏幕上的内容，询问被试当前的心情。

## 5. 创建固定点任务

```javascript
var fixation = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<div style="font-size:60px;">+</div>',
    choices: "NO_KEYS",
    trial_duration: 500,
    post_trial_gap: 0,
    response_ends_trial: false,
    data: {
        plugin_name: "fixation"
    }
};
```

- **`jsPsychHtmlKeyboardResponse`**: 任务类型，用于显示固定点（+）并等待指定时间。
- **`stimulus`**: 显示的内容。
- **`trial_duration`**: 试验持续时间（毫秒）。
- **`response_ends_trial`**: 设置为 `false`，意味着响应不会结束试验。

## 6. 计算总得分的函数

```javascript
var getTotal = function () {
    if (gains.length > 0) {
        return gains.reduce(function(prev, curr) {
            return Number(prev) + Number(curr);
        });
    } else {
        return 0;
    }
};
```

- **`getTotal`**: 计算 `gains` 数组中所有值的总和。使用 `reduce` 方法遍历数组并累加值。

## 7. 随机选择反馈

```javascript
var randomm = function() {
    var m = Math.random();
    if (m <= 0.5) {
        score = jsPsych.timelineVariable('gain');
        return '<p>恭喜您获得了' + score + '分</p>';
    } else {
        score = -jsPsych.timelineVariable('loss');
        return '<p>很遗憾您失去了' + Math.abs(score) + '分</p>';
    }
};
```

- **`randomm`**: 根据随机数决定反馈类型。随机选择是否获得或失去分数，并返回相应的反馈消息。

## 8. 创建选择任务

```javascript
var choose = {
    type: jsPsychCategorizeImage,
    stimulus: jsPsych.timelineVariable('pic'),
    prompt: function () {
        return `<p>如果选择<span style="color:#FF0000">不赌</span>，请按<span style="color:#FF0000">f</span>键；如果选择<span style="color:#FF0000">赌</span>，请按<span style="color:#FF0000">j</span>键。</p>`;
    }
};
```

- **`jsPsychCategorizeImage`**: 任务类型，显示图片并让被试做出分类选择。
- **`stimulus`**: 图片的 URL，从 `timeline` 变量中获取。
- **`prompt`**: 显示的提示信息，指导被试如何做出选择。

## 总结

本文详细解释了如何使用 `jsPsych` 创建一个简单的实验，包括初始化、任务设置、数据处理和反馈生成。通过这些步骤，你可以创建一个完整的心理学实验，并在实验结束时收集和保存数据。如果你有其他问题或需要进一步的帮助，请随时提问！

---

这个教程提供了对代码的详细解释，使你能够理解每个部分的作用，并帮助你使用 `jsPsych` 创建和管理实验。希望对你有所帮助！



# `jsPsych` 实验程序的 Flexbox 响应式设计教程

## 简介

为了确保 `jsPsych` 实验程序在各种屏幕尺寸上都能正确显示，我们使用了 Flexbox 布局和响应式设计技术。本文将详细解释如何通过 CSS 创建一个响应式的实验界面。

## 1. 基本 CSS 重置

```
css复制代码/* 基本 CSS 重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

- `*`

  : 选择所有元素，进行基本的样式重置。

  - **`margin: 0;`**: 去除元素的外边距。
  - **`padding: 0;`**: 去除元素的内边距。
  - **`box-sizing: border-box;`**: 确保元素的宽度和高度包括边框和内边距，使布局更加一致。

## 2. Flex 容器用于整体布局

```
css复制代码/* Flex 容器用于整体布局 */
body {
  display: flex;
  justify-content: center; /* 水平居中对齐内容 */
  align-items: center; /* 垂直居中对齐内容 */
  height: 100vh; /* 全屏视口高度 */
  background-color: #f0f0f0; /* 浅色背景颜色 */
}
```

- `body`

  : 设置整个页面的布局为 Flexbox。

  - **`display: flex;`**: 将 `body` 变为 Flex 容器。
  - **`justify-content: center;`**: 水平居中对齐容器内的内容。
  - **`align-items: center;`**: 垂直居中对齐容器内的内容。
  - **`height: 100vh;`**: 设置 `body` 高度为视口高度的 100%，使其填满整个屏幕。
  - **`background-color: #f0f0f0;`**: 设置背景颜色为浅灰色。

## 3. 主内容容器

```
css复制代码/* 主内容容器 */
#main-container {
  display: flex;
  flex-direction: column; /* 垂直排列项目 */
  align-items: center; /* 水平居中对齐项目 */
  padding: 20px;
  max-width: 800px; /* 最大宽度限制 */
  width: 90%; /* 响应式宽度 */
  background-color: #ffffff; /* 内容区白色背景 */
  border-radius: 10px; /* 圆角 */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* 柔和阴影 */
}
```

- `#main-container`

  : 用于包裹实验的主要内容。

  - **`display: flex;`**: 设置 `#main-container` 为 Flex 容器。
  - **`flex-direction: column;`**: 垂直排列容器内的项目。
  - **`align-items: center;`**: 水平居中对齐项目。
  - **`padding: 20px;`**: 内边距为 20 像素。
  - **`max-width: 800px;`**: 最大宽度为 800 像素，确保容器不会变得过宽。
  - **`width: 90%;`**: 容器宽度为视口宽度的 90%，使其在不同屏幕宽度上具有响应性。
  - **`background-color: #ffffff;`**: 背景颜色为白色。
  - **`border-radius: 10px;`**: 圆角半径为 10 像素，使容器边角圆润。
  - **`box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);`**: 添加柔和的阴影，增加视觉深度感。

## 4. 头部/标题样式

```
css复制代码/* 头部/标题样式 */
header {
  text-align: center;
  margin-bottom: 20px;
}
```

- `header`

  : 用于设置页面头部或标题的样式。

  - **`text-align: center;`**: 使标题文本居中对齐。
  - **`margin-bottom: 20px;`**: 在标题下方添加 20 像素的外边距，以分隔标题和下面的内容。

## 5. 段落样式

```
css复制代码/* 段落样式 */
p {
  margin-bottom: 10px;
}
```

- `p`

  : 设置段落元素的样式。

  - **`margin-bottom: 10px;`**: 为段落下方添加 10 像素的外边距，以增加段落之间的间距。

## 6. Flex 容器用于按钮和响应区域

```
css复制代码/* Flex 容器用于按钮和响应区域 */
#buttons-container {
  display: flex;
  justify-content: space-around; /* 均匀分布项目 */
  width: 100%;
  margin-top: 20px;
}
```

- `#buttons-container`

  : 用于包裹按钮或其他响应区域的容器。

  - **`display: flex;`**: 设置为 Flex 容器。
  - **`justify-content: space-around;`**: 均匀分布容器内的按钮或项目，并在项目之间留出空隙。
  - **`width: 100%;`**: 容器宽度为其父容器的 100%。
  - **`margin-top: 20px;`**: 在容器顶部添加 20 像素的外边距，以分隔上方的内容。

## 7. 单个按钮样式

```
css复制代码/* 单个按钮样式 */
.button {
  padding: 10px 20px;
  background-color: #007bff; /* 蓝色按钮颜色 */
  color: white;
  text-align: center;
  border-radius: 5px;
  cursor: pointer;
}
```

- `.button`

  : 设置按钮的样式。

  - **`padding: 10px 20px;`**: 内边距为 10 像素（上下）和 20 像素（左右）。
  - **`background-color: #007bff;`**: 按钮背景颜色为蓝色。
  - **`color: white;`**: 按钮文本颜色为白色。
  - **`text-align: center;`**: 文本居中对齐。
  - **`border-radius: 5px;`**: 圆角半径为 5 像素，使按钮边角圆润。
  - **`cursor: pointer;`**: 鼠标悬停时显示为手型指针，表示可以点击。

## 8. 响应式调整

```
css复制代码/* 响应式调整 */
@media (max-width: 600px) {
  #main-container {
    padding: 10px;
  }
}
```

- `@media (max-width: 600px)`

  : 媒体查询，用于在屏幕宽度小于等于 600 像素时应用样式。

  - `#main-container`

    : 在小屏幕设备上调整 

    ```
    #main-container
    ```

     的内边距。

    - **`padding: 10px;`**: 内边距缩小为 10 像素，以适应较小的屏幕。

## 总结

本文详细讲解了如何使用 CSS Flexbox 和响应式设计技术创建一个 `jsPsych` 实验程序的用户界面。通过以上的样式设置，你可以确保实验界面在不同设备和屏幕尺寸上都能正确显示和适配。