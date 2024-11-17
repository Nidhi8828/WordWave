import React from 'react';

function Hero() {
  return (
    <div className="w3-display-container w3-animate-opacity" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {/* <div className="w3-container"> */}
      <div style={{textAlign:'center',marginTop:'50px'}}>
        {/* <span onClick={() => document.getElementById('id01').style.display = 'block'} 
              className="w3-xlarge w3-theme w3-hover-teal" 
              style={{ cursor: 'pointer', fontSize: '200px' }} 
              title="Go To W3.CSS">
          Audio Translation Hub
        </span> */}
        <h1 style={{color:'white',fontWeight:'600',fontSize:'120px' }}>WordWave</h1>
        <a href="#trans" style={{color:'white', backgroundColor:'transparent ',display:'inline-block',
          textDecoration:'none',border:'2px solid #fff', padding:'10px 20px',
          borderRadius:'50px',marginTop:'20px'}}>EXPLORE</a>
      </div>
    </div>
  );
}

export default Hero;

