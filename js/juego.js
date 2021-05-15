


(() =>{
    'use strict'

    let deck         = [];
    const tipos      = ['C', 'D', 'H', 'S'],
          especiales = ['A', 'J', 'Q', 'K']

    let puntosJugador     = 0,
        puntosComputadora = 0;

    // Referencias html
    const btnPedir = document.querySelector('#btnPedir');
    const btnDetener = document.querySelector('#btnDetener');
    const btnNuevo = document.querySelector('#btnNuevo');

    const puntosHTML = document.querySelectorAll('small');
    const cartasJugador = document.querySelector('#jugador-cartas');
    const cartasComputadora = document.querySelector('#computadora-cartas')


    //esta funcion crea un nuevo deck
    const crearDeck = () =>{
    
        for( let i = 2; i <= 10; i++){
            // for (const tipo in tipos) {   //for in
            //     deck.push( i + tipos[tipo]);
            // }
            for (const tipo of tipos) {      // for of
                deck.push(i + tipo);
            }
        }

        for(const tipo of tipos){            //for of
            for(const espe of especiales){
                deck.push( espe + tipo);
            }
        }
        // for(const tipo in tipos){         //for in
        //     for( const espe in especiales){
        //         deck.push(especiales[espe] + tipos[tipo]);
        //     }
        // }

        // console.log(deck)
        deck = _.shuffle( deck );
        console.log(deck)

        return deck;
    };

    crearDeck();



    //Esta funcion me permite tomar una carta
    const tomarCarta = () => {
        
        if (deck.length === 0){
            throw 'No hay mas cartas';
        }

        let carta = deck.pop();
        console.log(carta);
        return carta;

    };
    // tomarCarta();



    // valor de la carta
    const valorCarta = ( carta ) => {
        
        const valor = carta.substring(0, carta.length - 1);
        // let puntos = 0;
        // console.log(puntos);
        console.log({ valor });
        return ( isNaN(valor) )   ? 
            ( valor  === 'A' ) ? 11 : 10
            : valor * 1;
        
        // if( isNaN( valor )  ){
        //     puntos = (valor === 'A') ? 11: 10;
        // } else{
        //     puntos = valor * 1;
        // }
        
       
    }
    // const newvalor = valorCarta( tomarCarta() )
    // console.log({ newvalor });


    const turnoComputadora = ( puntosMinimos ) =>{

        do{
            const carta = tomarCarta();
            // console.log( carta );
            puntosComputadora += valorCarta( carta );
            // puntos html
            puntosHTML[1].innerHTML = puntosComputadora;
        
            // mostrar cartas en el html
            let imgCarta = document.createElement('img');
            imgCarta.src = "cartas/"+carta+".png";
            imgCarta.classList = 'carta';
            cartasComputadora.append(imgCarta);

            if (puntosComputadora > 21 ){
                break;
            } else if (Math.abs(puntosComputadora - 21) <= Math.abs(puntosJugador - 21)) {
                break;
            }

        } while( (puntosComputadora < puntosMinimos) )


        setTimeout(() => {
            
            // if( puntosJugador > 21 ){
            //     alert('Computadora ganó')
            // }
            if( puntosJugador === puntosComputadora){
                alert('Empate');
            } else if (Math.abs(21 - puntosJugador) < Math.abs(21 - puntosComputadora)) {
                alert('Jugador ganó')
            } else if (Math.abs(21 - puntosComputadora) < Math.abs(21 - puntosJugador)) {
                alert('Computadora ganó')
            } else {
                alert('Empate');
            }
            // else if ( puntosComputadora > 21 ){
            //     alert('Jugador ganó')
            // } else{
            //     alert('Computadora ganó')
            // }
        }, 200);

    }




    // Eventos
    btnPedir.addEventListener( 'click', () => {
        const carta = tomarCarta();
        // console.log( carta );
        puntosJugador += valorCarta( carta );
        // puntos html
        // puntosHTML[0].innerHTML = puntosJugador;

        // mostrar cartas en el html
        var imgCarta = document.createElement('img');
        imgCarta.src = "cartas/"+carta+".png";
        imgCarta.classList = 'carta';
        // imgCarta.classList = 'negro';
        // imgCarta.id = 'negro';
        cartasJugador.append(imgCarta);

        // controlar los puntos del jugador
        // if ( puntosJugador > 21 ){
        //     console.warn('Lo siento, perdiste');
        //     btnPedir.disabled = true;
        //     btnDetener.disabled = true;
        //     turnoComputadora( puntosJugador );
        // } else if( puntosJugador === 21 ){
        //     console.warn('21, Genial');
        //     btnPedir.disabled = true;
        //     btnDetener.disabled = true;
        //     turnoComputadora( puntosJugador );
        // }

    
    });

    btnDetener.addEventListener( 'click',  () => {
        // console.log(puntosJugador);
        turnoComputadora( puntosJugador );
        puntosHTML[0].innerHTML = puntosJugador
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        // hijo = cartasJugador.querySelectorAll('.negro');
        // hijo.classList.remove('negro');


    })
    
    btnNuevo.addEventListener( 'click',  () => {
        deck = [];
        crearDeck();

        puntosJugador = 0
        puntosComputadora = 0
        puntosHTML[1].innerHTML = "0";
        puntosHTML[0].innerHTML = "0";
        
        cartasJugador.innerHTML = '';
        cartasComputadora.innerHTML = '';
        btnPedir.disabled = false;
        btnDetener.disabled = false;
    })



    // todo: borra
    // console.log(21)
    // turnoComputadora(21);

})()


