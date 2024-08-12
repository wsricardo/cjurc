var trace1 = {
    type: 'lines',
    x: [],
    y: [],
    marker: {
        color: '#C8A2C8',
        line: {
            width: 1.5
        }
    }
  };
  const inData = {
    value: document.querySelector("#inputValue"),
    time: document.querySelector("#inputTime"),
    tax: document.querySelector("#inputTax"),
    deposit: document.querySelector("#inputDeposit")
  }

  var data = [ trace1 ];
  
  var layout = { 
    title: 'Valor após um tempo em meses.',
    font: {size: 12},
    width: 320,
    height: 320,
    autosize: true
  };
  
  var config = {
    
    responsive: true}

function fjurc( m0, taxa, tempo, d ){
    y = m0;
    if ( tempo == 0 ) {
        return y;
    } else {
        return fjurc(y , taxa, tempo - 1, d )*(1+taxa/100)+d;

    }
}


  
 

function compute(){
    var time = inData.time.valueAsNumber;
    var value = inData.value.valueAsNumber;
    var tax = inData.tax.valueAsNumber;
    var deposit = inData.deposit.valueAsNumber ;

    trace1.x = [];
    trace1.y = [];
    
    for (i = 0; i < time ; i++ ){
        trace1.x[i] = i + 1;
    }

    for (j=0; j < time; j++) {
        trace1.y[j] = fjurc( value, tax, j, deposit); 
    }

    Plotly.newPlot('plotview', data, layout, config );
    const v = document.querySelector("#dvalue");
    v.innerHTML= trace1.y[time-1].toFixed(2);
    const t = document.querySelector("#dmouth");
    t.innerHTML = trace1.x.length;

}