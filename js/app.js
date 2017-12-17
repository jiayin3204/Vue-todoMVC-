(function () {
	// const todos = [
	// 	{
	// 		id: 1,
	// 		title: '吃饭',
	// 		done: true
	// 	},
	// 	{
	// 		id: 2,
	// 		title: '睡觉',
	// 		done: true
	// 	},
	// 	{
	// 		id: 3,
	// 		title: '打豆豆',
	// 		done: false
	// 	},
	// ]
	// 自动获取焦点
	// 自定义样式
	Vue.directive('focus', {
		inserted:function (el) {
			el.focus();
		}
	})

	Vue.directive('todo-focus', {
		update :function (el,binding) {
			console.log(binding.value);
			// 在HTML中进行了判断，如果currentEditing === item，那么返回true，binding.value的值就是true
			// 那么严谨的判断，给当前binding.value为true的元素添加焦点
			if(binding.value) {
				el.focus();
			}			
		}
	})

	window.app = new Vue({
		el: '#app',
		data: {
			todos: JSON.parse(window.localStorage.getItem('todos')) || [],
			currentEditing: null,
			filterText: 'all'
		},
		computed: {
			// 切换路由
			filterTodos() {
				switch (this.filterText) {
					case 'active':
						return this.todos.filter(t => !t.done);
						break;
					case 'completed':
						return this.todos.filter(t => t.done);
						break;
					default:
						return this.todos;
						break;
				}
			},

			// 样式联动
			toggleAllChange: {
				get () {
					return this.todos.every(t => t.done);
				},
				set () {
					var checked = !this.toggleAllChange;					
					this.todos.forEach(item => {
						item.done = checked;
					})
				}
			}
		},
		watch: {
			todos: {
				handler (val,oldval) {						
					window.localStorage.setItem('todos',JSON.stringify(val));
				},
				deep: true
			}
		},

		methods: {
			addEnterClick(e) {
				var target = e.target;
				var value = target.value.trim();
				if (!value.length) {
					return
				}
				this.todos.push({
					id: this.todos.length ? this.todos[this.todos.length - 1].id + 1 : 1,
					title: value,
					done: false
				})
				target.value = "";
			},

			// 点击按钮文本框全部被选中
			toggleChange(e) {
				var target = e.target;
				var checked = target.checked;
				this.todos.forEach(item => {
					item.done = checked;
				})
			},

			removeClick(index) {
				this.todos.splice(index, 1);
			},

			// 双击的时候由中间变量控制class的变化
			editDblclick(todo) {
				this.currentEditing = todo;
			},

			// 保存文本框内容到任务列表中
			// 非空校验
			// 如果是空的，则直接删除该任务
			// 如果不是空的，则保存编辑
			// 保存编辑成功去除 .editing 样式
			editEnterClick(e, index, todo) {
				var target = e.target;
				var value = target.value.trim();
				// 非空校验
				if (!value) {
					return this.removeClick(index);
				}

				todo.title = value;
				this.currentEditing = null;
			},

			editEsc() {
				this.currentEditing = null;
			},

			// 点击清除所有已完成的
			clearClick() {
				for (var i = 0; i < this.todos.length; i++) {
					if (todos[i].done) {
						this.todos.splice(i, 1);
						i--
					}
				}

				// 将数组中done为false的重新放到数组中并重重新赋值
				// this.todos = this.todos.filter(item => !item.done);
			}
		}

	})

	// 获取锚点
	window.onhashchange = function () {
		app.filterText = window.location.hash.substr(2);
	}
	window.onhashchange();

})();