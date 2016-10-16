## Matrix 矩阵运算的几个集成函数

矩阵是一个很好玩儿的东西，最近在学习计算机图形学的课程，需要用到矩阵运算，所以编写几个函数来巩固一下。

### 简介


首先这个库提供的全局名称为Matrix，里面有关于矩阵的加、减、数乘、矩阵相乘、矩阵转置这五种运算函数，以及你可以使用这个库来产生全是0或者全是1的二维数组，可以生成对角矩阵。在这里，我需要提醒一下自己，我所设置的任意矩阵必须为二维数组以及必须是不为空的二维数组。比如`[[1,2]]`，这就代表1行两列的矩阵，以此类推。

### 方法介绍

#### eye( n )

生产n×n的对角矩阵，就像下面的例子：
```bash
//生成4×4的对角矩阵
var a = Matrix.eye( 4 );
console.log( a );

/*
[
	[1, 0, 0, 0],
	[0, 1, 0, 1],
	[0, 0, 1, 0],
	[0, 0, 0, 1]
]
*/
```

#### ones( m, n )

生成全为1的m×n的矩阵：
```bash
var a = Matrix.ones( 4, 5 );
console.log( a );

/*
[
	[1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1]
]
*/
```

#### zeros( m, n )

生成m×n的全0的矩阵
```bash
var a = Matrix.zeros( 4, 5 );
console.log( a );

/*
[
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0]
]
*/
```

#### add( M1, M2 )

返回两个矩阵之和的结果，注意，两个矩阵的行列都必须严格相等。
```bash
var M1 = Matrix.eye( 3 );
var M2 = Matrix.ones( 3, 3 );

var result = Matrix.add( M1, M2 );
console.log( result );

/*
[
	[2, 1, 1],
	[1,	2, 1],
	[1, 1, 2]
]
*/
```

#### sub( M1, M2 )

返回两个矩阵相减的结果，注意，两个矩阵的行列都必须严格相等。
```bash
var M1 = Matrix.eye( 3 );
var M2 = Matrix.ones( 3, 3 );

var result = Matrix.sub( M1, M2 );
console.log( result );

/*
[
	[0, -1, -1],
	[-1, 0, -1],
	[-1, -1, 0]
]
*/
```


#### multip( M1, number )

返回一个矩阵与某一个数的数乘结果。
```bash
var M1 = Matrix.ones( 3, 3 );

var result = Matrix.multip( M1, 3 );
console.log( result );

/*
[
	[3, 3, 3],
	[3, 3, 3],
	[3, 3, 3]
]
*/
```

#### dot( M1, M2 )

返回两个矩阵相乘的结果，注意第一个矩阵的列数一定要等于第二个矩阵的行数。
```bash
var M1 = [[1,2,3,4]];
var M2 = [[1], [2], [3], [4]];

var result = Matrix.dot( M1, M2 );
console.log( result );

/*
[
	[30]
]
*/
```


#### transpose( M1 )

返回M1矩阵的转置矩阵。
```bash
var M1 = [[1,2,3,4]];

var result = Matrix.transpose( M1 );
console.log( result );

/*
[
	[1], [2], [3], [4]
]
*/
