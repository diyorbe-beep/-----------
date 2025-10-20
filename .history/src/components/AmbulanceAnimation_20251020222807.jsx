import React from 'react'

const AmbulanceAnimation = () => {
  return (
    <div style={{ 
      width: '100%', 
      height: '200px', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(90deg, transparent, rgba(34, 211, 238, 0.1), transparent)',
      borderRadius: '12px',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Tez yordam mashinasi */}
      <div style={{
        position: 'absolute',
        left: '-100px',
        animation: 'ambulanceMove 3s ease-in-out infinite',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        {/* Mashina tanasi */}
        <div style={{
          width: '120px',
          height: '60px',
          background: 'linear-gradient(135deg, #f0f0f0, #e0e0e0)',
          borderRadius: '8px',
          position: 'relative',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
        }}>
          {/* Qizil xoch */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '30px',
            height: '30px',
            background: '#ff0000',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '20px',
            fontWeight: 'bold'
          }}>
            ✚
          </div>
          
          {/* Sirena */}
          <div style={{
            position: 'absolute',
            top: '-10px',
            left: '20px',
            width: '20px',
            height: '20px',
            background: '#0066ff',
            borderRadius: '50%',
            animation: 'sirenBlink 0.5s ease-in-out infinite'
          }}></div>
          
          <div style={{
            position: 'absolute',
            top: '-10px',
            right: '20px',
            width: '20px',
            height: '20px',
            background: '#ff0000',
            borderRadius: '50%',
            animation: 'sirenBlink 0.5s ease-in-out infinite 0.25s'
          }}></div>
        </div>
        
        {/* G'ildiraklar */}
        <div style={{
          width: '30px',
          height: '30px',
          background: '#333',
          borderRadius: '50%',
          animation: 'wheelSpin 0.3s linear infinite'
        }}></div>
        
        <div style={{
          width: '30px',
          height: '30px',
          background: '#333',
          borderRadius: '50%',
          animation: 'wheelSpin 0.3s linear infinite'
        }}></div>
      </div>
      
      {/* Yo'l chiziqlari */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '0',
        right: '0',
        height: '2px',
        background: 'repeating-linear-gradient(90deg, #666 0px, #666 20px, transparent 20px, transparent 40px)',
        animation: 'roadMove 1s linear infinite'
      }}></div>
      
      {/* CSS animatsiyalar */}
      <style>{`
        @keyframes ambulanceMove {
          0% { left: -100px; }
          50% { left: 50%; transform: translateX(-50%); }
          100% { left: calc(100% + 100px); }
        }
        
        @keyframes sirenBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        
        @keyframes wheelSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes roadMove {
          0% { transform: translateX(0); }
          100% { transform: translateX(-40px); }
        }
      `}</style>
    </div>
  )
}

export default AmbulanceAnimation
