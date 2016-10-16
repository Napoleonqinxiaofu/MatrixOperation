//矩阵运算的函数
;(function(global){

	global.Matrix = {
		//生成对角矩阵，非零元素都为1
		eye : function( n ){
			var result = [];
			var arr;
			for ( var i = 0; i < n; i++ ) {
				arr = []
				for ( var j = 0; j < n; j++ ) {
					if (i === j )
						arr[j] = 1;
					else
						arr[j] = 0;
				}
				result.push( arr );
			}
			return result;
		},
		//生成全零的矩阵,height:行，width:列
		zeros : function( height, width ) {
			return this._produceSameNumber( height, width, 0 );
		},
		ones : function( height, width ) {
			return this._produceSameNumber( height, width, 1 );
		},

		//生成数字全部一样的矩阵，比如说0或者1
		_produceSameNumber : function( height, width, number ) {
			var result = [];
			var arr;
			for ( var i = 0; i < height; i++ ) {
				arr = (new Array( width )).join( ',' ).split( ',' ).map( function(){
					return number;
				});
				result.push( arr );
			}
			return result;
		},

		//定义矩阵相加或是相减
		_addOrSub : function( arr1, arr2, operater ) {
			var shape1 = this.shape(arr1);
			var shape2 = this.shape( arr2);
			var result = [], arr;
			if ( !_isSameShape( shape1, shape2 ) ) {
				throw new Error( '两个数组的维度不同，不能相加')
			}else{
				for ( var i = 0; i < shape1[0]; i++ ) {
					arr = [];
					for ( var j = 0; j < shape1[1]; j++ ) {
						if ( operater )
							arr[j] = _getItem(arr1, i, j) + _getItem( arr2, i, j);
						else
							arr[j] = _getItem(arr1, i, j) - _getItem( arr2, i, j);
					}
					result.push( arr );
				}
			}
			return result;
		},

		add : function( arr1, arr2 ) {
			return this._addOrSub( arr1, arr2, true);
		},

		sub : function( arr1, arr2 ) {
			return this._addOrSub( arr1, arr2, false);
		},

		//矩阵的数乘
		multip : function( arr, number ) {
			var shape1 = this.shape(arr);
			var result = [], a;
			
			for ( var i = 0; i < shape1[0]; i++ ) {
				a = arr[i].map( function( item ) {
					return item * number;
				});
				result.push( a );
			}

			return result;
		},

		//矩阵之间的相乘
		dot : function( arr1, arr2 ) {
			var shape1 = this.shape( arr1 );
			var shape2 = this.shape( arr2 );

			var result = [], arr;
			// console.log( shape1, shape2 )
			//必须的条件是：第一个矩阵的列数等于第二个矩阵的行数
			if ( shape1[1] !== shape2[0] ) {
				throw new Error('两个矩阵不满足矩阵相乘的规范，' + 
								'规范是第一个矩阵的列数等于第二个矩阵的行数，请检查。')
			}else{
				//先将整个的数组构造出来
				for ( var i = 0; i < shape1[0]; i++ ) {
					result.push([]);
				}

				//最终的矩阵的行列分别为：shape1[0] shape2[1]
				//先从列开始循环比较好
				for ( i = 0; i < shape2[1]; i++ ) {
					for ( var j = 0; j < shape1[0]; j++ ) {
						var row = _getRow( arr1, shape1, j);
						var column = _getColumn( arr2, shape2, i );
						// console.log( row, column )
						result[j][i] = singleMultip( row, column );
					}
				}
			}
			return result;
		},


		//获取矩阵的转置矩阵
		transpose : function( arr ) {
			var shape = this.shape( arr );
			var result, a;
			
			//result需要有与原来相反的行和列，行列的数量调换
			result = ( new Array( shape[1] ) ).join( ',' ).split( ',' ).map( function(){
				return [];
			});

			//将原来的行转变成现在的列
			for ( var i = 0; i < shape[0]; i++ ) {
				var row = _getRow( arr, shape, i );
				result.forEach( function( item, index ) {
					item.push( row[index] );
				} )
			}
			return result;
		},

		//获取这个矩阵的行和列
		shape : function( M ) {
			var height,width;
			if ( _isArray( M ) && M.length > 0 ) {
				if ( _isArray( M[0] ) ){
					height = M.length;
					width = M[0].length;
				}else{
					throw new Error( '数组的第一个元素不是数组形式或者' +
									'数组长度等于0，请检查' );
				}
			}else{
				throw new Error( M + '不是数组形式或者数组长度等于0，请检查' );
			}
			return [height, width ];
		}
	};

	function _isArray( arr ) {
		if ( Array.isArray ){
			return Array.isArray( arr );
		}else {
			return Object.prototype.toString.call( arr ).toLowerCase() === '[object array]';
		}
	}

	function _isSameShape( shape1, shape2 ) {
		return shape1[0] === shape2[0] && shape1[1] === shape2[1];
	}

	function _getItem( arr, i, j ) {
		var result = _isArray( arr[0] ) ? arr[i][j] : arr[j];
		return result;
	}

	//获取数组的某一列的所有值
	function _getColumn( arr, shape, j ) {
		var result = [];
		for ( i = 0; i < shape[0]; i++ ) {
			result.push( _getItem( arr, i, j ) );
		}
		return result;
	}

	//取出数组某一行的所有值
	function _getRow( arr, shape, i ) {
		//如果数组是二维数组的话，返回某一行的数据，某则返回整个数组
		if ( _isArray( arr[0] ) ) {
			return __copy(arr[i]);
		}else{
			return arr;
		}
	}

	//一个单行与单列的矩阵相乘
	function singleMultip( arr1, arr2 ) {
		var result = 0;
		for ( var i = 0; i < arr1.length; i++ ) {
			result += arr1[i] * arr2[i];
		}
		return result;
	}

	//深度复制数组
	function __copy( arr ) {
		return arr.map( function(item){
			return item;
		})
	}
})(window);
