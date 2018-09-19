$(document).ready(function($){

  //$(".span2").slider();

  $('.delete-customer').click(function(e){

      if(confirm('Are you sure you want to delete customer'))
      {
        $target = $(e.target);
        const id=($target.attr('data-id'));

        $.ajax({
          type:'DELETE',
          url:'/customer/delete/'+id,
          success:function(response){
            //alert('Deleting Customer');
            window.location.href='/users/dashboard/welcome';
          },
          error:function(err){
            console.log(err);
          }
        });
      }
  });

  $('.selecLoc').change(()=>{
    let location=$('.selecLoc').val();
    let cost=prices(location);
    let plotsize=$('.plotsize').val();
    let totalcost=cost * plotsize;
    $('.propcost').val(totalcost);
    //alert(cost);
  });

  $('.plotsize').change(()=>{
    let location=$('.selecLoc').val();
    let cost=prices(location);
    let plotsize=$('.plotsize').val();
    let totalcost=cost * plotsize;
    $('.propcost').val(totalcost);
    //alert(cost);
  });

  $('.optradio').click(()=>{
    let selval=$("input:radio[name='optradio']:checked").val();

      if(selval=='InstallmentalPayment')
         {
           $('.initialgrp').show();
         }
         else {
           $('.initialgrp').hide();
         }
  });


  $('.initdeposit').blur(()=>
  {
    let totalprice=parseInt($('.propcost').val());
    let initialDep=parseInt($('.initdeposit').val());

    if(initialDep > totalprice){
      alert('Initial Deposit Cannot Be Greater Than Total Cost');
    }
    else {
      let balance=totalprice-initialDep;
      $('.balance').val(balance);
    }

  });

  let totalprice=parseInt($('.propcost').val());
  let cuspaid=parseInt($('.cus-paid').val());
  let cusunpaid=parseInt($('.cus-unpaid').val());

  let paidtotal=Math.round((cuspaid/totalprice)*100)*5;

  let unpaidtotal=Math.round(((totalprice-cuspaid)/totalprice) * 100)*5;

  //let unpaidtotal=Math.round((cuspaid/cusunpaid)*100);

  $('.paid').css({"width":paidtotal+"px","float":"left"});
  $('.balance').css({"width":unpaidtotal+"px","float":"left"});

  function prices(price)
  {
    pricelist=[{'name':'Agbara Igbesa','price':1800000},{'name':'Lakowe/Lekki','price':4800000},
    {'name':'Agbowa/Ikorodu','price':750000},{'name':'Mowe/Ofada','price':650000},
    {'name':'Ilamija Ibeju Lekki/Epe','price':1800000}];

    for(i in pricelist){
      if(price==pricelist[i].name)
        {
          return pricelist[i].price;
        }
    }
  }
  $(".span2").slider();
});
