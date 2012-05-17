function TodoCtrl($scope){
	$scope.todos=[{text:'learn angular', done:false},
	{text:'be a mitten', done:true}];

	$scope.addTodo=function(){
		$scope.todos.push({text:$scope.todoText, done:false});
		$scope.todoText="";
	};

	$scope.remaining=function(){
		return _.filter($scope.todos,
			function(todo){ return !todo.done; }).length;
	};

	$scope.archive=function(){
		$scope.todos=_.filter($scope.todos,	function(todo){
			return !todo.done;
		});
	};

}