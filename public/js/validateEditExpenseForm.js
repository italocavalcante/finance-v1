$(document).ready(function(){
	$("#btnEnviar").click(function(event){
        event.preventDefault();
    var action = $("#action").val()
    var id = $("#expenseId").val()
    var title = $("#title").val()
    var value = $("#value").val()
    var description = $("#description").val()

    var expensedate = $("#expensedate").val()
    var expensetime = $("#expensetime").val()

    var year = expensedate.substr(6,4)
    var month = expensedate.substr(3,2) 
    var day = expensedate.substr(0,2)

    var hours = expensetime.substr(0,2)
    var minutes = expensetime.substr(3,2)
    
    expenseNewDate = new Date(year, month-1,day, hours, minutes)
    console.log(expenseNewDate)
    if(expenseNewDate == "Invalid Date"){
        alert("Choose a Valid Date !")
        return 0
    }

    if(action == "create"){
        url = "/expenses/insert"
    }else if (action == "update"){
        url = "/expense/edit/"+id
    }else{
        alert("Choose a valid CRUD operation")
    }

        
		$.ajax({
		    url: url,	
		    method: "POST",
		    datatype: "JSON",
		    data: {
                id: id,
                title: title,
                value: value,
                description: description,
                expensedatetime: expenseNewDate 
			  },
		    crossdomain: true,
		    success: function(response){
                    if(response.status == 200){
                        window.location.replace(response.url);
                    }
			    },
		    error: function(error){
				    console.log(error);
		    }
		    	
		});
	});
});
	
