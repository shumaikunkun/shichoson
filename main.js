const maps = [ "./prefecture.svg"]
const containers = document.querySelectorAll( '.map' )

const color_phase = ["rgb(0, 254, 255)", "rgb(0, 254, 0)", "rgb(254, 254, 6)", "rgb(255, 1, 0)", "rgb(255, 0, 255)"]
// #00FEFF, #00FE00, #FEFE06, #FF0100, #FF00FF
const color_square = ["color_1_square", "color_2_square", "color_3_square", "color_4_square", "color_5_square"]

color_phase.forEach((color, i) => {
  document.getElementById(color_square[i]).style.color = color;
});

var score = 0

maps.forEach( async ( map, index ) => {
  const res = await fetch( map )

  if ( res.ok ) {
    const svg = await res.text()
    containers[ index ].innerHTML = svg

    const prefs = document.querySelectorAll( '.geolonia-svg-map .prefecture' )

    prefs.forEach( ( pref ) => {
      pref.addEventListener( 'click', ( event ) => {
        score++
        const rgb = event.currentTarget.style.fill
        console.log("変更前: "+rgb);
        console.log(rgb==false);
        console.log(rgb==color_phase[0]);

        console.log(pref);

        if (rgb == false) {
          event.currentTarget.style.fill = color_phase[0]
        }else if (color_phase.includes(rgb)) {
          i = color_phase.indexOf(rgb)
          if (i >= color_phase.length-1) {
            event.currentTarget.style.fill = null
            score-=color_phase.length+1
          }else{
            event.currentTarget.style.fill = color_phase[i+1]
          }
        }
        document.getElementById('score').textContent =  "経県値スコア "+score+"pt";
        console.log(score);
      } )
    } )
  }
} )
