var category = null;

 /* document.getElementById('stationarypage').addEventListener('mouseover', function(){
	var element = document.getElementById('hiddenliststationary'),
    style = window.getComputedStyle(element),
    display = style.getPropertyValue('display');
	if(display=="none"){
		document.getElementById('hiddenliststationary').style.display = 'block';
		document.getElementById('hiddenliststationary').style.display = 'block';
		document.getElementById('stationarypage').style.background = "green";
	}
	else{
		document.getElementById('hiddenliststationary').style.display = 'none';
		document.getElementById('stationarypage').style.background = "none";
	}
});  */

document.getElementById('signout').addEventListener('click', function(){
		document.getElementById('landing').style.display = 'block';
		document.getElementById('index').style.display = 'none';
		document.getElementById('sellerpage').style.display = 'none';
		document.getElementById('navigator').innerHTML = "";
	});
	
document.getElementById('catView').addEventListener('click', function(){
		document.getElementById('catlayout').style.display = 'block';
		document.getElementById('prolayout').style.display = 'none';
		document.getElementById('catView').style.color = 'darkgreen';
		document.getElementById('proView').style.color = 'white';
		
	});
	
document.getElementById('proView').addEventListener('click', function(){
		document.getElementById('prolayout').style.display = 'block';
		document.getElementById('catlayout').style.display = 'none';
		document.getElementById('proView').style.color = 'darkgreen';
		document.getElementById('catView').style.color = 'white';
	});
	
document.getElementById('sellerbutton').addEventListener('click', function(){
		document.getElementById('landing').style.display = 'none';
		document.getElementById('index').style.display = 'none';
		document.getElementById('sellerpage').style.display = 'block'
	});

 document.addEventListener('click', function(){
		document.getElementById('hiddenliststationary').style.display = 'none';
		//document.getElementById('stationarypage').style.background = "none";
}); 

function getCategories(dispalyFunction){
	loadData(this,getCategories);
	document.getElementById('landing').style.display = 'none';
	document.getElementById('index').style.display = 'block';
	document.getElementById('sellerpage').style.display = 'none'
	/*
	var xhttp;
	var url = "http://graph.facebook.com/";
	xhttp=new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
		  dispalyFunction(xhttp);
		}
		else
			dispalyFunction(xhttp);
	  };
	xhttp.open("GET", url, true);
	xhttp.send();*/
}

function dispalyFunction(xhttp){
	category = xhttp.responseText;
	console.log(category);
}

document.getElementById('saveItems').addEventListener('click', function(){
		var id = '001';
		var product = 'product';
		var description = 'description';
		var category = 'category';
		var vid = '999';
		var price = '100.0';
		var url = "http://192.168.6.46:8080/Jivox_online/prod/ProductService/insertProduct";
		
		
		var jsonData = JSON.stringify({ itemId : id , itemName: product ,itemDesc: description ,itemPrice: price ,categoryId: category ,vendorId:  vid });
		console.log(jsonData);
		var xmlhttp= new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
            console.log(xmlhttp); 
		}
		xmlhttp.open("POST", url,true);
		xmlhttp.setRequestHeader("Content-Type", "application/json");

		xmlhttp.send(jsonData);
	});
	
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Node.prototype.querySelectorAllArray = function(selector){
  return Array.prototype.slice.call(this.querySelectorAll(selector));
 }
 Array.prototype.arrayEventListener = function(eventType, callback){
     for(elem of this)
	    elem.addEventListener(eventType, callback);
 }
 Array.prototype.filterArrayElement = function(tag){
     var arr = new Array();
	 this.forEach(function(i){
	    if(i.tagName.toLowerCase() == tag)
		   arr.push(i);
	 });
	 return arr;
 }
 Element.prototype.convertToArray = function(){
     return Array.prototype.slice.call(this.children);
 }
 Object.prototype.ParentElement = function(selector){
    var self = this.parentElement;
	var isAvailable = false;
    if(selector.indexOf('.') != -1 && self.getAttribute('class')){
	classSelector = selector.replace('.','');
	    self.getAttribute('class').split(' ').forEach(function(classSel){
		   if(classSel == classSelector){
		       isAvailable = true;
			   return;
			}
		}); 
	}
	return isAvailable ? self : self.ParentElement(selector);
 }
 Object.prototype.ChildrenElement = function(selector,retElement){
     var self = this;
	 var listOfElements = this.convertToArray();
	 if(selector.indexOf('.') > 1){
	    self.arr = new Array();
		for(var i=0; i < listOfElements.length > 0; i++){
				if(listOfElements[i].tagName.toLowerCase() == selector.split('.')[0])
					self.arr.push(listOfElements[i]);
	    }
	    var val = self.arr.forEach(function(x){
		        if(x.getAttribute('class') && x.getAttribute('class').indexOf(selector.split('.')[1]) >= 0){
				      self.retElement = x;
				      return self.retElement;
				}
			    else if(x.children.length > 0)
				       return x.ChildrenElement(selector);
		});
		if(self.retElement) return self.retElement;
 }
 }
window.onload = function(){
     var categoryFields = ["Category Id", "Category Name", "Category Description", "Field 1", "Field 2"];
	 var productFields = ["Product Id", "Product Name", "Product Description", "Category Name", "Price","Vendor Id"];
	 var data = JSON.parse('[{"categoryId":1,"categoryName":"Stationery","categoryDesc":"","field1":null,"field2":null}, {"categoryId":2,"categoryName":"Toys","categoryDesc":null,"field1":null,"field2":null}, {"categoryId":3,"categoryName":"Footwear","categoryDesc":null,"field1":null,"field2":null}]');
	 var baseUrl = "http://192.168.6.46:8080/Jivox_online/prod/ProductService/"
	 var loadData = function(container,relativeAddress){
								var xhttp = new XMLHttpRequest();
								xhttp.onreadystatechange = function() {
								if (xhttp.readyState == 4 && xhttp.status == 200) {
									//document.getElementById("demo").innerHTML = xhttp.responseText;
									console.log(JSON.parse(xhttp.responseText));
									container.tagName == "TABLE" ? traverseData(JSON.parse(xhttp.responseText),container): traverseListFormat(JSON.parse(xhttp.responseText),container);
								}
								};
								xhttp.open("GET", baseUrl + relativeAddress, true);
								xhttp.send();
	}
	
/*** parse record into list ***/
var traverseListFormat = function (data,container){
       if(data && data.constructor !== Array)
          {
			var child2 = document.createElement('li');
			child2.setAttribute('catId',data['categoryId']);
			child2.innerHTML = data['categoryName'];
			container.appendChild(child2);
        }
      if(data.constructor === Array){
		  for(var i = 0; i < data.length; i++){
		  var arrayElement = document.createElement('ul');
	      var arrayObj = data[i];
               traverseListFormat(arrayObj,arrayElement);
		  container.appendChild(arrayElement);
          }
		}
}
/***    end     ***/	
/*** parse the record ****/
     var traverseData = function (data,container){
       if(data && data.constructor !== Array)
          {
		      for (key in data) {
					if (data.hasOwnProperty(key)) {
					var child2 = document.createElement('td');
					child2.innerHTML = data[key];
					container.appendChild(child2);
					}
				}  
              console.log(" is " + data);
        }
      if(data.constructor === Array){
		  for(var i = 0; i < data.length; i++){
		  var arrayElement = document.createElement('tr');
	      var arrayObj = data[i];
               traverseData(arrayObj,arrayElement);
		  container.appendChild(arrayElement);
          }
		}
	}
/*** end of parsing ****/
/***  creating list table     ***/
     var createTableDesign = function(arr,relativeAddress){
	     //var subUrl = this.getAttribute('id') == "category" ?  "getCategories" : "getProductsAll";
	     var table= document.createElement('table');
		 var tr = document.createElement('tr');
		 arr.forEach( function(s) { 
            var th = document.createElement('th');
			th.innerHTML = s;
			th.style.innerWidth = (100/arr.length) + '%';
			tr.appendChild(th);
         } );
		 table.appendChild(tr);
		 loadData(table,relativeAddress);
		 //traverseData(data,table);
		 return table;
	 }
	 var displayCategory = function(){
	        var relativeAddress = "getCategories";
			loadData(document.querySelector('.navigation'),relativeAddress);
	 }
	 document.querySelector('#category').appendChild(createTableDesign(categoryFields,"getCategories"));
	 document.querySelector('#product').appendChild(createTableDesign(productFields,"getProductsAll"));
	 document.getElementById('buyerbutton').addEventListener('click',function(){
		 console.log(this);
		 loadData(document.querySelector('.navigate'),"getCategories");
		 document.getElementById('landing').style.display = 'none';
		 document.getElementById('index').style.display = 'block';
	 })
	 //getCategories(document.getElementById('buyerbutton'));
	 //displayCategory();
	// traverseListFormat(document.querySelector('.navigation'));
/*** end	**/


/****  operation methods ***/
     document.querySelectorAllArray('#functiomOperation a').arrayEventListener('click', function(){
	     if(this.getAttribute('value') == 'add'){
		     var self = this;
		     var retElement;
			 var parentElement = this.ParentElement('.grid');
			 var element = parentElement.ChildrenElement('div.current',self.retElement);
			 console.log(element);
			 var itemFields = "product".indexOf(element.getAttribute('class')) != -1 ? categoryFields : productFields;
			 var table = element.querySelector('table');
			 var trCount = table.querySelectorAllArray('tr').length;
			 var tr = document.createElement('tr');
			 for(var i=0; i< itemFields.length; i++){
				var td = document.createElement('td');
				var input = document.createElement('input');
				input.setAttribute('type','text');
				input.setAttribute('id',itemFields[i].replace(' ','_') + '_' + trCount);
				td.appendChild(input);
				tr.appendChild(td);
			 }
			 table.appendChild(tr);
			 }
	 });
	 document.querySelectorAllArray('#idcategories ul li').arrayEventListener('click', function(){
			 
	 });
/****  end *****/	 
}
