import React from 'react';

function Hero() {
  return (
    <div className="w3-display-container w3-animate-opacity" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{textAlign:'center',marginTop:'50px'}}>
        <h1 style={{color:'white',fontWeight:'600',fontSize:'120px' }}>WordWave</h1>
        <a href="#about" style={{color:'white', backgroundColor:'transparent ',display:'inline-block',
          textDecoration:'none',border:'2px solid #fff', padding:'10px 20px',
          borderRadius:'50px',marginTop:'20px'}}>EXPLORE</a>
      </div>
    </div>
  );
}

export default Hero;

