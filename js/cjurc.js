// App for graphical plot of functions.
// Definição do objeto que representa
// programa que desenha o gráfico dos 
// valores (montantes) em Reais obtidos 
// ao longo dos meses com juros compostos.
// Neste programa será usado uma bibloioteca
// de visualização de dados chamada "Plotly".
const app =  {
	// Gráfico
    trace1: {
        type: 'lines',
        x: [],
        y: [],
        marker: {
            color: '#C8A2C8',
            line: {
                width: 1.5
            }
        }
    },

	// Entradas do usuários. Valor inical (M0), tempo, (time), taxa de juros (tax ),
	// deposito mensal (deposit ).
    inData: {
        value: document.querySelector('#inputValue'),
        time: document.querySelector('#inputTime'),
        tax: document.querySelector('#inputTax'),
        deposit: document.querySelector('#inputDeposit')
    },

	// Layout para a exibição do gráfico
	// dos dados.
    layout: {
        title: 'Valor após um temop em meses.',
        font: {size: 12},
        width: 320,
        height: 320,
        autosize: true
    },

	// Configuração.
    config: {
        responsive: true
    },

	// A função fjurc calcula o montante (valor ) reais no mês conforme
	// dados inserido pelo usuário.
    fjurc: function(m0, taxa, tempo, d) {
        y = m0;
        if ( tempo == 0 ){
            return y;
        } else {
            return this.fjurc( y, taxa, tempo - 1, d )*( 1 + taxa/100.0) + d; // Recursive method called.
        }       
    }
    
    /* Alternativ implementation.
    fjurc: m0, taxa, tempo, d {
         y = m0;
        if ( tempo == 0 ){
            return y;
        } else {
            return app.fjurc( y, taxa, tempo - 1, d )*( 1 + taxa/100.0) + d; // Recursive method called.
        }      
    }*/

};


// Inicia o programa e computação sobre os dados de entrada do usário.
function compute(){
    let time = app.inData.time.valueAsNumber;
    let value = app.inData.value.valueAsNumber; 
    let tax = app.inData.tax.valueAsNumber;
    let deposit = app.inData.deposit.valueAsNumber;
    
    

	// x e y são vetores que guardam os valores onde x é mês e y o lista de 
	// valores para cada mês.
    app.trace1.x = [];
    app.trace1.y = [];
    
    let data = [ app.trace1 ]

	// Preenchimento do vetores do tempo ( em meses)
    for ( i = 0; i < time; i++ ){
        app.trace1.x[i] = i + 1;
    }

	// Cálculo e preechimento do vetor y  com valor de cada mês calculado pela função 'fjurc'.
    for ( j =0 ; j < time ; j++ ) {
        app.trace1.y[j] = app.fjurc( value, tax, j, deposit );
    }

	// Renderiza gráfico na área definida no HTML para página.
    Plotly.newPlot( 'plotview', data, app.layout, app.config );
    const v = document.querySelector( '#dvalue' );
    v.innerHTML = app.trace1.y[ time - 1 ].toFixed( 2 );
    const t = document.querySelector( '#dmouth' );
    t.innerHTML = app.trace1.x.length;
}
