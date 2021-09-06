const maps = [ "./prefecture.svg"]
const containers = document.querySelectorAll( '.map' )

const color_phase = ["rgb(200, 200, 200)", "rgb(150, 150, 150)", "rgb(100, 100, 100)", "rgb(50, 50, 50)"]

maps.forEach( async ( map, index ) => {
  const res = await fetch( map )

  if ( res.ok ) {
    const svg = await res.text()
    containers[ index ].innerHTML = svg

    const prefs = document.querySelectorAll( '.geolonia-svg-map .prefecture' )

    prefs.forEach( ( pref ) => {
      pref.addEventListener( 'click', ( event ) => {
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
          }else{
            event.currentTarget.style.fill = color_phase[i+1]
          }
        }
      } )
    } )
  }
} )
