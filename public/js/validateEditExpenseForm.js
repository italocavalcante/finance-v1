$(document).ready(function(){
	$("#btnEnviar").click(function(event){
        event.preventDefault();
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
    
    console.log("title: "+ title)
    console.log("value: "+ value)
    console.log("description "+ description)
    expenseNewDate = new Date(year, month-1,day, hours, minutes)
    if(expenseNewDate == "Invalid Date"){
        alert("Choose a Valid Date !")
        return 0
    }

    console.log(expenseNewDate)
        
		$.ajax({
		    method: "POST",	
		    url: "/expense/edit/"+id,	
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
	
