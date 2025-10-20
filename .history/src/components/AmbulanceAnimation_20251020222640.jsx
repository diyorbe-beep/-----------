import React from 'react'
import Lottie from 'lottie-react'

const AmbulanceAnimation = () => {
  // Tez yordam mashinasi animatsiyasi JSON
  const ambulanceAnimation = {
    "v": "5.7.4",
    "fr": 30,
    "ip": 0,
    "op": 180,
    "w": 400,
    "h": 200,
    "nm": "Ambulance Animation",
    "ddd": 0,
    "assets": [],
    "layers": [
      {
        "ddd": 0,
        "ind": 1,
        "ty": 4,
        "nm": "Ambulance",
        "sr": 1,
        "ks": {
          "o": {"a": 0, "k": 100},
          "r": {"a": 0, "k": 0},
          "p": {"a": 1, "k": [
            {"i": {"x": 0.667, "y": 1}, "o": {"x": 0.333, "y": 0}, "t": 0, "s": [-200, 100]},
            {"i": {"x": 0.667, "y": 1}, "o": {"x": 0.333, "y": 0}, "t": 180, "s": [600, 100]}
          ]},
          "a": {"a": 0, "k": [0, 0]},
          "s": {"a": 0, "k": [100, 100]}
        },
        "ao": 0,
        "shapes": [
          {
            "ty": "gr",
            "it": [
              {
                "ty": "rc",
                "d": 1,
                "s": {"a": 0, "k": [120, 60]},
                "p": {"a": 0, "k": [0, 0]},
                "r": {"a": 0, "k": 8},
                "nm": "Body",
                "mn": "ADBE Vector Shape - Rect",
                "hd": false
              },
              {
                "ty": "fl",
                "c": {"a": 0, "k": [0.9, 0.9, 0.9, 1]},
                "o": {"a": 0, "k": 100},
                "r": 1,
                "bm": 0,
                "nm": "Fill 1",
                "mn": "ADBE Vector Graphic - Fill",
                "hd": false
              },
              {
                "ty": "tr",
                "p": {"a": 0, "k": [0, 0]},
                "a": {"a": 0, "k": [0, 0]},
                "s": {"a": 0, "k": [100, 100]},
                "r": {"a": 0, "k": 0},
                "o": {"a": 0, "k": 100},
                "sk": {"a": 0, "k": 0},
                "sa": {"a": 0, "k": 0},
                "nm": "Transform"
              }
            ],
            "nm": "Body",
            "np": 2,
            "cix": 2,
            "bm": 0,
            "ix": 1,
            "mn": "ADBE Vector Group",
            "hd": false
          },
          {
            "ty": "gr",
            "it": [
              {
                "ty": "el",
                "d": 1,
                "s": {"a": 0, "k": [30, 30]},
                "p": {"a": 0, "k": [0, 0]},
                "nm": "Wheel",
                "mn": "ADBE Vector Shape - Ellipse",
                "hd": false
              },
              {
                "ty": "fl",
                "c": {"a": 0, "k": [0.2, 0.2, 0.2, 1]},
                "o": {"a": 0, "k": 100},
                "r": 1,
                "bm": 0,
                "nm": "Fill 1",
                "mn": "ADBE Vector Graphic - Fill",
                "hd": false
              },
              {
                "ty": "tr",
                "p": {"a": 0, "k": [0, 0]},
                "a": {"a": 0, "k": [0, 0]},
                "s": {"a": 0, "k": [100, 100]},
                "r": {"a": 1, "k": [
                  {"i": {"x": [0.833], "y": [0.833]}, "o": {"x": [0.167], "y": [0.167]}, "t": 0, "s": [0]},
                  {"t": 180, "s": [360]}
                ]},
                "o": {"a": 0, "k": 100},
                "sk": {"a": 0, "k": 0},
                "sa": {"a": 0, "k": 0},
                "nm": "Transform"
              }
            ],
            "nm": "Wheel 1",
            "np": 2,
            "cix": 2,
            "bm": 0,
            "ix": 2,
            "mn": "ADBE Vector Group",
            "hd": false
          },
          {
            "ty": "gr",
            "it": [
              {
                "ty": "el",
                "d": 1,
                "s": {"a": 0, "k": [30, 30]},
                "p": {"a": 0, "k": [0, 0]},
                "nm": "Wheel",
                "mn": "ADBE Vector Shape - Ellipse",
                "hd": false
              },
              {
                "ty": "fl",
                "c": {"a": 0, "k": [0.2, 0.2, 0.2, 1]},
                "o": {"a": 0, "k": 100},
                "r": 1,
                "bm": 0,
                "nm": "Fill 1",
                "mn": "ADBE Vector Graphic - Fill",
                "hd": false
              },
              {
                "ty": "tr",
                "p": {"a": 0, "k": [0, 0]},
                "a": {"a": 0, "k": [0, 0]},
                "s": {"a": 0, "k": [100, 100]},
                "r": {"a": 1, "k": [
                  {"i": {"x": [0.833], "y": [0.833]}, "o": {"x": [0.167], "y": [0.167]}, "t": 0, "s": [0]},
                  {"t": 180, "s": [360]}
                ]},
                "o": {"a": 0, "k": 100},
                "sk": {"a": 0, "k": 0},
                "sa": {"a": 0, "k": 0},
                "nm": "Transform"
              }
            ],
            "nm": "Wheel 2",
            "np": 2,
            "cix": 2,
            "bm": 0,
            "ix": 3,
            "mn": "ADBE Vector Group",
            "hd": false
          },
          {
            "ty": "gr",
            "it": [
              {
                "ty": "rc",
                "d": 1,
                "s": {"a": 0, "k": [40, 30]},
                "p": {"a": 0, "k": [0, 0]},
                "r": {"a": 0, "k": 4},
                "nm": "Cross",
                "mn": "ADBE Vector Shape - Rect",
                "hd": false
              },
              {
                "ty": "fl",
                "c": {"a": 0, "k": [1, 0, 0, 1]},
                "o": {"a": 0, "k": 100},
                "r": 1,
                "bm": 0,
                "nm": "Fill 1",
                "mn": "ADBE Vector Graphic - Fill",
                "hd": false
              },
              {
                "ty": "tr",
                "p": {"a": 0, "k": [0, 0]},
                "a": {"a": 0, "k": [0, 0]},
                "s": {"a": 0, "k": [100, 100]},
                "r": {"a": 0, "k": 0},
                "o": {"a": 0, "k": 100},
                "sk": {"a": 0, "k": 0},
                "sa": {"a": 0, "k": 0},
                "nm": "Transform"
              }
            ],
            "nm": "Cross",
            "np": 2,
            "cix": 2,
            "bm": 0,
            "ix": 4,
            "mn": "ADBE Vector Group",
            "hd": false
          }
        ],
        "ip": 0,
        "op": 180,
        "st": 0,
        "bm": 0
      }
    ],
    "markers": []
  }

  return (
    <div style={{ 
      width: '100%', 
      height: '200px', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(90deg, transparent, rgba(34, 211, 238, 0.1), transparent)',
      borderRadius: '12px',
      overflow: 'hidden'
    }}>
      <Lottie 
        animationData={ambulanceAnimation}
        loop={true}
        autoplay={true}
        style={{ width: '400px', height: '200px' }}
      />
    </div>
  )
}

export default AmbulanceAnimation
