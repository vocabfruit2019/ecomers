var shopcart=[];
$(document).ready(function(){
	$(".productitem").click(function(e){
		e.preventDefault();
		var iteminfo=$(this.dataset)[0];
		iteminfo.qty=1;
		var itemincart=false;
	$.each(shopcart,function(index,value){
		if (value.id==iteminfo.id){
			value.qty=parseInt(value.qty)+parseInt(iteminfo.qty);
			itemincart=true;
		}
	})
	if(!itemincart){
		shopcart.push(iteminfo);
	}
	sessionStorage["sca"]=JSON.stringify(shopcart);
	outputcart();


	})
	function outputcart(){
		if(sessionStorage["sca"]!=null){
			shopcart=JSON.parse(sessionStorage["sca"].toString());
			$("#checkoutdiv").show();
		}
		var holderhtml="";
		var total=0 ;
		var itemcount=0;
		$.each(shopcart,function(index,value){
			var subtotal=value.qty*value.price;
			total=total+subtotal;
			itemcount=itemcount+parseInt(value.qty);
			holderhtml += '<tr><td>' + value.qty + '</td><td>#' + value.id + ' ' + value.name + '(' + value.s + ')</td><td> ' + formatMoney(value.price) + ' </td><td class="text-xs-right"> ' + formatMoney(subtotal) + '</td></tr>';

		})
		holderhtml += '<tr><td colspan="3" class="text-xs-right">Total</td><td class="text-xs-right">' + formatMoney(total) + '</td></tr>';
		$("#output").html(holderhtml);
		$(".total").html(formatMoney(total));
		$(".items").html(itemcount);



	}
	function  formatMoney(n){
		return "$"+n;
	}
})