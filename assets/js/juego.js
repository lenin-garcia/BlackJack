/**
 * Leyenda de las cartas
 * C = trebol
 * H = corazon
 * D= diamante
 * S = espada
 * NOTA: las cartas van del 2  al 10
 */




/**
 * Modulo de patron
 * funciones anonimas autoinvocadas: finalizan
 * con un parentesista para qser ejecutadas
 * automaticamnte
 * 
 */

(()=>{

       
let mazoDeCartas    = []; //2  hasta 10
const tiposDeCartas   = ['C','H','D', 'S'],
      especiales    = ['A','K','Q','J']; // CARTAS QUE NO SON NUMERICAS
let puntosJugador       = 0,
    puntosComputadora   = 0



// referencias del html
const pedir   = document.querySelector('#btnPedir'),
     detener = document.querySelector('#btnDetener'),
     nuevoJuego = document.querySelector ('#btnNuevoJuego'),
     puntosHtml = document.querySelectorAll('small'),
     cntCartasJugador        = document.querySelector('#jugador-cartas'),
     cntCartasComputadora    = document.querySelector('#computadora-cartas')




//combinacion de numeros con tipos de letras
const crearMazoCartas = ()=>{
             //inicializacion de mazo de cartas
              mazoDeCartas = []

                        for (let i =2 ; i<=10 ; i++){

                                for (tipo of tiposDeCartas){
                                    mazoDeCartas.push (i + tipo)
                                }
                        }
                     // combinacion de cartas numericas con cartas especiales
                        for( especial of especiales ){

                        for( tipo of tiposDeCartas){

                                mazoDeCartas.push( especial + tipo)
                        }
                    
                            }           
        // regresara el mazo de cartas desordenadas
           return   _.shuffle(mazoDeCartas);

}

 // comienzo del juego
 const inicilalizarMazo = () =>{
   mazoDeCartas = crearMazoCartas ();
 }



// funcion pedir carta
const pedirCarta = () =>{
    // condicion en dado caso no existan mas cartas
    if(mazoDeCartas.length === 0){

        throw 'No hay cartas en el mazo'
    }

    //regresara la carta extraida del mazo
   return mazoDeCartas.pop();
    
}



const valorCarta = ( carta) =>{
    // SEPARAMOS EL TIPO DE CARCA
    let valor = carta.substring(0, carta.length - 1 )
     // OPERADOR TERNARIO QUE EVALUA SI ES UNA LETRA, EN DADO CASO DEVOLVERA UN NUMERO
    return (isNaN(valor))?
            (valor === 'A')? 11: 10
            : parseInt (valor)           
}


//console.log("La carta seleccionada es "+ pedirCarta() )
//console.log("Su valor es "+ valorCarta(pedirCarta())  )

/********************************************************************
 * EL turno de la computadora se disparar en dos ocaciones:
 * 1.- Cuando el jugador pierda (saque mas de 21)
 * 2.- Cuando se pulse el boton detener
 * 3.- Cuando el jugador llegue a 21 
 *******************************************************************/
///////////////////////////// funcion para que la compuradora gane si el jugador pasa de 21
    const turnoComputadora = (puntosDelJugador) => {

        do{
            let point = pedirCarta(); 
            puntosComputadora = puntosComputadora + valorCarta(point) // obtencion del puntaje  
            puntosHtml[1].innerText = puntosComputadora; // agragar puntaje en hatml al primer small

            //cracion de imagen que va a ser insertada en el html
            let imagenCarta = document.createElement('img');
            imagenCarta.src = `assets/cartas/${point}.png` // creacion de carta
            imagenCarta.classList.add('carta'); // agrgado de clase para que tenga su tamaño correcto
            cntCartasComputadora.append(imagenCarta) // insertar en el html
                // si el jugador pierde, no es necesario que continue
                    if(puntosDelJugador > 21 ){
                        console.log('ha ganado la computadora')
                    break;
                }


        }while( (puntosComputadora < puntosDelJugador) && (puntosDelJugador <= 21) ); // mientras que la computadora tenga menor puntaje lo repetira

        // se ejecutara depues que se muestren las cartas
        // mostrara en alert
       setTimeout(() => {
           if (puntosComputadora === puntosDelJugador ) {
               alert ('Nadie gana, han quedado igual')
           } else if (puntosComputadora > 21) {
               alert ('Ganas tu, felicidades')
           } else if (puntosDelJugador > 21) {
                alert ('Lo siento, ha ganado la computadora')
           } else
            alert ('Lo siento, ha ganado la computadora')
       }, 10);
       
    }///////////////////////////// funcion para que la compuradora gane si el jugador pasa de 21









//*********************eventos******************************
pedir.addEventListener('click',  () => {
    
    let point = pedirCarta(); 
    puntosJugador = puntosJugador + valorCarta(point) // obtencion del puntaje  
    puntosHtml[0].innerText = puntosJugador; // agragar puntaje en hatml al primer small

    //cracion de imagen que va a ser insertada en el html
    let imagenCarta = document.createElement('img');
    imagenCarta.src = `assets/cartas/${point}.png` // creacion de carta
    imagenCarta.classList.add('carta'); // agrgado de clase para que tenga su tamaño correcto
    cntCartasJugador.append(imagenCarta) // insertar en el html
   

    // condicion que paraliza el juego en dado caso sea mayor que 21
    if (puntosJugador > 21){
        console.log('Perdiste')
        pedir.disabled = true; // bloque del boton pedir si se pasa de puntos
        detener.disabled = true;
        turnoComputadora(puntosJugador) // llamo a esta funcion cuando supere los 21

    } else if (puntosJugador === 21) {
        console.log('Genial')
        pedir.disabled = true; // bloque del boton pedir si ganas
        detener.disabled = true;
        turnoComputadora(puntosJugador);
    }   



})

// evento detener
detener.addEventListener('click', () =>{

    detener.disabled = true;
     pedir.disabled = true; // bloque del boton pedir si ganas
    turnoComputadora(puntosJugador);

} )

// evento iniciar nuevo juego
nuevoJuego.addEventListener('click', () => {
    inicilalizarMazo();
//    mazoDeCartas = [] // aseguramos que este vacio
//    mazoDeCartas=  crearMazoCartas(); // creamos un nuemo mazo de cartas

   console.log (mazoDeCartas);
  // botones
   detener.disabled = false; // habilitamos los botones
   pedir.disabled = false; // habilitamos los botones
   
   // puntaje en html
    puntosHtml[0].innerHTML = 0;
    puntosHtml[1].innerHTML = 0;

    //puntaje calculado
    puntosJugador = 0;
    puntosComputadora = 0;

    //cartas
    cntCartasJugador.innerHTML = '';
    cntCartasComputadora.innerHTML = '';

})






})()



