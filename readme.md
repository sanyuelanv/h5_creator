## 规范解析
```javascript
    "parserOptions": {
      "ecmaVersion": 7,  //ES7 语法
      "sourceType": "module" // ECMAScript 模块)
    },
    "env": { // 指定环境
      "es6": true,
      "browser": true,
      "node": true
    },
    "globals": { // 指定全局变量不可改写 false
      "document": false,
      "navigator": false,
      "window": false,
      "location": false
    },
    // 0/1/2 /always/never  —— 关闭/警告/错误 / 会检查属性名, 是默认值 / 不检查属性名
    "rules": { 
      "accessor-pairs": 2,  //object getter/setter方法需要成对出现
      "arrow-spacing": [ 2,{"before": true,"after": true}],// => 的前/后括号各有一个空格
      "block-spacing": [2,"always"],////块语句中不能使用var
      //大括号风格:http://eslint.cn/docs/rules/brace-style  Stroustrup 风格： if-else来说的话就是else 必须重起一行  &允许 {} 在同一行
      "brace-style": [ 2,"stroustrup",  {"allowSingleLine": true}],
      "camelcase": [ 2,{"properties": "never"}],// 强制驼峰法命名
      "comma-dangle": [ 2,"never"],//对象字面量项尾不能有逗号
      "comma-spacing": [2,{"before": false,"after": true}], //逗号前面不能有空格，后面可以有
      "comma-style": [2,"last"],//逗号风格，换行时在行首还是行尾
      "constructor-super": 2,//规定子类构造函数中必须调用super，非子类不要调用super。
      "curly": [2,"multi-line"], // if 语句多行的时候不能省略大括号
      "dot-location": [2,"property"], // 规定点号操作符须与属性需在同一行 ，“property”表示点与属性同一行
      "eol-last": 2, // 规定文件末尾空一行，以防文件解析错误。
      "eqeqeq": [2,"allow-null"], // 规定始终使用 === 替代 ==
      "generator-star-spacing": [2,{"before": true,"after": true}], // 规定生成器函数*的前后都要留空格。
      "handle-callback-err": [2,"^(err|error)$"],// 规定函数里面的异常信息不要忘记处理。第二个参数配置匹配那些参数的正则表达式：if (err) throw err
      "indent": [2,2,{"SwitchCase": 2}], // 规定使用几个空格进行缩进。第二个参数表示空格的个数，默认是2个
      "key-spacing": [2,{"beforeColon": false,"afterColon": true}], // 规定键值对中冒号与值之间要留空白 var obj = { 'key': 'value' }
      "keyword-spacing": [2,{"before": true,"after": true}], // 像function 和 if等关键词前后要有空格
      // 构造函数要以大写字母开头 "newIsCap"配置只要是new关键字初始化的函数，首字母必须大写；“capIsNew”配置是否允许大写字母开头的函数不使用new关键字初始化
      "new-cap": [2,{"newIsCap": true,"capIsNew": false}], 
      "new-parens": 2,//规定无参的构造函数调用时要带上括号
      //规定使用数组字面量而不是构造器(由于参数的二义性) ：var nums = new Array(1, 2, 3) 错误 || var nums = [1, 2, 3] 正确
      "no-array-constructor": 2,
      //规定避免使用 arguments.callee 和 arguments.caller（不利于代码优化，且高级版本的ES标准会废弃它）
      "no-caller": 2,
      "no-class-assign": 2,// 规定避免对类名重新赋值
      "no-cond-assign": 2,//规定条件语句中赋值语句使用括号包起来 while (m = text.match(expr)) {} 错误
      "no-const-assign": 2, //规定避免修改使用 const 声明的变量
      "no-control-regex": 2, //规定禁止在正则表达式中使用控制字符
      "no-debugger": 2, // 规定不要使用 debugger。
      "no-delete-var": 2, // 规定不要对变量使用 delete 操作
      "no-dupe-args": 2,//规定不要定义重复的函数参数
      "no-dupe-class-members": 2, // 规定类中不要定义重复的属性
      "no-dupe-keys": 2, // 规定对象字面量中不要定义重复的属性
      "no-duplicate-case": 2, // 规定switch 语句中不要定义重复的 case 分支
      "no-empty-character-class": 2, // 规定正则中不要使用空字符
      "no-empty-pattern": 2,//规定不要解构空值
      "no-eval": 2, // 规定不要使用 eval()。
      "no-ex-assign": 2,//定义catch 中不要对错误重新赋值 
      "no-extend-native": 2, //规定不要扩展原生对象。
      "no-extra-bind": 2, // 规定避免多余的函数上下文绑定
      "no-extra-boolean-cast": 2,  // 规定避免不必要的布尔转换
      "no-extra-parens": [2,"functions"],  // 规定不要使用多余的括号包裹函数。第二个参数取值“all”或“functions”，表控制范围
      "no-fallthrough": 2, // 规定switch一定要使用 break 来将条件分支正常中断
      "no-floating-decimal": 2, // 规定不要省去小数点前面的0（增强可读性
      "no-func-assign": 2, // 规定避免对声明过的函数重新赋值
      "no-implied-eval": 2, // 规定避免使用隐式的 eval()
      "no-inner-declarations": [2,"functions"],//规定嵌套的代码块中禁止再定义函数。第二个参数配置控制范围，取值“both”（functions+var）、“functions”
      "no-invalid-regexp": 2, // 规定不要向 RegExp 构造器传入非法的正则表达式
      "no-irregular-whitespace": 2,//规定不要使用非法的空白符
      "no-iterator": 2,//规定禁止使用 iterator
      "no-label-var": 2,//禁止使用同一作用域下的同名的变量做为label，来创建更清晰的代码
      "no-labels": [2,{"allowLoop": false,"allowSwitch": false}],//规定不要使用label语句
      "no-lone-blocks": 2, // 规定不要书写不必要的嵌套代码块
      "no-mixed-spaces-and-tabs": 2,  // 规定不能混合使用空格与制表符作为缩进
      "no-multi-spaces": 2, // 规定除了缩进，不要使用多个空格
      "no-multi-str": 2, // 规定不要使用多行字符串
      "no-multiple-empty-lines": [2,{"max": 1}],//定不允许有连续多行空行且文件头部不允许空行。
      "no-native-reassign": ["error", {"exceptions": ["Object"]}], // 不能为全局变量赋值
      "no-unsafe-negation": 2,  // 避免把 -(a + b）写成 -a + b 。这类有歧义的写法一定要加括号
      "no-new-object": 2,//规定禁止使用 Object 构造器
      "no-new-require": 2, //规定禁止使用 new require
      "no-new-symbol": 2, // 规定禁止使用 Symbol 构造器
      "no-new-wrappers": 2, // 规定禁止使用原始包装器 const message = new String('hello') 错误
      "no-obj-calls": 2, // 规定不要将全局对象的属性作为函数调用
      "no-octal": 2, // 规定不要使用八进制字面量
      "no-octal-escape": 2, // 规定字符串字面量中也不要使用八进制转义字符
      "no-path-concat": 2,// Node.js的 不能直接使用__dirname + 路径，需要使用path.join
      "no-proto": 2,  //规定使用 getPrototypeOf 来替代 __proto__
      "no-redeclare": 2, // 规定不要重复声明变量
      "no-regex-spaces": 2, // 规定正则中避免使用多个空格
      "no-return-assign": [2,"except-parens"], //规定return 语句中的赋值必需有括号包裹
      "no-self-assign": 2, // 规定避免将变量赋值给自己。
      "no-self-compare": 2, // 规定避免将变量与自己进行比较操作
      "no-sequences": 2, // 规定避免使用逗号操作符
      "no-shadow-restricted-names": 2, //规定禁止随意更改关键字的值。
      "func-call-spacing": 2,// 禁止在调用函数的时候函数名和括号出现空格
      "no-sparse-arrays": 2, //规定禁止使用稀疏数组 错误：let fruits = ['apple',, 'orange'] 
      "no-this-before-super": 2,//在调用 super() 之前使用 this 或 super，它将会引发一个引用错误
      "no-throw-literal": 2, //规定用throw 抛错时，抛出 Error 对象而不是字符串
      "no-trailing-spaces": 2,//规定行末不留空格。
      "no-undef": 2,  //定位由变量漏写、参数名漏写和意外的隐式全局变量声明所导致的潜在引用错误（比如，在 for 循环语句中初始化变量忘写 var 关键字）
      "no-undef-init": 2,// 规定不要使用 undefined 来初始化变量
      "no-unexpected-multiline": 2,  // 规定不要使用 (, [, or ` 等作为一行的开始。在没有分号的情况下代码压缩后会导致报错，而坚持这一规范则可避免出错。代码示例如
      "no-unmodified-loop-condition": 2,  // 规定循环语句中注意更新循环变量
      // 规定如果有更好的实现，尽量不要使用三元表达式。let score = val ? val : 0  可以写成let score = val || 0 
      "no-unneeded-ternary": [2,{"defaultAssignment": false}], 
      "no-unreachable": 2,//规定return，throw，continue 和 break 后不要再跟代码
      "no-unsafe-finally": 2, //规定finally 代码块中不要再改变程序执行流程
      "no-unused-vars": [2,{"vars": "all","args": "none"}], //规定不要定义未使用的变量
      "no-useless-call": 2, //规定避免不必要的 .call() 和 .apply()
      "no-useless-computed-key": 2,//规定避免使用不必要的计算值作对象属性
      "no-useless-constructor": 2, //规定禁止多余的构造器(ES2015会自动生成一个简单构造器)
      "no-useless-escape": 2, //规定禁止不必要的转义
      "no-whitespace-before-property": 2, // 规定属性前面不能加空格。
      "no-with": 2, //规定禁止使用 with
      "one-var": [2,{"initialized": "never"}], //规定每个 var 关键字单独声明一个变量
      //规定对于三元运算符 ? 和 : 与他们所负责的代码处于同一行。第二个参数配置换行符位置，可配“after”、“before”、“none”,分别表示操作符之后可换行，操作符之前可换行，前后都不允许换行。第三个参数配置覆盖第二个参数的配置内容
      "operator-linebreak": [2,"after",{"overrides": {"?": "before",":": "before"}}],
      //规则定义代码中不要啊出现多余留白。
      "padded-blocks": [2,"never"],
      //规定除需要转义的情况外，字符串统一使用单引号。
      "quotes": [2,"single",{"avoidEscape": true,"allowTemplateLiterals": true}],
      //规定必须添加分号
      "semi": [2,"never"],
      //规定分号前不留空格，后面留一个空格
      "semi-spacing": [2,{"before": false,"after": true}],
      //规定代码块收尾需留空格。第二个参数配置是否需要空格
      "space-before-blocks": [2,"always"],
      //规定函数声明时括号与函数名间加空格
      "space-before-function-paren": [2,"always"],
      //规定圆括号间不留空格
      "space-in-parens": [2,"never"],
      //规定字符串拼接操作符 (Infix operators) 之间要留空格
      "space-infix-ops": 2,
      //规定文字格式的一元运算符后跟一个空格
      "space-unary-ops": [2,{"words": true,"nonwords": false}],
      //要求或禁止注释 // 或 /* 后的空白。
      "spaced-comment": [2,"always",{"markers": ["global","globals","eslint","eslint-disable","*package","!",","]}],
      //规定模板字符串中变量前后不加空格
      "template-curly-spacing": [2,"never"],
      //规定检查 NaN 的正确姿势是使用 isNaN()。
      "use-isnan": 2,
      //规定用合法的字符串跟 typeof 进行比较操作。
      "valid-typeof": 2,
      //规定自调用匿名函数 (IIFEs) 使用括号包裹
      "wrap-iife": [2,"any"],
      //规定yield * 中的 * 前后都要有空格。
      "yield-star-spacing": [2,"both"],
      //禁止在条件判断中字面量在先而变量在第二的位置  if ("red" === color) {}它被叫做 Yoda 条件是因为它这样读：”红色是颜色”，类似于星球大战中 Yoda 的讲话方式
      "yoda": [2,"never"],
      //阻止 var 的使用
      "no-var": 2,
      //如果一个变量不会被重新赋值，最好使用const进行声明。
      "prefer-const": 2,
      //禁止以对象元素开始或结尾的对象的花括号中有空格
      "object-curly-spacing": [2,"always",{"objectsInObjects": false}],
      // 禁止在数组括号内出现空格
      "array-bracket-spacing": [2,"never"]
    }
```
