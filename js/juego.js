


(() =>{
    'use strict'

    let deck         = [];
    const tipos      = ['C', 'D', 'H', 'S'],
          especiales = ['A', 'J', 'Q', 'K']

    let puntosJugador     = 0,
        puntosJugadorDos  = 0,
        puntosComputadora = 0;

    // Referencias html
    // const btnPedir = document.querySelector('#btnPedir');
    const btnPedirUno = document.querySelector('#btnPedirUno');
    const btnPedirDos = document.querySelector('#btnPedirDos');
    const btnDetener = document.querySelector('#btnDetener');
    const btnNuevo = document.querySelector('#btnNuevo');

    const puntosHTML = document.querySelectorAll('small');
    const cartasJugador = document.querySelector('#jugador-cartas');
    const cartasJugadorDos = document.querySelector('#jugador-cartas-dos');
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


    const turnoComputadora = ( puntosMinimos, punttosMinimosDos ) =>{

        do{
            const carta = tomarCarta();
            // console.log( carta );
            puntosComputadora += valorCarta( carta );
            // puntos html
            puntosHTML[2].innerHTML = puntosComputadora;
            // mostrar cartas en el html
            let imgCarta = document.createElement('img');
            imgCarta.src = "cartas/"+carta+".png";
            imgCarta.classList = 'carta';
            cartasComputadora.append(imgCarta);

            if (puntosComputadora > 21 ){
                break;
            } else if (Math.abs(puntosComputadora - 21) <= Math.abs(puntosJugador - 21) && Math.abs(puntosComputadora - 21) <= Math.abs(puntosJugadorDos - 21) ) {
                break;
            }
                   
        } while( (puntosComputadora < puntosMinimos || puntosComputadora < punttosMinimosDos))


        setTimeout(() => {
            
            if(puntosJugador === puntosComputadora && puntosJugadorDos === puntosComputadora && puntosJugador === puntosJugadorDos){
                alert('Triple empate')
            }         
            // else if (puntosJugador > puntosComputadora && puntosJugador > puntosJugadorDos){
            //     alert('Jugador 1 ganó')
            // } 
            // else if (puntosJugadorDos > puntosComputadora && puntosJugadorDos > puntosJugador){
            //     alert('Jugador 2 ganó')
            // }
            // else if (puntosComputadora > puntosJugadorDos && puntosComputadora > puntosJugador){
            //     alert('Computador ganó')
            // }
            else if (Math.abs(21 - puntosJugador) < Math.abs(21 - puntosComputadora) && Math.abs(21 - puntosJugador) < Math.abs(21 - puntosJugadorDos)) {
                alert('Jugador 1 ganó')
            } 
            else if (Math.abs(21 - puntosComputadora) < Math.abs(21 - puntosJugador) && Math.abs(21 - puntosComputadora) < Math.abs(21 - puntosJugadorDos)) {
                alert('Computadora ganó')
            } 
            else if (Math.abs(21 - puntosJugadorDos) < Math.abs(21 - puntosJugador) && Math.abs(21 - puntosJugadorDos) < Math.abs(21 - puntosComputadora)) {
                alert('Jugador 2 ganó')
            } 
            else  if(puntosJugador === puntosComputadora){
                alert('Empate Jugador 1 y Computadora')
            }
            else  if(puntosJugadorDos === puntosComputadora){
                alert('Empate Jugador 2 y Computadora')
            }
            else  if(puntosJugador === puntosJugadorDos){
                alert('Empate Jugador 1 y Jugador 2')
            }
            else  if(Math.abs(21 - puntosJugador) == Math.abs(21 - puntosComputadora)){
                alert('Empate Jugador 1 y Computadora')
            }
            else  if(Math.abs(21 - puntosJugadorDos) == Math.abs(21 - puntosComputadora)){
                alert('Empate Jugador 2 y Computadora')
            }
            else  if(Math.abs(21 - puntosJugador) == Math.abs(21 - puntosJugadorDos)){
                alert('Empate Jugador 1 y Jugador 2 ')
            }
            else {
                alert('Empate');
            }

        }, 200);

    }




    // Eventos
    // btnPedir.addEventListener( 'click', () => {
    //     const carta = tomarCarta();
    //     // console.log( carta );
    //     puntosJugador += valorCarta( carta );
    //     // puntos html
    //     // puntosHTML[0].innerHTML = puntosJugador;

    //     // mostrar cartas en el html
    //     var imgCarta = document.createElement('img');
    //     imgCarta.src = "cartas/"+carta+".png";
    //     imgCarta.classList = 'carta';
    //     imgCarta.classList = 'negro';
    //     cartasJugador.append(imgCarta);
    // });
    btnPedirUno.addEventListener( 'click', () => {
        const carta = tomarCarta();
        // console.log( carta );
        puntosJugador += valorCarta( carta );
        // puntos html
        // puntosHTML[0].innerHTML = puntosJugador;

        // mostrar cartas en el html
        let imgCarta = document.createElement('img');
        imgCarta.src = "cartas/"+carta+".png";
        imgCarta.classList = 'carta';
        imgCarta.classList.add('negro');
        cartasJugador.append(imgCarta);
    });

    btnPedirDos.addEventListener( 'click', () => {
        const cartaDos = tomarCarta();
        // console.log( carta );
        puntosJugadorDos += valorCarta( cartaDos );
        // puntos html
        // puntosHTML[0].innerHTML = puntosJugador;

        // mostrar cartas en el html

        let imgCartaDos = document.createElement('img');
        imgCartaDos.src = "cartas/"+cartaDos+".png";
        imgCartaDos.classList = 'carta';
        imgCartaDos.classList.add('negro');
        console.log("entrando", cartaDos);
        cartasJugadorDos.append(imgCartaDos);
    });


    btnDetener.addEventListener( 'click',  () => {
        // console.log(puntosJugador);
        turnoComputadora( puntosJugador, puntosJugadorDos);
        // turnoComputadora( puntosJugadorDos);
        puntosHTML[0].innerHTML = puntosJugador
        puntosHTML[1].innerHTML = puntosJugadorDos
        btnPedirUno.disabled = true;
        btnPedirDos.disabled = true;
        btnDetener.disabled = true;
        let hijo = cartasJugador.querySelectorAll('.negro');
        let hijoDos = cartasJugadorDos.querySelectorAll('.negro');
        for (let i = 0; i < hijo.length; i++) {
            hijo[i].classList.remove('negro');
        }
        for (let i = 0; i < hijoDos.length; i++) {
            hijoDos[i].classList.remove('negro');
        }


    })
    
    btnNuevo.addEventListener( 'click',  () => {
        deck = [];
        crearDeck();

        puntosJugador = 0
        puntosJugadorDos = 0
        puntosComputadora = 0
        puntosHTML[2].innerHTML = "0";
        puntosHTML[1].innerHTML = "0";
        puntosHTML[0].innerHTML = "0";
        
        cartasJugador.innerHTML = '';
        cartasJugadorDos.innerHTML = '';
        cartasComputadora.innerHTML = '';
        btnPedirUno.disabled = false;
        btnPedirDos.disabled = false;
        btnDetener.disabled = false;
    })



})()


