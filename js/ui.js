appwindow = {
    width: 800, 
    height: 600,
    winProp: "",
    wincss: function( width, winProp) { 
          this.winProp = winProp;
          this.width = width;
  return `
  ${this.winProp} {
      display: block;
      padding: 12px;
      margin: 0 auto;
      text-align: center;
      color: blue;
      background-color: whitesmoke;
      width: ${this.width};
  }`}
  , 
    createWindow: function( winProp ) {
        
        let win = document.createElement( 'div' )
        win.innerHTML = `<div class="${winProp.slice( 1 )}">APP</div>`
        let el = document.body.appendChild( win )
    
    },
  
    addCSS: function() {
      let el = document.getElementsByTagName('head');
      let ccss = document.createElement( 'style' );
      ccss.innerHTML = this.wincss( 800, `.win`);
      console.log( this.wincss( 800, `.win`) );
      document.head.appendChild( ccss );
  
    },

    // Set winProp property
    set swprop( s ) {
        this.winProp = s;
    },

    // Get value for winProp
    get gwprop( ) {
        return this.winProp;
    }
  
  }
  
  //appwindow.winProp = '.win';
  appwindow.swprop = '.win2';
  console.log( '> ',appwindow.gwprop);
  appwindow.addCSS();
  appwindow.wincss( 800, '.win')
  appwindow.createWindow('.win');