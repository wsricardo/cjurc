// Olá. Bem vindo. o/

//Abaixo iniciamos definindo o objeto
// que representa o programa que desenha
//os gráficos dos valores em reais obtidos
// ao longo dos meses com juros compostos.
const app = {

    // Dados e caracteristicas do gráfico.
    trace1 : {
        type: "lines",
        x : [ ],
        y: [],
        marker: {
            color: '#c8a2c8',
            line: {
                width: 1.5
            }
        }
    },

    // iData
    // Entradas do usuários. Valor inicla ( M0, value), tempo (time, taxa de juros ( tax ),
    // depósito mensal (deposit ). Esses campos de entradas estão definidos no arquivo HTML ( index.html ).
    inData: {
        value: document.querySelector( "#inputValue" ), // campo com a ID 'inputValue
        time: document.querySelector('#inputTime'), // campo com ID 'inputTime'
        tax: document.querySelector('#inputTax'), // campo com a ID 'inputTax'
        deposit: document.querySelector( '#inputDeposit' ) // campo com a ID 'inputDeposit
    },

    // Configurar layout para gráfico para biblioteca 'Plotly'
    // para exibição do gráfico a partir dos dados.
    layout: {
        title: 'Valor após um tempo em meses.',
        font: { size: 12}, //configurando o tamanho da fonte para texto.
        width: 320,
        height: 320, // tamanhos para área do gráfico
        autosize: true
    },

    // Configuração
    config : {
        responsive: true
    },

    // A função abaixo calcula o montante (valor ) em reais no mês conforme
    // dados inseridos pelo usuário. (função de juros compostos )
    fjurc: function( m0, taxa, tempo, d ){
        y = m0;
        if ( tempo == 0) {
            return y;
        } else {
            return this.fjurc( y, taxa, tempo - 1, d)*( 1 + taxa/100.0 ) + d; // Função chamada recursivamente.

        }
    }
}

// inicia o programa e computação sobre os dados de entrada do usuário.
function compute(){
    let time = app.inData.time.valueAsNumber;
    let value = app.inData.value.valueAsNumber;
    let tax = app.inData.tax.valueAsNumber;
    let deposit = app.inData.deposit.valueAsNumber;
    let data = [ app.trace1 ];

    // x e y são vetores guardam os valores onde x é o mês e y a lista
    // dos valores para cada mês.
    app.trace1.x = [];
    app.trace1.y = [];

    
    

    // Preenchimento do vetor do tempo (em meses ).
    for ( i = 0; i <= time; i++) {
        app.trace1.x[i] = i ;
    }

    // Cálculo e preenchimento do vetor y
    // com valor de cada mês calculado pela função 'fjurc'.
    for ( j = 0; j <= time; j++ ){
        app.trace1.y[j] = app.fjurc( value, tax, j , deposit );

    }

    // Renderiza gráfico na área definida no HTML para página conforme a ID do campo.
    Plotly.newPlot( 'plotview' , data, app.layout, app.config );
    const v = document.querySelector( '#dvalue' ); // Campo onde vai valor final.
    v.innerHTML = app.trace1.y[ time ].toFixed( 2 ); // Fixando em duas casas decimais para o valor.
    const t = document.querySelector( '#dmouth' );// Campo referente ao mês calculado.
    t.innerHTML = app.trace1.x.length - 1;

}

